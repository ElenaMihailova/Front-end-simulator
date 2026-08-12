import { describe, expect, it } from 'vitest';
import { tasks } from '../data/tasks';
import { createFocusDocument } from './preview';

const section = tasks[0].sections[0];

describe('createFocusDocument', () => {
  it('does not inject runtime scripts into preview documents', () => {
    const document = createFocusDocument(section, {
      html: '<section>Preview</section>',
      css: '.preview { color: red; }',
    });

    expect(document).not.toContain('document.addEventListener');
  });

  it('keeps user HTML as preview content while relying on iframe sandbox to block scripts', () => {
    const document = createFocusDocument(section, {
      html: '<script>window.__ran = true;</script>',
      css: '',
    });

    expect(document).toContain('<script>window.__ran = true;</script>');
  });
});
