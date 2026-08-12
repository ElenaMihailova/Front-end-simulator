import { Eye, RotateCcw, Rows3 } from 'lucide-react';
import type { WorkspaceView } from '../types';
import styles from '../App.module.css';

type ModeBarProps = {
  showWholePage: boolean;
  workspaceView: WorkspaceView;
  onWorkspaceViewChange: (view: WorkspaceView) => void;
  onReset: () => void;
};

export function ModeBar({
  showWholePage,
  workspaceView,
  onWorkspaceViewChange,
  onReset,
}: ModeBarProps) {
  return (
    <div className={styles['simulator__mode-bar']}>
      <div className={styles['simulator__panel-header']}>
        <Rows3 aria-hidden="true" size={18} />
        <span>Practice mode</span>
      </div>
      <div className={styles['simulator__mode-actions']}>
        <div
          className={`${styles['simulator__view-tabs']} ${
            showWholePage ? '' : styles['simulator__view-tabs--single']
          }`}
          role="group"
          aria-label="Practice mode"
        >
          <button
            aria-pressed={workspaceView === 'exercise'}
            className={
              workspaceView === 'exercise'
                ? styles['simulator__view-tab--selected']
                : ''
            }
            onClick={() => onWorkspaceViewChange('exercise')}
            type="button"
          >
            <Eye aria-hidden="true" size={16} />
            Block preview
          </button>
          {showWholePage && (
            <button
              aria-pressed={workspaceView === 'wholePage'}
              className={
                workspaceView === 'wholePage'
                  ? styles['simulator__view-tab--selected']
                  : ''
              }
              onClick={() => onWorkspaceViewChange('wholePage')}
              type="button"
            >
              <Rows3 aria-hidden="true" size={16} />
              Full page
            </button>
          )}
        </div>
        <button
          className={styles['simulator__reset']}
          type="button"
          onClick={onReset}
        >
          <RotateCcw aria-hidden="true" size={16} />
          Reset block
        </button>
      </div>
    </div>
  );
}
