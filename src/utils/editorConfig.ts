import type { TaskSection } from '../data/tasks';
import type { EditorTab } from '../types';

export function isSectionTabEditable(section: TaskSection, tab: EditorTab) {
  return section.editableTabs ? section.editableTabs.includes(tab) : true;
}

export function isCssOnlySection(section: TaskSection) {
  return (
    !isSectionTabEditable(section, 'html') &&
    isSectionTabEditable(section, 'css')
  );
}

export function getEditorModelPath(
  taskId: string,
  sectionId: string,
  tab: EditorTab,
) {
  return `inmemory://simulator/${taskId}/${sectionId}/${tab}.${tab}`;
}
