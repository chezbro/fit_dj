export type WorkoutLevel = 'beginner' | 'intermediate' | 'advanced';
export type WorkoutIntensity = 'low' | 'moderate' | 'high';

export interface Exercise {
  id: string;
  name: string;
  workDuration: number;
  restDuration: number;
  cues: string[];
}

export interface WorkoutBlock {
  id: string;
  title: string;
  duration: number;
  intensity: WorkoutIntensity;
  exercises: Exercise[];
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  description: string;
  duration: number;
  level: WorkoutLevel;
  focus: string;
  spotifyPlaylistId: string;
  heroImage: string;
  warmup: WorkoutBlock;
  mainSets: WorkoutBlock[];
  cooldown: WorkoutBlock;
}

export interface WorkoutSummary
  extends Pick<WorkoutRoutine, 'id' | 'title' | 'description' | 'duration' | 'level' | 'focus' | 'heroImage'> {}
