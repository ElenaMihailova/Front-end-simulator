import { describe, expect, it } from 'vitest';
import { tasks } from '../data/tasks';
import {
  currentStorageKey,
  legacyStorageKeys,
  loadDraftsWithMigration,
} from './drafts';

class MemoryStorage {
  private values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }

  removeItem(key: string) {
    this.values.delete(key);
  }
}

describe('loadDraftsWithMigration', () => {
  it('loads current task-specific drafts and merges missing catalog tasks', () => {
    const storage = new MemoryStorage();
    storage.setItem(
      currentStorageKey,
      JSON.stringify({
        'header-alignment': {
          header: { html: '<header>Current</header>', css: '.header {}' },
        },
      }),
    );

    const drafts = loadDraftsWithMigration(storage, tasks);

    expect(drafts['header-alignment'].header.html).toBe(
      '<header>Current</header>',
    );
    expect(drafts['responsive-cards-row'].cards.html).toContain(
      'class="cards"',
    );
  });

  it('does not overwrite current drafts when legacy data also exists', () => {
    const storage = new MemoryStorage();
    storage.setItem(
      currentStorageKey,
      JSON.stringify({
        'header-alignment': {
          header: { html: '<header>Current</header>', css: '.current {}' },
        },
      }),
    );
    storage.setItem(
      legacyStorageKeys[0],
      JSON.stringify({ hero: { html: 'Legacy' } }),
    );

    const drafts = loadDraftsWithMigration(storage, tasks);

    expect(drafts['header-alignment'].header.html).toBe(
      '<header>Current</header>',
    );
    expect(storage.getItem(legacyStorageKeys[0])).not.toBeNull();
  });

  it('migrates legacy section drafts into matching task sections before removing the old key', () => {
    const storage = new MemoryStorage();
    storage.setItem(
      legacyStorageKeys[0],
      JSON.stringify({
        hero: {
          html: '<section class="hero">Legacy hero</section>',
          css: '.hero {}',
        },
      }),
    );

    const drafts = loadDraftsWithMigration(storage, tasks);

    expect(drafts['mini-page-sections'].hero.html).toBe(
      '<section class="hero">Legacy hero</section>',
    );
    expect(storage.getItem(currentStorageKey)).toContain('header-alignment');
    expect(storage.getItem(legacyStorageKeys[0])).toBeNull();
  });

  it('falls back to starter task drafts when legacy JSON is invalid', () => {
    const storage = new MemoryStorage();
    storage.setItem(legacyStorageKeys[0], '{broken');

    const drafts = loadDraftsWithMigration(storage, tasks);

    expect(drafts['responsive-cards-row'].cards.html).toContain(
      'class="cards"',
    );
    expect(storage.getItem(currentStorageKey)).toBeNull();
  });
});
