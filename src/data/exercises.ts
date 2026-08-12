import {
  CreditCard,
  Footprints,
  LayoutTemplate,
  Mail,
  MousePointer2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type PageBlockId = 'header' | 'hero' | 'cards' | 'form' | 'footer';

export type Exercise = {
  id: PageBlockId;
  title: string;
  eyebrow: string;
  scope: string;
  icon: LucideIcon;
  starterHtml: string;
  starterCss: string;
};

export const exercises: Exercise[] = [
  {
    id: 'header',
    title: 'Header',
    eyebrow: 'navigation',
    scope: 'Logo, links, primary action',
    icon: LayoutTemplate,
    starterHtml: `<header class="header">
  <strong class="header__brand">Studio</strong>
  <div class="header__nav" role="group" aria-label="Demo sections">
    <button class="header__nav-link header__nav-link--active" type="button">Work</button>
    <button class="header__nav-link" type="button">Services</button>
    <button class="header__nav-link" type="button">Contact</button>
  </div>
  <button class="header__button">Start</button>
</header>`,
    starterCss: `.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px 28px;
  background: #ffffff;
  border-bottom: 1px solid #d9dee8;
}

.header__brand {
  color: #101828;
  font-weight: 800;
}

.header__nav {
  display: flex;
  gap: 18px;
}

.header__nav-link {
  border: 0;
  padding: 0;
  background: transparent;
  color: #536179;
  cursor: pointer;
}

.header__nav-link--active {
  color: #174ea6;
  font-weight: 800;
}

.header__button {
  border: 0;
  padding: 10px 16px;
  background: #174ea6;
  color: #ffffff;
  font-weight: 700;
}`,
  },
  {
    id: 'hero',
    title: 'Hero',
    eyebrow: 'first screen',
    scope: 'Headline, copy, CTA, visual area',
    icon: MousePointer2,
    starterHtml: `<section class="hero">
  <div class="hero__content">
    <p class="hero__kicker">Digital product studio</p>
    <h1 class="hero__title">Build sharper interfaces for real users.</h1>
    <p class="hero__lead">A compact landing block with direct copy and a focused call to action.</p>
    <button class="hero__action" type="button">View portfolio</button>
  </div>
  <div class="hero__visual" aria-hidden="true">
    <span class="hero__visual-row"></span>
    <span class="hero__visual-row"></span>
    <span class="hero__visual-row"></span>
  </div>
</section>`,
    starterCss: `.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(220px, 0.9fr);
  gap: 32px;
  align-items: center;
  min-height: 420px;
  padding: 56px 44px;
  background: #edf6f4;
}

.hero__kicker {
  margin: 0 0 12px;
  color: #087f5b;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
}

.hero__title {
  max-width: 660px;
  margin: 0;
  color: #172033;
  font-size: 52px;
  line-height: 1;
}

.hero__lead {
  max-width: 520px;
  color: #4f5f73;
  font-size: 18px;
  line-height: 1.6;
}

.hero__action {
  display: inline-flex;
  border: 0;
  padding: 13px 18px;
  background: #087f5b;
  color: #ffffff;
  cursor: pointer;
}

.hero__visual {
  display: grid;
  gap: 14px;
}

.hero__visual-row {
  min-height: 82px;
  background: #ffffff;
  border: 1px solid #cce3de;
}`,
  },
  {
    id: 'cards',
    title: 'Cards',
    eyebrow: 'content grid',
    scope: 'Three service cards',
    icon: CreditCard,
    starterHtml: `<section class="cards">
  <article class="card card--audit">
    <p class="card__number">01</p>
    <h2 class="card__title">Interface audit</h2>
    <span class="card__text">Find friction in current user flows.</span>
  </article>
  <article class="card card--system">
    <p class="card__number">02</p>
    <h2 class="card__title">Design system</h2>
    <span class="card__text">Create repeatable UI patterns.</span>
  </article>
  <article class="card card--build">
    <p class="card__number">03</p>
    <h2 class="card__title">Frontend build</h2>
    <span class="card__text">Ship responsive production screens.</span>
  </article>
</section>`,
    starterCss: `.cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  padding: 38px;
  background: #ffffff;
}

.card {
  min-height: 190px;
  padding: 24px;
  background: #f8fafc;
  border: 1px solid #dbe3ee;
}

.card__number {
  margin: 0 0 42px;
  color: #b42318;
  font-weight: 800;
}

.card__title {
  margin: 0 0 10px;
  color: #182230;
  font-size: 22px;
}

.card__text {
  color: #526071;
  line-height: 1.45;
}`,
  },
  {
    id: 'form',
    title: 'Form',
    eyebrow: 'contact block',
    scope: 'Fields, textarea, submit action',
    icon: Mail,
    starterHtml: `<section class="contact">
  <div class="contact__content">
    <p class="contact__label">Project request</p>
    <h2 class="contact__title">Tell us what needs to change.</h2>
  </div>
  <form class="contact-form">
    <label class="contact-form__field">
      Name
      <input class="contact-form__input" type="text" placeholder="Alex Morgan" />
    </label>
    <label class="contact-form__field">
      Message
      <textarea class="contact-form__textarea" placeholder="Short project brief"></textarea>
    </label>
    <button class="contact-form__button" type="button">Send request</button>
  </form>
</section>`,
    starterCss: `.contact {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 34px;
  padding: 42px;
  background: #f6f7f9;
}

.contact__label {
  margin: 0 0 10px;
  color: #9a3412;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
}

.contact__title {
  margin: 0;
  color: #172033;
  font-size: 34px;
  line-height: 1.08;
}

.contact-form {
  display: grid;
  gap: 14px;
}

.contact-form__field {
  display: grid;
  gap: 8px;
  color: #344054;
  font-weight: 700;
}

.contact-form__input,
.contact-form__textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #cbd5e1;
  padding: 12px;
  font: inherit;
}

.contact-form__textarea {
  min-height: 110px;
}

.contact-form__button {
  justify-self: start;
  border: 0;
  padding: 12px 18px;
  background: #9a3412;
  color: #ffffff;
  font-weight: 800;
}`,
  },
  {
    id: 'footer',
    title: 'Footer',
    eyebrow: 'page ending',
    scope: 'Brand, links, utility row',
    icon: Footprints,
    starterHtml: `<footer class="footer">
  <div class="footer__content">
    <strong class="footer__brand">Studio</strong>
    <p class="footer__text">Focused digital product work.</p>
  </div>
  <div class="footer__nav" role="group" aria-label="Utility links">
    <button class="footer__nav-link" type="button">Privacy</button>
    <button class="footer__nav-link" type="button">Terms</button>
    <button class="footer__nav-link" type="button">LinkedIn</button>
  </div>
</footer>`,
    starterCss: `.footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  padding: 32px 38px;
  background: #172033;
  color: #ffffff;
}

.footer__brand {
  font-size: 22px;
}

.footer__text {
  margin: 8px 0 0;
  color: #c5cfdb;
}

.footer__nav {
  display: flex;
  gap: 16px;
}

.footer__nav-link {
  border: 0;
  padding: 0;
  background: transparent;
  color: #e8edf5;
  cursor: pointer;
}`,
  },
];

export const getExercise = (id: PageBlockId) =>
  exercises.find((exercise) => exercise.id === id) ?? exercises[0];
