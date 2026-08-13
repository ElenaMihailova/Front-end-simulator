import { describe, expect, it } from 'vitest';
import { tasks } from '../data/tasks';
import { createFocusDocument } from './preview';

const section = tasks[0].sections[0];
const equalCardActionsSection = tasks.find(
  (task) => task.id === 'equal-card-actions',
)!.sections[0];

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

  it('can render a blank canvas without a placeholder for empty-preview tasks', () => {
    const document = createFocusDocument(
      {
        ...section,
        emptyPreview: true,
      },
      {
        html: '',
        css: '',
      },
    );

    expect(document).not.toContain('class="placeholder"');
    expect(document).toContain('<main class="preview-page"></main>');
  });

  it('renders the CSS-only Equal card actions starter HTML immediately', () => {
    const document = createFocusDocument(equalCardActionsSection, {
      html: equalCardActionsSection.starterHtml,
      css: '',
    });

    expect(document).not.toContain('class="placeholder"');
    expect(document).toContain('Weekend escapes');
    expect(document.match(/class="card"/g)).toHaveLength(3);
    expect(document.match(/class="card__image"/g)).toHaveLength(3);
    expect(document.match(/class="card__action"/g)).toHaveLength(3);
  });
});
