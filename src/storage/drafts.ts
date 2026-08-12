import type { Task } from '../data/tasks';
import type { SectionDraftsById, TaskDraftsById } from '../types';

export const currentStorageKey = 'html-css-simulator-task-drafts-v1';
export const legacyStorageKeys = [
  'html-css-simulator-drafts-v2',
  'html-css-simulator-drafts-v1',
];

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

function parseStoredValue(value: string | null): unknown {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function normalizeSectionDrafts(
  task: Task,
  stored: unknown,
): SectionDraftsById {
  const storedObject = isObject(stored) ? stored : {};

  return task.sections.reduce((drafts, section) => {
    const storedDraft = storedObject[section.id];
    const draftObject = isObject(storedDraft) ? storedDraft : {};

    drafts[section.id] = {
      html:
        typeof draftObject.html === 'string'
          ? draftObject.html
          : section.starterHtml,
      css:
        typeof draftObject.css === 'string'
          ? draftObject.css
          : section.starterCss,
    };

    return drafts;
  }, {} as SectionDraftsById);
}

export function createInitialTaskDrafts(tasks: Task[]): TaskDraftsById {
  return tasks.reduce((drafts, task) => {
    drafts[task.id] = normalizeSectionDrafts(task, null);
    return drafts;
  }, {} as TaskDraftsById);
}

export function mergeTaskDraftsWithCatalog(
  tasks: Task[],
  stored: unknown,
): TaskDraftsById {
  const storedObject = isObject(stored) ? stored : {};

  return tasks.reduce((drafts, task) => {
    drafts[task.id] = normalizeSectionDrafts(task, storedObject[task.id]);
    return drafts;
  }, {} as TaskDraftsById);
}

function readFirstLegacyDrafts(storage: StorageLike) {
  for (const key of legacyStorageKeys) {
    const value = parseStoredValue(storage.getItem(key));
    if (value) {
      return { key, value };
    }
  }

  return null;
}

function mergeLegacySectionDrafts(
  tasks: Task[],
  legacy: unknown,
): TaskDraftsById {
  const legacyObject = isObject(legacy) ? legacy : {};
  const drafts = createInitialTaskDrafts(tasks);

  for (const task of tasks) {
    for (const section of task.sections) {
      const legacyDraft = legacyObject[section.id];

      if (!isObject(legacyDraft)) {
        continue;
      }

      drafts[task.id][section.id] = {
        html:
          typeof legacyDraft.html === 'string'
            ? legacyDraft.html
            : drafts[task.id][section.id].html,
        css:
          typeof legacyDraft.css === 'string'
            ? legacyDraft.css
            : drafts[task.id][section.id].css,
      };
    }
  }

  return drafts;
}

export function loadDraftsWithMigration(
  storage: StorageLike,
  tasks: Task[],
): TaskDraftsById {
  const currentDrafts = parseStoredValue(storage.getItem(currentStorageKey));
  if (currentDrafts) {
    return mergeTaskDraftsWithCatalog(tasks, currentDrafts);
  }

  const legacyDrafts = readFirstLegacyDrafts(storage);
  if (!legacyDrafts) {
    return createInitialTaskDrafts(tasks);
  }

  const migratedDrafts = mergeLegacySectionDrafts(tasks, legacyDrafts.value);
  storage.setItem(currentStorageKey, JSON.stringify(migratedDrafts));
  storage.removeItem(legacyDrafts.key);
  return migratedDrafts;
}

export function saveDrafts(storage: StorageLike, drafts: TaskDraftsById) {
  storage.setItem(currentStorageKey, JSON.stringify(drafts));
}
