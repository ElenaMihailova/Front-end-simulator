import { useEffect, useRef, useState } from 'react';
import { tasks } from '../data/tasks';
import { loadDraftsWithMigration, saveDrafts } from '../storage/drafts';
import type { SaveStatus, TaskDraftsById } from '../types';

export function useDraftStorage() {
  const [drafts, setDrafts] = useState<TaskDraftsById>(() =>
    loadDraftsWithMigration(window.localStorage, tasks),
  );
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('Saved locally');
  const hasSavedOnce = useRef(false);
  const saveTimer = useRef<number | null>(null);

  useEffect(() => {
    saveDrafts(window.localStorage, drafts);

    if (!hasSavedOnce.current) {
      hasSavedOnce.current = true;
      return undefined;
    }

    setSaveStatus('Saving...');

    if (saveTimer.current) {
      window.clearTimeout(saveTimer.current);
    }

    saveTimer.current = window.setTimeout(() => {
      setSaveStatus('Saved locally');
      saveTimer.current = null;
    }, 450);

    return () => {
      if (saveTimer.current) {
        window.clearTimeout(saveTimer.current);
      }
    };
  }, [drafts]);

  return { drafts, saveStatus, setDrafts };
}
