import {
  AlignJustify,
  Columns3,
  LayoutDashboard,
  LayoutTemplate,
  PanelBottom,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { exercises } from './exercises';
import type { EditorTab } from '../types';

export type TaskType = 'build-from-scratch' | 'fix-layout' | 'responsive';

export type TaskDifficulty = 'foundation' | 'warm-up' | 'interview' | 'focused';

export type TaskSectionId = string;

export type TaskSection = {
  id: TaskSectionId;
  title: string;
  eyebrow: string;
  scope: string;
  starterHtml: string;
  starterCss: string;
  editableTabs?: EditorTab[];
  emptyPreview?: boolean;
};

export type Task = {
  id: string;
  title: string;
  prompt: string;
  topic: string;
  difficulty: TaskDifficulty;
  type: TaskType;
  icon: LucideIcon;
  brief?: string[];
  doneWhen?: string[];
  interviewFollowUp?: string;
  sections: TaskSection[];
  supportsWholePage?: boolean;
  sourceUrl?: string;
  referenceSolution?: {
    html?: string;
    css?: string;
  };
  assertions?: string[];
};

export const tasks: Task[] = [
  {
    id: 'equal-card-actions',
    title: 'Equal card actions',
    prompt:
      'Three cards have descriptions of different lengths. Align their action buttons on the same bottom line.',
    topic: 'Flexbox, nested layout, card component',
    difficulty: 'foundation',
    type: 'build-from-scratch',
    icon: PanelBottom,
    sourceUrl:
      'https://developer.mozilla.org/en-US/docs/Web/CSS/How_to/Layout_cookbook/Card',
    brief: [
      'At 768px and wider: three cards in one row.',
      'Equal card width and equal card height.',
      'One action button per card, with buttons aligned on one horizontal line at the bottom despite descriptions of different lengths.',
      'Visible gaps between cards.',
      'Below 768px: one column.',
      'Use the provided semantic HTML reference and write only the CSS.',
      'Do not use absolute positioning or fixed heights to align buttons.',
    ],
    doneWhen: [
      'Desktop layout is a three-card row.',
      'Card bottoms are equal.',
      'Action buttons are aligned.',
      'Narrow screen stacks without horizontal scrolling.',
      'Changing one description length does not break alignment.',
    ],
    interviewFollowUp:
      'Explain how the alignment was achieved without fixed card height and why absolute positioning is avoided.',
    sections: [
      {
        id: 'cards',
        title: 'Cards',
        eyebrow: 'css only',
        scope:
          'Style the provided travel cards so the actions align at the bottom.',
        starterHtml: `<section class="cards" aria-labelledby="cards-title">
  <h1 class="cards__title" id="cards-title">Weekend escapes</h1>
  <ul class="cards__list" aria-label="Travel ideas">
    <li class="cards__item">
      <article class="card">
        <img
          class="card__image"
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
          alt="Clear turquoise water and a sandy tropical beach"
        />
        <p class="card__meta">Coast / 2 nights</p>
        <h2 class="card__title">Island reset</h2>
        <p class="card__description">Slow mornings, a quiet shoreline and enough open space to fully switch off.</p>
        <button class="card__action" type="button">Explore coast</button>
      </article>
    </li>
    <li class="cards__item">
      <article class="card">
        <img
          class="card__image"
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80"
          alt="Mountain lake surrounded by peaks under a dramatic sky"
        />
        <p class="card__meta">Highlands / 3 nights</p>
        <h2 class="card__title">Alpine cabin</h2>
        <p class="card__description">A compact mountain break with lake walks, fresh air and a warm cabin base for evenings after long trails.</p>
        <button class="card__action" type="button">View cabin</button>
      </article>
    </li>
    <li class="cards__item">
      <article class="card">
        <img
          class="card__image"
          src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80"
          alt="Colorful hillside village on the Italian coast"
        />
        <p class="card__meta">Village / 4 nights</p>
        <h2 class="card__title">Coastal town</h2>
        <p class="card__description">A longer stay for cafe hopping, small galleries, harbor views, late dinners and unplanned side streets worth following.</p>
        <button class="card__action" type="button">Plan visit</button>
      </article>
    </li>
  </ul>
</section>`,
        starterCss: '',
        editableTabs: ['css'],
        emptyPreview: true,
      },
    ],
  },
  {
    id: 'responsive-cards-row',
    title: 'Responsive cards row',
    prompt:
      'Build a three-card services row that works on desktop and stacks cleanly on narrow screens.',
    topic: 'CSS grid',
    difficulty: 'interview',
    type: 'responsive',
    icon: Columns3,
    sections: [
      {
        id: 'cards',
        title: 'Cards',
        eyebrow: 'responsive layout',
        scope: 'Three cards, desktop row, mobile stack',
        starterHtml: `<section class="cards">
  <article class="card">
    <p class="card__number">01</p>
    <h2 class="card__title">Interface audit</h2>
    <p class="card__text">Find layout and usability issues before implementation.</p>
  </article>
  <article class="card">
    <p class="card__number">02</p>
    <h2 class="card__title">Design system</h2>
    <p class="card__text">Create reusable UI patterns for product teams.</p>
  </article>
  <article class="card">
    <p class="card__number">03</p>
    <h2 class="card__title">Frontend build</h2>
    <p class="card__text">Ship production screens with resilient CSS.</p>
  </article>
</section>`,
        starterCss: `.cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  padding: 36px;
  background: #ffffff;
}

.card {
  min-height: 190px;
  padding: 24px;
  border: 1px solid #d8e0ec;
  background: #f8fafc;
}

.card__number {
  margin: 0 0 40px;
  color: #0f766e;
  font-weight: 800;
}

.card__title {
  margin: 0 0 10px;
  color: #172033;
  font-size: 22px;
}

.card__text {
  margin: 0;
  color: #526071;
  line-height: 1.5;
}`,
      },
    ],
  },
  {
    id: 'header-alignment',
    title: 'Header alignment',
    prompt:
      'Create a balanced product header with a brand, navigation controls and a primary action.',
    topic: 'Flexbox',
    difficulty: 'warm-up',
    type: 'build-from-scratch',
    icon: AlignJustify,
    sections: [
      {
        id: 'header',
        title: 'Header',
        eyebrow: 'build from scratch',
        scope: 'Brand, navigation, action',
        starterHtml: `<header class="header">
  <strong class="header__brand">Studio</strong>
  <div class="header__nav" role="group" aria-label="Demo sections">
    <button class="header__nav-link" type="button">Work</button>
    <button class="header__nav-link" type="button">Services</button>
    <button class="header__nav-link" type="button">Contact</button>
  </div>
  <button class="header__button" type="button">Start</button>
</header>`,
        starterCss: `.header {
  padding: 20px 28px;
  background: #ffffff;
  border-bottom: 1px solid #d9dee8;
}

.header__brand {
  color: #172033;
  font-weight: 800;
}

.header__nav-link {
  border: 0;
  background: transparent;
  color: #536179;
  cursor: pointer;
}

.header__button {
  border: 0;
  padding: 10px 16px;
  background: #174ea6;
  color: #ffffff;
  font-weight: 800;
}`,
      },
    ],
  },
  {
    id: 'fix-layout-overlap',
    title: 'Fix a layout overlap',
    prompt:
      'Repair the broken promo layout so text, image placeholder and action are readable at normal desktop width.',
    topic: 'Layout debugging',
    difficulty: 'focused',
    type: 'fix-layout',
    icon: LayoutDashboard,
    sections: [
      {
        id: 'promo',
        title: 'Promo block',
        eyebrow: 'fix layout',
        scope: 'Broken overlap, spacing, readable content',
        starterHtml: `<section class="promo">
  <div class="promo__content">
    <p class="promo__label">Product update</p>
    <h1 class="promo__title">Design reviews without the meeting overload.</h1>
    <p class="promo__text">Keep the core message readable while preserving a strong visual area.</p>
    <button class="promo__button" type="button">Review changes</button>
  </div>
  <div class="promo__visual" aria-hidden="true"></div>
</section>`,
        starterCss: `.promo {
  position: relative;
  min-height: 360px;
  padding: 28px;
  background: #edf6f4;
  overflow: hidden;
}

.promo__content {
  position: absolute;
  top: 48px;
  left: 48px;
  width: 62%;
  z-index: 1;
}

.promo__label {
  margin: 0 0 10px;
  color: #0f766e;
  font-weight: 800;
  text-transform: uppercase;
}

.promo__title {
  margin: 0;
  color: #172033;
  font-size: 46px;
  line-height: 1;
}

.promo__text {
  max-width: 420px;
  color: #4f5f73;
  font-size: 18px;
  line-height: 1.5;
}

.promo__button {
  border: 0;
  padding: 12px 18px;
  background: #0f766e;
  color: #ffffff;
  font-weight: 800;
}

.promo__visual {
  position: absolute;
  right: 34px;
  bottom: 28px;
  width: 52%;
  height: 240px;
  border: 1px solid #b7d9d3;
  background: #ffffff;
}`,
      },
    ],
  },
  {
    id: 'mini-page-sections',
    title: 'Mini landing page sections',
    prompt:
      'Work through a compact multi-section page and keep each block readable as part of the full layout.',
    topic: 'Page structure',
    difficulty: 'focused',
    type: 'build-from-scratch',
    icon: LayoutTemplate,
    supportsWholePage: true,
    sections: exercises.map(
      ({ id, title, eyebrow, scope, starterHtml, starterCss }) => ({
        id,
        title,
        eyebrow,
        scope,
        starterHtml,
        starterCss,
      }),
    ),
  },
];

export const getTask = (id: string) =>
  tasks.find((task) => task.id === id) ?? tasks[0];
