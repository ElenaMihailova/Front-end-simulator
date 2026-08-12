import { useEffect, useMemo, useState } from 'react';
import Editor from '@monaco-editor/react';
import {
  Code2,
  Eye,
  FileCode2,
  PanelLeft,
  RotateCcw,
  Rows3,
  Save,
} from 'lucide-react';
import { exercises, getExercise, type PageBlockId } from './data/exercises';
import {
  createFocusDocument,
  createPreviewDocument,
  type DraftsById,
} from './utils/preview';
import styles from './App.module.css';

const storageKey = 'html-css-simulator-drafts-v1';

type EditorTab = 'html' | 'css';
type WorkspaceView = 'exercise' | 'wholePage';

function createInitialDrafts(): DraftsById {
  return exercises.reduce((drafts, exercise) => {
    drafts[exercise.id] = {
      html: exercise.starterHtml,
      css: exercise.starterCss,
    };
    return drafts;
  }, {} as DraftsById);
}

function readDrafts(): DraftsById {
  const fallback = createInitialDrafts();

  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) {
      return fallback;
    }

    const parsed = JSON.parse(stored) as Partial<DraftsById>;
    return exercises.reduce((drafts, exercise) => {
      const storedDraft = parsed[exercise.id];
      drafts[exercise.id] = {
        html: storedDraft?.html ?? exercise.starterHtml,
        css: storedDraft?.css ?? exercise.starterCss,
      };
      return drafts;
    }, {} as DraftsById);
  } catch {
    return fallback;
  }
}

