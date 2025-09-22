import { useEffect, useMemo, useRef, useState } from 'react';
import { Exercise, WorkoutRoutine } from '@/store/workouts/types';
import { formatSeconds } from '@/utils/time';

export type SessionPhase = 'warmup' | 'main' | 'cooldown';

interface SessionState {
  currentPhase: SessionPhase;
  sequenceIndex: number;
  exerciseIndex: number;
  isResting: boolean;
  secondsRemaining: number;
  progress: number;
  exercise: Exercise;
}

interface PhaseEntry {
  phase: SessionPhase;
  block: {
    duration: number;
    exercises: Exercise[];
  };
  sequenceIndex: number;
}

const createPhaseOrder = (workout: WorkoutRoutine): PhaseEntry[] => {
  const main = workout.mainSets.map((block, idx) => ({
    phase: 'main' as SessionPhase,
    block,
    sequenceIndex: idx + 1,
  }));
  return [
    { phase: 'warmup', block: workout.warmup, sequenceIndex: 0 },
    ...main,
    { phase: 'cooldown', block: workout.cooldown, sequenceIndex: main.length + 1 },
  ];
};

export const useWorkoutSession = (workout: WorkoutRoutine | undefined) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [state, setState] = useState<SessionState | null>(null);

  const sequence = useMemo(() => (workout ? createPhaseOrder(workout) : []), [workout]);
  const totalExerciseCount = useMemo(
    () => sequence.reduce((total, entry) => total + entry.block.exercises.length, 0),
    [sequence],
  );

  useEffect(() => {
    if (!workout || !sequence.length) return;
    const firstEntry = sequence[0];
    const firstExercise = firstEntry.block.exercises[0];
    setState({
      currentPhase: firstEntry.phase,
      sequenceIndex: firstEntry.sequenceIndex,
      exerciseIndex: 0,
      isResting: false,
      secondsRemaining: firstExercise.workDuration,
      progress: 0,
      exercise: firstExercise,
    });
  }, [sequence, workout]);

  useEffect(() => {
    if (!isPlaying || !state) return;
    timerRef.current = setInterval(() => {
      setState((prev) => {
        if (!prev) return prev;
        if (prev.secondsRemaining > 1) {
          return { ...prev, secondsRemaining: prev.secondsRemaining - 1 };
        }

        const activeEntry = sequence.find((entry) => entry.sequenceIndex === prev.sequenceIndex);
        if (!activeEntry) return prev;

        const { block } = activeEntry;
        const currentExercise = block.exercises[prev.exerciseIndex];

        if (!prev.isResting && currentExercise.restDuration > 0) {
          return {
            ...prev,
            isResting: true,
            secondsRemaining: currentExercise.restDuration,
          };
        }

        const nextExerciseIndex = prev.exerciseIndex + 1;
        if (nextExerciseIndex < block.exercises.length) {
          const nextExercise = block.exercises[nextExerciseIndex];
          return {
            ...prev,
            exerciseIndex: nextExerciseIndex,
            isResting: false,
            secondsRemaining: nextExercise.workDuration,
            exercise: nextExercise,
            progress: calculateProgress(sequence, prev.sequenceIndex, nextExerciseIndex, totalExerciseCount),
          };
        }

        const nextEntry = sequence.find(
          (entry) => entry.sequenceIndex === prev.sequenceIndex + 1,
        );

        if (!nextEntry) {
          return {
            ...prev,
            isResting: false,
            secondsRemaining: 0,
            progress: 1,
          };
        }

        const nextExercise = nextEntry.block.exercises[0];
        return {
          currentPhase: nextEntry.phase,
          sequenceIndex: nextEntry.sequenceIndex,
          exerciseIndex: 0,
          isResting: false,
          secondsRemaining: nextExercise.workDuration,
          exercise: nextExercise,
          progress: calculateProgress(sequence, nextEntry.sequenceIndex, 0, totalExerciseCount),
        };
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, sequence, state, totalExerciseCount]);

  const togglePlayback = () => setIsPlaying((prev) => !prev);

  const skipExercise = () => {
    if (!state) return;
    setState((prev) => {
      if (!prev) return prev;
      const activeEntry = sequence.find((entry) => entry.sequenceIndex === prev.sequenceIndex);
      if (!activeEntry) return prev;
      const { block } = activeEntry;
      const nextExerciseIndex = prev.exerciseIndex + 1;

      if (nextExerciseIndex < block.exercises.length) {
        const nextExercise = block.exercises[nextExerciseIndex];
        return {
          ...prev,
          exerciseIndex: nextExerciseIndex,
          isResting: false,
          secondsRemaining: nextExercise.workDuration,
          exercise: nextExercise,
          progress: calculateProgress(sequence, prev.sequenceIndex, nextExerciseIndex, totalExerciseCount),
        };
      }

      const nextEntry = sequence.find((entry) => entry.sequenceIndex === prev.sequenceIndex + 1);
      if (!nextEntry) {
        return { ...prev, progress: 1 };
      }
      const nextExercise = nextEntry.block.exercises[0];
      return {
        currentPhase: nextEntry.phase,
        sequenceIndex: nextEntry.sequenceIndex,
        exerciseIndex: 0,
        isResting: false,
        secondsRemaining: nextExercise.workDuration,
        exercise: nextExercise,
        progress: calculateProgress(sequence, nextEntry.sequenceIndex, 0, totalExerciseCount),
      };
    });
  };

  return {
    isPlaying,
    togglePlayback,
    skipExercise,
    state,
    formattedTimeRemaining: state ? formatSeconds(state.secondsRemaining) : '0:00',
  };
};

const calculateProgress = (
  sequence: PhaseEntry[],
  currentSequenceIndex: number,
  exerciseIndex: number,
  totalExerciseCount: number,
) => {
  if (!totalExerciseCount) return 0;
  const completedExercises = sequence.reduce((total, entry) => {
    if (entry.sequenceIndex < currentSequenceIndex) {
      return total + entry.block.exercises.length;
    }
    if (entry.sequenceIndex === currentSequenceIndex) {
      return total + exerciseIndex;
    }
    return total;
  }, 0);
  return Math.min(completedExercises / totalExerciseCount, 1);
};
