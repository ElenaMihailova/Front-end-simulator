export type EditorTab = 'html' | 'css';

export type WorkspaceView = 'exercise' | 'wholePage';

export type ExerciseDraft = {
  html: string;
  css: string;
};

export type SectionDraftsById = Record<string, ExerciseDraft>;

export type TaskDraftsById = Record<string, SectionDraftsById>;

export type SaveStatus = 'Saved locally' | 'Saving...';
