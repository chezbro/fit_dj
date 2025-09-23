import { ReactNode, createContext, useContext, useMemo } from 'react';
import { WORKOUT_ROUTINES } from './workoutData';
import { WorkoutRoutine, WorkoutSummary } from './types';

interface WorkoutContextValue {
  workouts: WorkoutSummary[];
  getWorkoutById: (id: string) => WorkoutRoutine | undefined;
}

const WorkoutContext = createContext<WorkoutContextValue | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const value = useMemo(() => {
    const summaries = WORKOUT_ROUTINES.map<WorkoutSummary>((workout) => ({
      id: workout.id,
      title: workout.title,
      description: workout.description,
      duration: workout.duration,
      level: workout.level,
      focus: workout.focus,
      heroImage: workout.heroImage,
    }));

    const getWorkoutById = (id: string) => WORKOUT_ROUTINES.find((workout) => workout.id === id);

    return { workouts: summaries, getWorkoutById };
  }, []);

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
};

export const useWorkouts = () => {
  const ctx = useContext(WorkoutContext);
  if (!ctx) {
    throw new Error('useWorkouts must be used within WorkoutProvider');
  }
  return ctx;
};
