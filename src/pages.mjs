// Cuerpo de cada página. Cada función recibe `t` (textos del idioma) y `site` (site.config.mjs)
// y devuelve { title, description, body }.
import { routes, icon } from './layout.mjs';
import { visuals } from './visuals.mjs';

const r = (t, k) => routes[k][t.lang];
const serviceAnchor = (s) => `${s.id}`;
const caseId = (c) => c.sector.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const serviceCard = (t, s) => `
      <article class="card service-card">
        <div class="icon-badge">${icon(s.icon)}</div>
        <h3>${s.title}</h3>
        <p>${s.short}</p>
        <a class="link-arrow" href="${r(t, 'services')}#${serviceAnchor(s)}">${t.ui.learnMore} ${icon('arrow', 'icon icon-sm')}</a>
      </article>`;

const serviceTitle = (t, id) => t.services.find((s) => s.id === id)?.title ?? '';

const caseVisual = (t, c) => `
        <div class="case-art">
          ${visuals[c.visual]?.(c.v) ?? ''}
          <span class="case-art-note">${t.ui.illustrative}</span>
        </div>`;

// Tarjeta compacta (inicio)
const caseCard = (t, c) => `
      <a class="card case-card" href="${r(t, 'cases')}#${caseId(c)}">
        ${caseVisual(t, c)}
        <p class="case-meta"><span class="tag">${c.sector}</span><span>${serviceTitle(t, c.service)}</span></p>
        <h3>${c.title}</h3>
        <p class="case-summary">${c.summary}</p>
        <span class="link-arrow">${t.ui.learnMore} ${icon('arrow', 'icon icon-sm')}</span>
      </a>`;

// Ficha completa (página de casos)
const caseFeature = (t, c, i) => `
      <article class="case-feature${i % 2 ? ' reverse' : ''}" id="${caseId(c)}" data-service="${c.service}">
        ${caseVisual(t, c)}
        <div class="case-content">
          <p class="case-meta"><span class="tag">${c.sector}</span><span>${c.client}</span><span>· ${serviceTitle(t, c.service)}</span></p>
          <h2>${c.title}</h2>
          <p class="lead">${c.summary}</p>
          <dl class="case-body">
            <div><dt>${t.caseLabels.challenge}</dt><dd>${c.challenge}</dd></div>
            <div><dt>${t.caseLabels.solution}</dt><dd><ul class="checklist">${c.solution.map((x) => `<li>${icon('check', 'icon icon-sm')}<span>${x}</span></li>`).join('')}</ul></dd></div>
            <div class="case-result"><dt>${t.caseLabels.result}</dt><dd>${c.result}</dd></div>
          </dl>
          <ul class="chips">${c.tech.map((x) => `<li>${x}</li>`).join('')}</ul>
        </div>
      </article>`;

const stats = (t) => `
      <dl class="stats">
        ${t.stats.map((s) => `<div class="stat"><dt>${s.label}</dt><dd>${s.value}</dd></div>`).join('')}
      </dl>`;

const chips = (items) => `<ul class="chips chips-lg">${items.map((x) => `<li>${x}</li>`).join('')}</ul>`;

const pageHeader = (h1, lead) => `
    <section class="page-header">
      <div class="container narrow">
        <h1>${h1}</h1>
        <p class="lead">${lead}</p>
      </div>
    </section>`;

const finalCta = (t) => `
    <section class="section">
      <div class="container">
        <div class="cta-band">
          <div>
            <h2>${t.home.finalTitle}</h2>
            <p>${t.home.finalText}</p>
          </div>
          <a class="btn btn-light" href="${r(t, 'contact')}">${t.ui.cta} ${icon('arrow', 'icon icon-sm')}</a>
        </div>
      </div>
    </section>`;

const prose = (t, page) => `
    ${pageHeader(page.h1, page.intro ?? '')}
    <section class="section section-tight">
      <div class="container narrow prose">
        ${page.sections.map((s) => `<h2>${s.h}</h2>${s.p.map((p) => `<p>${p}</p>`).join('')}`).join('\n        ')}
      </div>
    </section>`;

