import { useMemo, useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { ChallengeCatalog } from './components/ChallengeCatalog';
import { ExerciseWorkspace } from './components/ExerciseWorkspace';
import { ModeBar } from './components/ModeBar';
import { PageMap } from './components/PageMap';
import { PreviewFrame } from './components/PreviewFrame';
import { getTask, tasks, type Task } from './data/tasks';
import { useDraftStorage } from './hooks/useDraftStorage';
import { createFocusDocument, createPreviewDocument } from './utils/preview';
import type { EditorTab, WorkspaceView } from './types';
import styles from './App.module.css';

export function App() {
  const { drafts, saveStatus, setDrafts } = useDraftStorage();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null,
  );
  const [editorTab, setEditorTab] = useState<EditorTab>('html');
  const [workspaceView, setWorkspaceView] = useState<WorkspaceView>('exercise');

  const selectedTask = selectedTaskId ? getTask(selectedTaskId) : null;
  const selectedSection =
    selectedTask?.sections.find(
      (section) => section.id === selectedSectionId,
    ) ??
    selectedTask?.sections[0] ??
    null;
  const selectedTaskDrafts = selectedTask ? drafts[selectedTask.id] : null;
  const selectedDraft =
    selectedTaskDrafts && selectedSection
      ? selectedTaskDrafts[selectedSection.id]
      : null;
  const showPageMap = Boolean(selectedTask && selectedTask.sections.length > 1);
  const showWholePage = Boolean(
    selectedTask?.supportsWholePage && selectedTask.sections.length > 1,
  );

  const fullPreview = useMemo(() => {
    if (!selectedTask || !selectedTaskDrafts) {
      return '';
    }

    return createPreviewDocument(selectedTask.sections, selectedTaskDrafts);
  }, [selectedTask, selectedTaskDrafts]);

  const focusPreview = useMemo(() => {
    if (!selectedSection || !selectedDraft) {
      return '';
    }

    return createFocusDocument(selectedSection, selectedDraft);
  }, [selectedDraft, selectedSection]);

  const selectTask = (task: Task) => {
    setSelectedTaskId(task.id);
    setSelectedSectionId(task.sections[0]?.id ?? null);
    setEditorTab('html');
    setWorkspaceView('exercise');
  };

  const selectRandomTask = () => {
    const randomIndex = Math.floor(Math.random() * tasks.length);
    selectTask(tasks[randomIndex]);
  };

  const updateDraft = (field: EditorTab, value = '') => {
    if (!selectedTask || !selectedSection) {
      return;
    }

    setDrafts((current) => ({
      ...current,
      [selectedTask.id]: {
        ...current[selectedTask.id],
        [selectedSection.id]: {
          ...current[selectedTask.id][selectedSection.id],
          [field]: value,
        },
      },
    }));
  };

  const resetSelected = () => {
    if (!selectedTask || !selectedSection) {
      return;
    }

    setDrafts((current) => ({
      ...current,
      [selectedTask.id]: {
        ...current[selectedTask.id],
        [selectedSection.id]: {
          html: selectedSection.starterHtml,
          css: selectedSection.starterCss,
        },
      },
    }));
  };

  const selectSection = (id: string) => {
    setSelectedSectionId(id);
    setEditorTab('html');
    setWorkspaceView('exercise');
  };

  if (!selectedTask || !selectedSection || !selectedDraft) {
    return (
      <div className={styles.simulator}>
        <ChallengeCatalog
          tasks={tasks}
          onRandomSelect={selectRandomTask}
          onSelect={selectTask}
        />
      </div>
    );
  }

  return (
    <div className={styles.simulator}>
      <header className={styles['simulator__header']}>
        <div>
          <p className={styles['simulator__eyebrow']}>HTML/CSS practice</p>
          <h1 className={styles['simulator__title']}>
            Frontend page simulator
          </h1>
        </div>
        <div className={styles['simulator__header-actions']}>
          <button
            className={styles['simulator__back']}
            onClick={() => setSelectedTaskId(null)}
            type="button"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            Choose another
          </button>
          <div className={styles['simulator__status']} aria-live="polite">
            <Save aria-hidden="true" size={16} />
            {saveStatus}
          </div>
        </div>
      </header>

      <main
        className={`${styles['simulator__workspace']} ${
          showPageMap ? '' : styles['simulator__workspace--single']
        }`}
      >
        {showPageMap && (
          <PageMap
            sections={selectedTask.sections}
            selectedId={selectedSection.id}
            onSelect={selectSection}
          />
        )}

        <div className={styles['simulator__work-area']}>
          <ModeBar
            workspaceView={workspaceView}
            showWholePage={showWholePage}
            onWorkspaceViewChange={setWorkspaceView}
            onReset={resetSelected}
          />

          {workspaceView === 'wholePage' && showWholePage ? (
            <section
              className={styles['simulator__whole-page']}
              aria-label="Whole page preview"
            >
              <PreviewFrame
                className={styles['simulator__whole-page-frame']}
                document={fullPreview}
                title="Full page preview"
              />
            </section>
          ) : (
            <ExerciseWorkspace
              draft={selectedDraft}
              editorTab={editorTab}
              previewDocument={focusPreview}
              section={selectedSection}
              task={selectedTask}
              onDraftChange={updateDraft}
              onEditorTabChange={setEditorTab}
            />
          )}
        </div>
      </main>
    </div>
  );
}
