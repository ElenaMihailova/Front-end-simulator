import { useRef } from 'react';
import { PanelLeft } from 'lucide-react';
import type { TaskSection } from '../data/tasks';
import styles from '../App.module.css';

type PageMapProps = {
  sections: TaskSection[];
  selectedId: string;
  onSelect: (id: string) => void;
};

const getNodeLabel = (section: TaskSection) =>
  `<body> / <section.${section.id}>`;

export function PageMap({ sections, selectedId, onSelect }: PageMapProps) {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusByIndex = (index: number) => {
    buttonRefs.current[index]?.focus();
  };

  return (
    <aside className={styles['simulator__map']} aria-label="Mini page map">
      <div className={styles['simulator__panel-header']}>
        <PanelLeft aria-hidden="true" size={18} />
        <span>Page structure</span>
      </div>

      <nav className={styles['simulator__map-list']} aria-label="Page sections">
        {sections.map((section, index) => {
          const active = section.id === selectedId;

          return (
            <button
              aria-current={active ? 'page' : undefined}
              className={`${styles['simulator__map-item']} ${
                active ? styles['simulator__map-item--active'] : ''
              }`}
              key={section.id}
              onClick={() => onSelect(section.id)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                  event.preventDefault();
                  focusByIndex((index + 1) % sections.length);
                }

                if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                  event.preventDefault();
                  focusByIndex((index - 1 + sections.length) % sections.length);
                }

                if (event.key === 'Home') {
                  event.preventDefault();
                  focusByIndex(0);
                }

                if (event.key === 'End') {
                  event.preventDefault();
                  focusByIndex(sections.length - 1);
                }
              }}
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              type="button"
            >
              <span className={styles['simulator__map-icon']}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={styles['simulator__map-copy']}>
                <code className={styles['simulator__map-node']}>
                  {getNodeLabel(section)}
                </code>
                <strong className={styles['simulator__map-title']}>
                  {section.title}
                </strong>
                <small className={styles['simulator__map-description']}>
                  {section.scope}
                </small>
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
