import { Shuffle } from 'lucide-react';
import type { Task } from '../data/tasks';
import styles from '../App.module.css';

type ChallengeCatalogProps = {
  tasks: Task[];
  onRandomSelect: () => void;
  onSelect: (task: Task) => void;
};

export function ChallengeCatalog({
  tasks,
  onRandomSelect,
  onSelect,
}: ChallengeCatalogProps) {
  return (
    <main className={styles['simulator__catalog']}>
      <section className={styles['simulator__empty-state']}>
        <p className={styles['simulator__eyebrow']}>HTML/CSS practice</p>
        <h1 className={styles['simulator__title']}>Choose a challenge</h1>
        <p className={styles['simulator__intro']}>
          Start with a focused frontend drill, write HTML/CSS, and inspect the
          live preview. No hints, scores, or backend.
        </p>
        <button
          className={styles['simulator__primary-action']}
          onClick={onRandomSelect}
          type="button"
        >
          <Shuffle aria-hidden="true" size={17} />
          Random challenge
        </button>
      </section>

      <section
        className={styles['simulator__task-catalog']}
        aria-label="Challenge catalog"
      >
        {tasks.map((task) => {
          const Icon = task.icon;

          return (
            <button
              className={styles['simulator__task-card']}
              key={task.id}
              onClick={() => onSelect(task)}
              type="button"
            >
              <span className={styles['simulator__task-icon']}>
                <Icon aria-hidden="true" size={18} />
              </span>
              <span className={styles['simulator__task-copy']}>
                <span className={styles['simulator__task-meta']}>
                  {task.type} / {task.difficulty} / {task.topic}
                </span>
                <strong className={styles['simulator__task-title']}>
                  {task.title}
                </strong>
                <span className={styles['simulator__task-prompt']}>
                  {task.prompt}
                </span>
              </span>
            </button>
          );
        })}
      </section>
    </main>
  );
}
