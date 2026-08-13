const VOID_ELEMENTS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

type HtmlAutoCloseTagEdit = {
  text: string;
  cursorOffset: number;
};

export function getHtmlAutoCloseTagEdit(
  documentText: string,
  cursorOffset: number,
): HtmlAutoCloseTagEdit | null {
  if (cursorOffset <= 0 || documentText[cursorOffset - 1] !== '>') {
    return null;
  }

  const tagStart = documentText.lastIndexOf('<', cursorOffset - 1);

  if (tagStart === -1) {
    return null;
  }

  const tagText = documentText.slice(tagStart, cursorOffset);

  if (!isAutoClosableOpeningTag(tagText)) {
    return null;
  }

  const match = /^<\s*([A-Za-z][\w:-]*)\b[^<>]*>$/.exec(tagText);

  if (!match) {
    return null;
  }

  const tagName = match[1];

  if (VOID_ELEMENTS.has(tagName.toLowerCase())) {
    return null;
  }

  if (hasImmediateClosingTag(documentText.slice(cursorOffset), tagName)) {
    return null;
  }

  return {
    text: `</${tagName}>`,
    cursorOffset,
  };
}

function isAutoClosableOpeningTag(tagText: string) {
  const normalizedTag = tagText.trim();

  if (
    normalizedTag.startsWith('</') ||
    normalizedTag.startsWith('<!--') ||
    normalizedTag.startsWith('<!') ||
    normalizedTag.startsWith('<?')
  ) {
    return false;
  }

  return !/\/\s*>$/.test(normalizedTag);
}

function hasImmediateClosingTag(textAfterCursor: string, tagName: string) {
  const escapedTagName = tagName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const closingTagPattern = new RegExp(
    `^\\s*<\\/\\s*${escapedTagName}\\s*>`,
    'i',
  );

  return closingTagPattern.test(textAfterCursor);
}
