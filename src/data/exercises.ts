import {
  CreditCard,
  FileText,
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
    scope: 'Logo, nav links, primary action',
    icon: LayoutTemplate,
    starterHtml: `<header class="site-header">
  <a class="brand" href="#">Studio</a>
  <nav class="nav" aria-label="Main navigation">
    <a href="#">Work</a>
    <a href="#">Services</a>
    <a href="#">Contact</a>
  </nav>
  <button class="header-button">Start</button>
</header>`,
    starterCss: `.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px 28px;
  background: #ffffff;
  border-bottom: 1px solid #d9dee8;
}

.brand {
  color: #101828;
  font-weight: 800;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 18px;
}

.nav a {
  color: #536179;
  text-decoration: none;
}

.header-button {
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
  <div class="hero-copy">
    <p class="kicker">Digital product studio</p>
    <h1>Build sharper interfaces for real users.</h1>
    <p class="lead">A compact landing block with direct copy and a focused call to action.</p>
    <a class="hero-action" href="#">View portfolio</a>
  </div>
  <div class="hero-panel" aria-hidden="true">
    <span></span>
    <span></span>
    <span></span>
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

.kicker {
  margin: 0 0 12px;
  color: #087f5b;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
}

h1 {
  max-width: 660px;
  margin: 0;
  color: #172033;
  font-size: 52px;
  line-height: 1;
}

.lead {
  max-width: 520px;
  color: #4f5f73;
  font-size: 18px;
  line-height: 1.6;
}

.hero-action {
  display: inline-flex;
  padding: 13px 18px;
  background: #087f5b;
  color: #ffffff;
  text-decoration: none;
}

.hero-panel {
  display: grid;
  gap: 14px;
}

.hero-panel span {
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
    starterHtml: `<section class="cards-section">
  <article class="card">
    <p>01</p>
    <h2>Interface audit</h2>
    <span>Find friction in current user flows.</span>
  </article>
  <article class="card">
    <p>02</p>
    <h2>Design system</h2>
    <span>Create repeatable UI patterns.</span>
  </article>
  <article class="card">
    <p>03</p>
    <h2>Frontend build</h2>
    <span>Ship responsive production screens.</span>
  </article>
</section>`,
    starterCss: `.cards-section {
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

.card p {
  margin: 0 0 42px;
  color: #b42318;
  font-weight: 800;
}

.card h2 {
  margin: 0 0 10px;
  color: #182230;
  font-size: 22px;
}

.card span {
  color: #526071;
  line-height: 1.45;
}`,
  },
  {
    id: 'form',
    title: 'Form',
    eyebrow: 'lead capture',
    scope: 'Fields, textarea, submit action',
    icon: Mail,
    starterHtml: `<section class="contact">
  <div>
    <p class="label">Project request</p>
    <h2>Tell us what needs to change.</h2>
  </div>
  <form class="contact-form">
    <label>
      Name
      <input type="text" placeholder="Alex Morgan" />
    </label>
    <label>
      Message
      <textarea placeholder="Short project brief"></textarea>
    </label>
    <button type="button">Send request</button>
  </form>
</section>`,
    starterCss: `.contact {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 34px;
  padding: 42px;
  background: #f6f7f9;
}

.label {
  margin: 0 0 10px;
  color: #9a3412;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
}

.contact h2 {
  margin: 0;
  color: #172033;
  font-size: 34px;
  line-height: 1.08;
}

.contact-form {
  display: grid;
  gap: 14px;
}

label {
  display: grid;
  gap: 8px;
  color: #344054;
  font-weight: 700;
}

input,
textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #cbd5e1;
  padding: 12px;
  font: inherit;
}

textarea {
  min-height: 110px;
}

button {
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
    eyebrow: 'closing',
    scope: 'Brand, links, legal row',
    icon: Footprints,
    starterHtml: `<footer class="footer">
  <div>
    <strong>Studio</strong>
    <p>Focused digital product work.</p>
  </div>
  <nav aria-label="Footer navigation">
    <a href="#">Privacy</a>
    <a href="#">Terms</a>
    <a href="#">LinkedIn</a>
  </nav>
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

.footer strong {
  font-size: 22px;
}

.footer p {
  margin: 8px 0 0;
  color: #c5cfdb;
}

.footer nav {
  display: flex;
  gap: 16px;
}

.footer a {
  color: #e8edf5;
  text-decoration: none;
}`,
  },
];

export const getExercise = (id: PageBlockId) =>
  exercises.find((exercise) => exercise.id === id) ?? exercises[0];
