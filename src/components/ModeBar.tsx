import { Eye, Rows3 } from 'lucide-react';
import type { WorkspaceView } from '../types';
import styles from '../App.module.css';

type ModeBarProps = {
  workspaceView: WorkspaceView;
  onWorkspaceViewChange: (view: WorkspaceView) => void;
};

export function ModeBar({
  workspaceView,
  onWorkspaceViewChange,
}: ModeBarProps) {
  return (
    <div className={styles['simulator__mode-bar']}>
      <div className={styles['simulator__mode-actions']}>
        <div
          className={styles['simulator__view-tabs']}
          role="group"
          aria-label="Preview mode"
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
        </div>
      </div>
    </div>
  );
}
