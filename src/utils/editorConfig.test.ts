import { describe, expect, it } from 'vitest';
import type { TaskSection } from '../data/tasks';
import {
  getEditorModelPath,
  isCssOnlySection,
  isSectionTabEditable,
} from './editorConfig';

const cssOnlySection: TaskSection = {
  id: 'cards',
  title: 'Cards',
  eyebrow: 'css only',
  scope: 'Style the cards.',
  starterHtml: '<section class="cards"></section>',
  starterCss: '',
  editableTabs: ['css'],
};

describe('editorConfig', () => {
  it('identifies CSS-only sections without making HTML editable', () => {
    expect(isSectionTabEditable(cssOnlySection, 'html')).toBe(false);
    expect(isSectionTabEditable(cssOnlySection, 'css')).toBe(true);
    expect(isCssOnlySection(cssOnlySection)).toBe(true);
  });

  it('keeps regular sections editable in both tabs by default', () => {
    const regularSection = {
      ...cssOnlySection,
      editableTabs: undefined,
    };

    expect(isSectionTabEditable(regularSection, 'html')).toBe(true);
    expect(isSectionTabEditable(regularSection, 'css')).toBe(true);
    expect(isCssOnlySection(regularSection)).toBe(false);
  });

  it('uses separate Monaco model paths for HTML and CSS drafts', () => {
    expect(getEditorModelPath('equal-card-actions', 'cards', 'html')).toBe(
      'inmemory://simulator/equal-card-actions/cards/html.html',
    );
    expect(getEditorModelPath('equal-card-actions', 'cards', 'css')).toBe(
      'inmemory://simulator/equal-card-actions/cards/css.css',
    );
    expect(getEditorModelPath('equal-card-actions', 'cards', 'html')).not.toBe(
      getEditorModelPath('equal-card-actions', 'cards', 'css'),
    );
  });
});