export function App() {
  const [drafts, setDrafts] = useState<DraftsById>(() => readDrafts());
  const [selectedId, setSelectedId] = useState<PageBlockId>('hero');
  const [editorTab, setEditorTab] = useState<EditorTab>('html');
  const [workspaceView, setWorkspaceView] = useState<WorkspaceView>('exercise');
  const selectedExercise = getExercise(selectedId);
  const selectedDraft = drafts[selectedId];

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(drafts));
  }, [drafts]);

  const fullPreview = useMemo(() => createPreviewDocument(exercises, drafts), [drafts]);
  const focusPreview = useMemo(
    () => createFocusDocument(selectedExercise, selectedDraft),
    [selectedDraft, selectedExercise],
  );

  const updateDraft = (field: EditorTab, value = '') => {
    setDrafts((current) => ({
      ...current,
      [selectedId]: {
        ...current[selectedId],
        [field]: value,
      },
    }));
  };

  const resetSelected = () => {
    setDrafts((current) => ({
      ...current,
      [selectedId]: {
        html: selectedExercise.starterHtml,
        css: selectedExercise.starterCss,
      },
    }));
  };

  return (
    <div className={styles.simulator}>
      <header className={styles['simulator__header']}>
        <div>
          <p className={styles['simulator__eyebrow']}>HTML/CSS practice</p>
          <h1 className={styles['simulator__title']}>Frontend page simulator</h1>
        </div>
        <div className={styles['simulator__status']}>
          <Save aria-hidden="true" size={16} />
          Local autosave
        </div>
      </header>

      <main className={styles['simulator__workspace']}>
        <aside className={styles['simulator__map']} aria-label="Mini page map">
          <div className={styles['simulator__panel-header']}>
            <PanelLeft aria-hidden="true" size={18} />
            <span>Page map</span>
          </div>

          <div className={styles['simulator__map-list']}>
            {exercises.map((exercise) => {
              const Icon = exercise.icon;
              const active = exercise.id === selectedId;

              return (
                <button
                  className={`${styles['simulator__map-item']} ${
                    styles[`simulator__map-item--${exercise.id}`]
                  } ${active ? styles['simulator__map-item--active'] : ''}`}
                  key={exercise.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(exercise.id);
                    setEditorTab('html');
                    setWorkspaceView('exercise');
                  }}
                >
                  <span className={styles['simulator__map-icon']}>
                    <Icon aria-hidden="true" size={17} />
                  </span>
                  <span className={styles['simulator__map-copy']}>
                    <strong className={styles['simulator__map-title']}>{exercise.title}</strong>
                    <small className={styles['simulator__map-description']}>
                      {exercise.scope}
                    </small>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <div className={styles['simulator__work-area']}>
          <div className={styles['simulator__mode-bar']}>
            <div className={styles['simulator__panel-header']}>
              <Rows3 aria-hidden="true" size={18} />
              <span>Workspace view</span>
            </div>
            <div className={styles['simulator__mode-actions']}>
              <div
                className={styles['simulator__view-tabs']}
                role="tablist"
                aria-label="Workspace view"
              >
                <button
                  aria-selected={workspaceView === 'exercise'}
                  className={
                    workspaceView === 'exercise'
                      ? styles['simulator__view-tab--selected']
                      : ''
                  }
                  onClick={() => setWorkspaceView('exercise')}
                  role="tab"
                  type="button"
                >
                  <Eye aria-hidden="true" size={16} />
                  Live preview
                </button>
                <button
                  aria-selected={workspaceView === 'wholePage'}
                  className={
                    workspaceView === 'wholePage'
                      ? styles['simulator__view-tab--selected']
                      : ''
                  }
                  onClick={() => setWorkspaceView('wholePage')}
                  role="tab"
                  type="button"
                >
                  <Rows3 aria-hidden="true" size={16} />
                  Whole page
                </button>
              </div>
              <button className={styles['simulator__reset']} type="button" onClick={resetSelected}>
                <RotateCcw aria-hidden="true" size={16} />
                Reset
              </button>
            </div>
          </div>

          {workspaceView === 'exercise' ? (
            <section className={styles['simulator__exercise']} aria-label="Focused exercise">
              <div className={styles['simulator__exercise-header']}>
                <div>
                  <p className={styles['simulator__exercise-eyebrow']}>
                    {selectedExercise.eyebrow}
                  </p>
                  <h2 className={styles['simulator__exercise-title']}>
                    {selectedExercise.title}
                  </h2>
                  <span className={styles['simulator__exercise-scope']}>
                    {selectedExercise.scope}
                  </span>
                </div>
              </div>

              <div className={styles['simulator__exercise-grid']}>
                <div className={styles['simulator__editor']}>
                  <div className={styles['simulator__editor-toolbar']}>
                    <div
                      className={styles['simulator__editor-tabs']}
                      role="tablist"
                      aria-label="Editor language"
                    >
                      <button
                        aria-selected={editorTab === 'html'}
                        className={
                          editorTab === 'html'
                            ? styles['simulator__editor-tab--selected']
                            : ''
                        }
                        onClick={() => setEditorTab('html')}
                        role="tab"
                        type="button"
                      >
                        <FileCode2 aria-hidden="true" size={16} />
                        HTML
                      </button>
                      <button
                        aria-selected={editorTab === 'css'}
                        className={
                          editorTab === 'css'
                            ? styles['simulator__editor-tab--selected']
                            : ''
                        }
                        onClick={() => setEditorTab('css')}
                        role="tab"
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
                    onChange={(value) => updateDraft(editorTab, value)}
                    options={{
                      automaticLayout: true,
                      fontFamily:
                        'JetBrains Mono, SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace',
                      fontSize: 14,
                      lineHeight: 22,
                      minimap: { enabled: false },
                      padding: { top: 18 },
                      scrollBeyondLastLine: false,
                      tabSize: 2,
                      wordWrap: 'on',
                    }}
                    theme="vs-dark"
                    value={selectedDraft[editorTab]}
                  />
                </div>

                <div className={styles['simulator__preview']}>
                  <div className={styles['simulator__preview-toolbar']}>
                    <Eye aria-hidden="true" size={17} />
                    <span>Live preview</span>
                  </div>
                  <iframe
                    className={styles['simulator__preview-frame']}
                    sandbox=""
                    srcDoc={focusPreview}
                    title={`${selectedExercise.title} preview`}
                  />
                </div>
              </div>
            </section>
          ) : (
            <section className={styles['simulator__whole-page']} aria-label="Whole page preview">
              <iframe
                className={styles['simulator__whole-page-frame']}
                sandbox=""
                srcDoc={fullPreview}
                title="Full mini page preview"
              />
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
