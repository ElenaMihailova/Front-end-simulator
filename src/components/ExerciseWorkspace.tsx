import Editor from '@monaco-editor/react';
import { Code2, Eye, FileCode2 } from 'lucide-react';
import type { Task, TaskSection } from '../data/tasks';
import type { EditorTab, ExerciseDraft } from '../types';
import { PreviewFrame } from './PreviewFrame';
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
  return (
    <section
      className={styles['simulator__exercise']}
      aria-label="Focused exercise"
    >
      <div className={styles['simulator__exercise-header']}>
        <div>
          <p className={styles['simulator__exercise-eyebrow']}>
            {task.topic} / {task.type}
          </p>
          <h2 className={styles['simulator__exercise-title']}>{task.title}</h2>
          <span className={styles['simulator__exercise-scope']}>
            {task.prompt}
          </span>
          <span className={styles['simulator__exercise-brief']}>
            {section.scope}
          </span>
        </div>
      </div>

      <div className={styles['simulator__exercise-grid']}>
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
            onChange={(value) => onDraftChange(editorTab, value)}
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
            value={draft[editorTab]}
          />
        </div>

        <div className={styles['simulator__preview']}>
          <div className={styles['simulator__preview-toolbar']}>
            <Eye aria-hidden="true" size={17} />
            <span>Live preview</span>
          </div>
          <PreviewFrame
            className={styles['simulator__preview-frame']}
            document={previewDocument}
            title={`Preview: ${section.title}`}
          />
        </div>
      </div>
    </section>
  );
}
