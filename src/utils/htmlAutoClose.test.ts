import { describe, expect, it } from 'vitest';
import { getHtmlAutoCloseTagEdit } from './htmlAutoClose';

function getEditFor(text: string) {
  return getHtmlAutoCloseTagEdit(text, text.length);
}

describe('getHtmlAutoCloseTagEdit', () => {
  it('creates a closing tag for a regular paired HTML tag', () => {
    expect(getEditFor('<ul>')).toEqual({
      text: '</ul>',
      cursorOffset: 4,
    });
  });

  it('keeps the next typed character inside the newly created tag pair', () => {
    const html = '<ul>';
    const edit = getHtmlAutoCloseTagEdit(html, html.length);

    expect(edit).not.toBeNull();

    if (!edit) {
      return;
    }

    const withClosingTag = `${html.slice(0, edit.cursorOffset)}${edit.text}${html.slice(edit.cursorOffset)}`;
    const withNextCharacter = `${withClosingTag.slice(0, edit.cursorOffset)}x${withClosingTag.slice(edit.cursorOffset)}`;

    expect(withNextCharacter).toBe('<ul>x</ul>');
  });

  it('preserves the typed case of the opening tag name', () => {
    expect(getEditFor('<CustomCard>')).toEqual({
      text: '</CustomCard>',
      cursorOffset: 12,
    });
  });

  it('creates a closing tag for opening tags with attributes', () => {
    expect(getEditFor('<section class="cards">')).toEqual({
      text: '</section>',
      cursorOffset: 23,
    });
  });

  it('does not close void elements', () => {
    expect(getEditFor('<img src="avatar.png">')).toBeNull();
    expect(getEditFor('<input type="email">')).toBeNull();
  });

  it('does not close self-closing tags', () => {
    expect(getEditFor('<div />')).toBeNull();
    expect(getEditFor('<custom-element/>')).toBeNull();
  });

  it('does not close closing tags', () => {
    expect(getEditFor('</ul>')).toBeNull();
  });

  it('does not close comments, doctype declarations, or processing instructions', () => {
    expect(getEditFor('<!-- comment -->')).toBeNull();
    expect(getEditFor('<!doctype html>')).toBeNull();
    expect(getEditFor('<?xml version="1.0">')).toBeNull();
  });

  it('does not duplicate an obvious existing closing tag after the cursor', () => {
    const html = '<article></article>';
    const cursorOffset = '<article>'.length;

    expect(getHtmlAutoCloseTagEdit(html, cursorOffset)).toBeNull();
  });

  it('ignores positions that are not immediately after a typed greater-than sign', () => {
    expect(getHtmlAutoCloseTagEdit('<ul>', 3)).toBeNull();
  });
});
