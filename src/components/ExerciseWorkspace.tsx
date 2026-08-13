import Editor from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import {
  Code2,
  Eye,
  FileCode2,
  Monitor,
  Smartphone,
  Tablet,
} from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Task, TaskSection } from '../data/tasks';
import type { EditorTab, ExerciseDraft } from '../types';
import { PreviewFrame } from './PreviewFrame';
import {
  getEditorModelPath,
  isCssOnlySection,
  isSectionTabEditable,
} from '../utils/editorConfig';
import { getHtmlAutoCloseTagEdit } from '../utils/htmlAutoClose';
import styles from '../App.module.css';

type ExerciseWorkspaceProps = {
  editorTab: EditorTab;
  task: Task;
  section: TaskSection;
  draft: ExerciseDraft;
  previewDocument: string;
  onDraftChange: (field: EditorTab, value?: string) => void;
  onEditorTabChange: (tab: EditorTab) => void;
};

export function ExerciseWorkspace({
  editorTab,
  task,
  section,
  draft,
  previewDocument,
  onDraftChange,
  onEditorTabChange,
}: ExerciseWorkspaceProps) {
  const [previewViewport, setPreviewViewport] =
    useState<PreviewViewport>('desktop');
  const previewViewportRef = useRef<HTMLDivElement>(null);
  const [previewPaneWidth, setPreviewPaneWidth] = useState(0);
  const isCurrentEditorReadOnly = !isSectionTabEditable(section, editorTab);
  const usesCssOnlyLayout = isCssOnlySection(section);
  const hasDetailedBrief =
    task.brief?.length ||
    task.doneWhen?.length ||
    task.interviewFollowUp ||
    section.scope;

  useEffect(() => {
    const element = previewViewportRef.current;

    if (!element) {
      return;
    }

    const updateWidth = () => setPreviewPaneWidth(element.clientWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={styles['simulator__exercise']}
      aria-label="Focused exercise"
    >
      <div className={styles['simulator__exercise-header']}>
        <div className={styles['simulator__exercise-summary']}>
          <p className={styles['simulator__exercise-eyebrow']}>{task.type}</p>
          <h2 className={styles['simulator__exercise-title']}>{task.title}</h2>
          <span className={styles['simulator__exercise-scope']}>
            {task.prompt}
          </span>
          {hasDetailedBrief && (
            <details className={styles['simulator__brief-details']}>
              <summary className={styles['simulator__brief-summary']}>
                View full brief
              </summary>
              <div className={styles['simulator__brief-content']}>
                {section.scope && (
                  <div className={styles['simulator__brief-block']}>
                    <h3 className={styles['simulator__brief-title']}>Scope</h3>
                    <p className={styles['simulator__brief-text']}>
                      {section.scope}
                    </p>
                  </div>
                )}
                {task.brief && (
                  <div className={styles['simulator__brief-block']}>
                    <h3 className={styles['simulator__brief-title']}>Brief</h3>
                    <ol className={styles['simulator__brief-list']}>
                      {task.brief.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  </div>
                )}
                {task.doneWhen && (
                  <div className={styles['simulator__brief-block']}>
                    <h3 className={styles['simulator__brief-title']}>
                      Done when
                    </h3>
                    <ul className={styles['simulator__brief-list']}>
                      {task.doneWhen.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {task.interviewFollowUp && (
                  <p className={styles['simulator__interview-follow-up']}>
                    <strong>Interview follow-up:</strong>{' '}
                    {task.interviewFollowUp}
                  </p>
                )}
              </div>
            </details>
          )}
        </div>
      </div>

      <div
        className={`${styles['simulator__exercise-grid']} ${
          usesCssOnlyLayout ? styles['simulator__exercise-grid--css-only'] : ''
        }`}
      >
        {usesCssOnlyLayout ? (
          <CssOnlyEditor
            draft={draft}
            section={section}
            task={task}
            onDraftChange={onDraftChange}
          />
        ) : (
          <div className={styles['simulator__editor']}>
            <div className={styles['simulator__editor-toolbar']}>
              <div
                className={styles['simulator__editor-tabs']}
                role="group"
                aria-label="Code editor"
              >
                <button
                  aria-pressed={editorTab === 'html'}
                  className={
                    editorTab === 'html'
                      ? styles['simulator__editor-tab--selected']
                      : ''
                  }
                  onClick={() => onEditorTabChange('html')}
                  type="button"
                >
                  <FileCode2 aria-hidden="true" size={16} />
                  HTML
                </button>
                <button
                  aria-pressed={editorTab === 'css'}
                  className={
                    editorTab === 'css'
                      ? styles['simulator__editor-tab--selected']
                      : ''
                  }
                  onClick={() => onEditorTabChange('css')}
                  type="button"
                >
                  <Code2 aria-hidden="true" size={16} />
                  CSS
                </button>
              </div>
            </div>

            <Editor
              className={styles['simulator__code-editor']}
              height="100%"
              language={editorTab}
              path={getEditorModelPath(task.id, section.id, editorTab)}
              onMount={setupHtmlAutoCloseTags}
              onChange={(value) => {
                if (!isCurrentEditorReadOnly) {
                  onDraftChange(editorTab, value);
                }
              }}
              options={createEditorOptions(
                editorTab === 'html'
                  ? `${task.title} HTML editor`
                  : `${task.title} CSS editor`,
                isCurrentEditorReadOnly,
              )}
              theme="vs-dark"
              value={draft[editorTab]}
            />
          </div>
        )}

        <div className={styles['simulator__preview']}>
          <div className={styles['simulator__preview-toolbar']}>
            <div className={styles['simulator__preview-title']}>
              <Eye aria-hidden="true" size={17} />
              <span>Live preview</span>
              <span className={styles['simulator__viewport-label']}>
                {previewViewportWidths[previewViewport]}px · fit
              </span>
            </div>
            <div
              className={styles['simulator__viewport-switcher']}
              role="group"
              aria-label="Preview viewport"
            >
              <ViewportButton
                icon={<Monitor aria-hidden="true" size={15} />}
                label="Desktop"
                selected={previewViewport === 'desktop'}
                onClick={() => setPreviewViewport('desktop')}
              />
              <ViewportButton
                icon={<Tablet aria-hidden="true" size={15} />}
                label="Tablet"
                selected={previewViewport === 'tablet'}
                onClick={() => setPreviewViewport('tablet')}
              />
              <ViewportButton
                icon={<Smartphone aria-hidden="true" size={15} />}
                label="Mobile"
                selected={previewViewport === 'mobile'}
                onClick={() => setPreviewViewport('mobile')}
              />
            </div>
          </div>
          <div
            ref={previewViewportRef}
            className={`${styles['simulator__viewport']} ${
              styles[`simulator__viewport--${previewViewport}`]
            }`}
          >
            <ScaledPreview
              document={previewDocument}
              paneWidth={previewPaneWidth}
              title={`Preview: ${section.title}`}
              viewport={previewViewport}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type PreviewViewport = 'desktop' | 'tablet' | 'mobile';

const previewViewportWidths: Record<PreviewViewport, number> = {
  desktop: 1200,
  tablet: 768,
  mobile: 375,
};

const previewHeight = 560;

type ScaledPreviewProps = {
  document: string;
  paneWidth: number;
  title: string;
  viewport: PreviewViewport;
};

function ScaledPreview({
  document,
  paneWidth,
  title,
  viewport,
}: ScaledPreviewProps) {
  const width = previewViewportWidths[viewport];
  const scale = Math.min(1, Math.max(0, (paneWidth - 16) / width));
  const visibleWidth = width * scale;

  return (
    <div
      className={styles['simulator__viewport-canvas']}
      style={{ width: `${visibleWidth}px` }}
    >
      <PreviewFrame
        className={styles['simulator__preview-frame']}
        document={document}
        style={{
          height: `${previewHeight / Math.max(scale, 0.01)}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${width}px`,
        }}
        title={title}
      />
    </div>
  );
}

type ViewportButtonProps = {
  icon: ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
};

function ViewportButton({
  icon,
  label,
  selected,
  onClick,
}: ViewportButtonProps) {
  return (
    <button
      aria-pressed={selected}
      className={selected ? styles['simulator__viewport-button--selected'] : ''}
      onClick={onClick}
      type="button"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

type CssOnlyEditorProps = {
  draft: ExerciseDraft;
  section: TaskSection;
  task: Task;
  onDraftChange: (field: EditorTab, value?: string) => void;
};

function CssOnlyEditor({
  draft,
  section,
  task,
  onDraftChange,
}: CssOnlyEditorProps) {
  return (
    <>
      <details className={styles['simulator__reference-pane']} open>
        <summary className={styles['simulator__reference-summary']}>
          <FileCode2 aria-hidden="true" size={15} />
          HTML reference
        </summary>
        <Editor
          className={styles['simulator__reference-editor']}
          height="100%"
          language="html"
          path={getEditorModelPath(task.id, section.id, 'html')}
          options={createEditorOptions(
            `${task.title} HTML reference`,
            true,
            'compact',
          )}
          theme="vs-dark"
          value={draft.html}
        />
      </details>

      <div className={styles['simulator__css-editor-pane']}>
        <div className={styles['simulator__pane-toolbar']}>
          <Code2 aria-hidden="true" size={15} />
          <span>CSS</span>
        </div>
        <Editor
          className={styles['simulator__code-editor']}
          height="100%"
          language="css"
          path={getEditorModelPath(task.id, section.id, 'css')}
          onChange={(value) => onDraftChange('css', value)}
          options={createEditorOptions(`${task.title} CSS editor`, false)}
          theme="vs-dark"
          value={draft.css}
        />
      </div>
    </>
  );
}

function createEditorOptions(
  ariaLabel: string,
  readOnly: boolean,
  density: 'regular' | 'compact' = 'regular',
): editor.IStandaloneEditorConstructionOptions {
  return {
    ariaLabel,
    autoClosingBrackets: 'languageDefined',
    autoClosingDelete: 'auto',
    autoClosingOvertype: 'auto',
    autoClosingQuotes: 'languageDefined',
    autoIndent: 'full',
    autoSurround: 'languageDefined',
    automaticLayout: true,
    bracketPairColorization: { enabled: true },
    fontFamily:
      'JetBrains Mono, SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace',
    fontSize: density === 'compact' ? 12 : 14,
    folding: false,
    formatOnPaste: !readOnly,
    formatOnType: false,
    guides: {
      bracketPairs: 'active',
      indentation: true,
    },
    linkedEditing: true,
    lineDecorationsWidth: 6,
    lineNumbersMinChars: 2,
    lineHeight: density === 'compact' ? 18 : 22,
    matchBrackets: 'always',
    minimap: { enabled: false },
    padding: { top: density === 'compact' ? 12 : 18 },
    quickSuggestions: {
      comments: false,
      other: true,
      strings: true,
    },
    quickSuggestionsDelay: 80,
    readOnly,
    scrollBeyondLastLine: false,
    scrollbar: {
      arrowSize: 0,
      horizontalScrollbarSize: 8,
      verticalScrollbarSize: 8,
      useShadows: false,
    },
    snippetSuggestions: 'inline',
    suggestOnTriggerCharacters: true,
    tabCompletion: 'onlySnippets',
    tabSize: 2,
    wordWrap: 'on',
  };
}

function setupHtmlAutoCloseTags(editorInstance: editor.IStandaloneCodeEditor) {
  let applyingAutoClose = false;

  const contentListener = editorInstance.onDidChangeModelContent((event) => {
    if (applyingAutoClose) {
      return;
    }

    const model = editorInstance.getModel();
    const position = editorInstance.getPosition();
    const change = event.changes[0];

    if (
      !model ||
      !position ||
      model.getLanguageId() !== 'html' ||
      event.changes.length !== 1 ||
      change.text !== '>'
    ) {
      return;
    }

    const cursorOffset = model.getOffsetAt(position);
    const edit = getHtmlAutoCloseTagEdit(model.getValue(), cursorOffset);

    if (!edit) {
      return;
    }

    try {
      applyingAutoClose = true;
      editorInstance.executeEdits('html-auto-close-tag', [
        {
          range: {
            startLineNumber: position.lineNumber,
            startColumn: position.column,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          },
          text: edit.text,
        },
      ]);
      editorInstance.setPosition(model.getPositionAt(edit.cursorOffset));
    } finally {
      applyingAutoClose = false;
    }
  });

  editorInstance.onDidDispose(() => contentListener.dispose());
}
