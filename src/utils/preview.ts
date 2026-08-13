import type { TaskSection } from '../data/tasks';
import type { ExerciseDraft, SectionDraftsById } from '../types';

const baseStyles = `
  :root {
    color-scheme: light;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: #ffffff;
  }

  * {
    box-sizing: border-box;
  }

  body {
    min-width: 320px;
    margin: 0;
    padding: 10px;
    background: #ffffff;
    color: #182230;
  }

  a,
  button,
  input,
  textarea {
    font: inherit;
  }

  .preview-page {
    width: min(100%, 980px);
    margin: 0 auto;
    background: #ffffff;
    box-shadow: 0 24px 70px rgba(23, 32, 51, 0.12);
  }

  .preview-page:empty {
    min-height: 320px;
  }

  .placeholder {
    display: grid;
    place-items: center;
    min-height: 150px;
    padding: 32px;
    border-top: 1px solid #d8e0ec;
    color: #68758a;
    background: repeating-linear-gradient(
      135deg,
      #f7f9fc,
      #f7f9fc 12px,
      #eef2f7 12px,
      #eef2f7 24px
    );
    font-weight: 700;
  }

  @media (max-width: 760px) {
    .preview-page {
      width: 100%;
    }
  }
`;

export function createPreviewDocument(
  sections: TaskSection[],
  drafts: SectionDraftsById,
) {
  const css = sections.map((section) => drafts[section.id].css).join('\n\n');
  const html = sections
    .map((section) => {
      const value = drafts[section.id].html.trim();
      return (
        value ||
        (section.emptyPreview
          ? ''
          : `<section class="placeholder">${section.title}</section>`)
      );
    })
    .join('\n');

  return createDocument(
    `${baseStyles}\n${css}`,
    `<main class="preview-page">${html}</main>`,
  );
}

export function createFocusDocument(
  section: TaskSection,
  draft: ExerciseDraft,
) {
  const html =
    draft.html.trim() ||
    (section.emptyPreview
      ? ''
      : `<section class="placeholder">${section.title}</section>`);
  return createDocument(
    `${baseStyles}\n${draft.css}`,
    `<main class="preview-page">${html}</main>`,
  );
}

function createDocument(css: string, body: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>${css}</style>
  </head>
  <body>${body}</body>
</html>`;
}