export const pages = {
  home: (t) => {
    const h = t.home;
    return {
      title: h.title,
      description: h.description,
      body: `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">${h.eyebrow}</p>
          <h1>${h.h1}</h1>
          <p class="lead">${h.lead}</p>
          <div class="actions">
            <a class="btn btn-primary" href="${r(t, 'contact')}">${h.ctaPrimary} ${icon('arrow', 'icon icon-sm')}</a>
            <a class="btn btn-ghost" href="#servicios">${h.ctaSecondary}</a>
          </div>
          <p class="note">${h.note}</p>
        </div>
        <figure class="agent-demo" aria-label="${t.ui.illustrative}: ${h.demo.title}">
          <div class="agent-demo-head">
            <span class="agent-dot" aria-hidden="true"></span>
            <strong>${h.demo.title}</strong>
            <span class="agent-demo-tag">${t.ui.illustrative}</span>
          </div>
          <ol class="agent-steps">
            ${h.demo.steps
              .map(
                (s, i) => `<li style="--i:${i}"><span class="step-check">${icon('check', 'icon icon-sm')}</span><div><strong>${s.label}</strong><span>${s.detail}</span></div></li>`,
              )
              .join('\n            ')}
          </ol>
        </figure>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">${h.problemTitle}</h2>
        <div class="grid grid-3">
          ${h.problems.map((p) => `<div class="problem"><h3>${p.title}</h3><p>${p.text}</p></div>`).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="section" id="servicios">
      <div class="container">
        <div class="section-head">
          <h2 class="section-title">${h.servicesTitle}</h2>
          <p class="lead">${h.servicesLead}</p>
        </div>
        <div class="grid grid-3">${t.services.map((s) => serviceCard(t, s)).join('')}
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head">
          <h2 class="section-title">${h.howTitle}</h2>
          <p class="lead">${h.howLead}</p>
        </div>
        <ol class="steps">
          ${t.steps.map((s) => `<li><h3>${s.title}</h3><p>${s.text}</p></li>`).join('\n          ')}
        </ol>
      </div>
    </section>

    <section class="section">
      <div class="container team-grid">
        <div>
          <h2 class="section-title">${h.teamTitle}</h2>
          <p class="lead">${h.teamLead}</p>
          ${chips(t.expertise)}
        </div>
        ${stats(t)}
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head section-head-row">
          <div>
            <h2 class="section-title">${h.casesTitle}</h2>
            <p class="lead">${h.casesLead}</p>
          </div>
          <a class="link-arrow" href="${r(t, 'cases')}">${t.ui.allCases} ${icon('arrow', 'icon icon-sm')}</a>
        </div>
        <div class="grid grid-2">${t.cases.map((c) => caseCard(t, c)).join('')}
        </div>
      </div>
    </section>
${finalCta(t)}`,
    };
  },

  services: (t) => {
    const p = t.servicesPage;
    return {
      title: p.title,
      description: p.description,
      body: `
    ${pageHeader(p.h1, p.lead)}
    ${t.services
      .map(
        (s, i) => `
    <section class="section ${i % 2 ? 'section-alt' : ''}" id="${serviceAnchor(s)}">
      <div class="container service-detail">
        <div>
          <div class="icon-badge icon-badge-lg">${icon(s.icon)}</div>
          <h2>${s.title}</h2>
          <p class="lead">${s.short}</p>
          <p>${s.intro}</p>
        </div>
        <div class="card">
          <h3>${p.listTitle}</h3>
          <ul class="checklist">${s.bullets.map((b) => `<li>${icon('check', 'icon icon-sm')}<span>${b}</span></li>`).join('')}</ul>
        </div>
      </div>
    </section>`,
      )
      .join('')}
${finalCta(t)}`,
    };
  },

  cases: (t) => {
    const p = t.casesPage;
    const used = t.services.filter((s) => t.cases.some((c) => c.service === s.id));
    return {
      title: p.title,
      description: p.description,
      body: `
    ${pageHeader(p.h1, p.lead)}
    <section class="section section-tight">
      <div class="container">
        <div class="filters" role="group" aria-label="${t.nav.services}" hidden>
          <button type="button" class="filter" aria-pressed="true" data-filter="all">${t.ui.all}</button>
          ${used.map((s) => `<button type="button" class="filter" aria-pressed="false" data-filter="${s.id}">${s.title}</button>`).join('\n          ')}
        </div>
        <div class="cases-list">${t.cases.map((c, i) => caseFeature(t, c, i)).join('')}
        </div>
      </div>
    </section>
${finalCta(t)}`,
    };
  },

  about: (t) => {
    const p = t.aboutPage;
    return {
      title: p.title,
      description: p.description,
      body: `
    ${pageHeader(p.h1, p.lead)}
    <section class="section section-tight">
      <div class="container narrow prose">
        <h2>${p.storyTitle}</h2>
        ${p.story.map((x) => `<p>${x}</p>`).join('')}
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">${p.valuesTitle}</h2>
        <div class="grid grid-4">
          ${p.values.map((v) => `<div class="problem"><h3>${v.title}</h3><p>${v.text}</p></div>`).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container team-grid">
        <div>
          <h2 class="section-title">${p.teamTitle}</h2>
          <p class="lead">${p.teamText}</p>
          ${chips(t.expertise)}
          <h3 class="subhead">${p.certsTitle}</h3>
          <ul class="plain-list">${p.certs.map((c) => `<li>${c}</li>`).join('')}</ul>
        </div>
        ${stats(t)}
      </div>
    </section>
${finalCta(t)}`,
    };
  },

  contact: (t, site) => {
    const p = t.contactPage;
    const f = p.form;
    const email = site.email || t.pending(t.lang === 'es' ? 'email en site.config.mjs' : 'email in site.config.mjs');
    return {
      title: p.title,
      description: p.description,
      body: `
    ${pageHeader(p.h1, p.lead)}
    <section class="section section-tight">
      <div class="container contact-grid">
        <form class="card contact-form" method="POST" action="${site.formEndpoint || '#'}"
              data-endpoint="${site.formEndpoint}" data-email="${site.email}" data-subject="${f.mailSubject}"
              data-sending="${f.sending}" data-ok="${f.ok}" data-error="${f.error}">
          <div class="field-row">
            <label>${f.name}<input name="name" autocomplete="name" required></label>
            <label>${f.company}<input name="company" autocomplete="organization"></label>
          </div>
          <label>${f.email}<input name="email" type="email" autocomplete="email" required></label>
          <label>${f.message}<textarea name="message" rows="6" required placeholder="${f.messageHint}"></textarea></label>
          <label class="checkbox"><input type="checkbox" name="consent" required><span>${f.consent.replace('{privacy}', r(t, 'privacy'))}</span></label>
          <div class="visually-hidden" aria-hidden="true"><input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></div>
          <button class="btn btn-primary" type="submit">${f.submit} ${icon('arrow', 'icon icon-sm')}</button>
          <p class="form-status" role="status" aria-live="polite"></p>
        </form>
        <aside class="contact-aside">
          <h2>${p.asideTitle}</h2>
          <ul class="contact-list">
            <li>${icon('mail')}<div><span>${p.emailLabel}</span>${site.email ? `<a href="mailto:${site.email}">${site.email}</a>` : email}</div></li>
            ${site.linkedin ? `<li>${icon('linkedin')}<div><span>${p.linkedinLabel}</span><a href="${site.linkedin}" rel="noopener">${site.name}</a></div></li>` : ''}
          </ul>
          <p class="note">${t.home.note}</p>
        </aside>
      </div>
    </section>`,
    };
  },

  legal: (t) => ({ title: t.legalPage.title, description: t.legalPage.description, body: prose(t, t.legalPage) }),
  privacy: (t) => ({ title: t.privacyPage.title, description: t.privacyPage.description, body: prose(t, t.privacyPage) }),
};

export const notFound = (t) => ({
  title: t.notFound.title,
  description: t.notFound.text,
  body: `
    <section class="page-header page-404">
      <div class="container narrow">
        <p class="eyebrow">404</p>
        <h1>${t.notFound.h1}</h1>
        <p class="lead">${t.notFound.text}</p>
        <div class="actions"><a class="btn btn-primary" href="${r(t, 'home')}">${t.notFound.back}</a></div>
      </div>
    </section>`,
});
