// Cuerpo de cada página. Cada función recibe `t` (textos del idioma) y `site` (site.config.mjs)
// y devuelve { title, description, body }.
import { routes, icon, brandIcon, phoneHref, phoneLabel, whatsappHref } from './layout.mjs';
import { visuals, serviceArt, heroChart, heroNetwork } from './visuals.mjs';
import clients from './content/clients.mjs';

const r = (t, k) => routes[k][t.lang];
const callHref = (t) => `${r(t, 'contact')}#${t.lang === 'es' ? 'llamada' : 'call'}`;
const caseId = (c) => c.id;
const serviceTitle = (t, id) => t.services.find((s) => s.id === id)?.title ?? '';

// Iconos por posición (compartidos por los dos idiomas).
const ICONS = {
  problems: ['repeat', 'shuffle', 'hourglass'],
  steps: ['ear', 'search', 'lightbulb', 'handshake'],
  values: ['ear', 'puzzle', 'target', 'badge-check'],
  stats: ['calendar-clock', 'briefcase', 'building-2'],
  bullets: {
    ia: ['message-square', 'file-text', 'bar-chart-3', 'plug', 'shield-check'],
    procesos: ['users', 'search', 'git-compare', 'zap', 'gauge'],
    modernizacion: ['sparkles', 'smartphone', 'globe', 'layers', 'refresh-cw', 'plug', 'lock'],
  },
};

// `data-reveal` activa la animación de entrada al hacer scroll (main.js).
const reveal = (i = 0) => `data-reveal style="--d:${i * 80}ms"`;
const arrow = () => icon('arrow-right', 'icon icon-sm');

const sectionHead = (title, lead, extra = '') => `
        <div class="section-head" ${reveal()}>
          <h2 class="section-title">${title}</h2>
          ${lead ? `<p class="lead">${lead}</p>` : ''}
          ${extra}
        </div>`;

const pageHeader = (eyebrowIcon, eyebrow, h1, lead) => `
    <section class="page-header">
      <div class="page-header-bg" aria-hidden="true"></div>
      <div class="container narrow">
        ${eyebrow ? `<p class="eyebrow eyebrow-icon">${icon(eyebrowIcon, 'icon icon-sm')}${eyebrow}</p>` : ''}
        <h1>${h1}</h1>
        ${lead ? `<p class="lead">${lead}</p>` : ''}
      </div>
    </section>`;

const sectorsStrip = (t, title) => `
      <div class="sectors-strip">
        <p class="sectors-title">${title}</p>
        <ul class="sectors">
          ${t.sectors.map((s, i) => `<li ${reveal(i)}>${icon(s.icon)}<span>${s.name}</span></li>`).join('\n          ')}
        </ul>
      </div>`;

const logoTile = (c, hidden = false) =>
  `<li class="logo-tile"${hidden ? ' aria-hidden="true"' : ''}><img src="/logos/${c.logo}" alt="${hidden ? '' : c.name}" decoding="async"></li>`;

// Cinta de logos en bucle (inicio): la lista va duplicada para que el desplazamiento sea continuo.
const clientsMarquee = (title) => `
      <div class="clients">
        <p class="clients-title">${title}</p>
        <div class="marquee">
          <ul class="marquee-track">
            ${clients.map((c) => logoTile(c)).join('')}${clients.map((c) => logoTile(c, true)).join('')}
          </ul>
        </div>
      </div>`;

const clientsGrid = (title) => `
      <div class="clients clients-static">
        <p class="clients-title">${title}</p>
        <ul class="logo-grid">${clients.map((c, i) => logoTile(c).replace('<li class="logo-tile"', `<li class="logo-tile" ${reveal(i)}`)).join('')}</ul>
      </div>`;

const stats = (t) => `
      <dl class="stats">
        ${t.stats
          .map(
            (s, i) => `<div class="stat" ${reveal(i)}>
          <span class="stat-icon">${icon(ICONS.stats[i])}</span>
          <div><dd data-count="${s.value}">${s.value}</dd><dt>${s.label}</dt></div>
        </div>`,
          )
          .join('\n        ')}
      </dl>`;

const chips = (items) => `<ul class="chips chips-lg">${items.map((x) => `<li>${x}</li>`).join('')}</ul>`;

const serviceCard = (t, s, i, featured) => `
      <article class="card service-card${featured ? ' service-card-featured' : ''}" ${reveal(i)}>
        <div class="service-art-wrap">${serviceArt[s.id] ?? ''}</div>
        <div class="service-card-body">
          <div class="service-card-title"><span class="icon-badge">${icon(s.icon)}</span><h3>${s.title}</h3></div>
          <p>${s.short}</p>
          ${
            featured
              ? `<ul class="mini-list">${s.bullets
                  .slice(0, 3)
                  .map((b, j) => `<li>${icon(ICONS.bullets[s.id][j], 'icon icon-sm')}<span>${b}</span></li>`)
                  .join('')}</ul>`
              : ''
          }
          <a class="link-arrow" href="${r(t, 'services')}#${s.id}">${t.ui.learnMore} ${arrow()}</a>
        </div>
      </article>`;

const caseVisual = (t, c) => `
        <div class="case-art">
          ${visuals[c.visual]?.(c.v) ?? ''}
          <span class="case-art-note">${t.ui.illustrative}</span>
        </div>`;

const caseTag = (c) => `<span class="tag">${icon(c.icon, 'icon icon-xs')}${c.sector}</span>`;

// Tarjeta compacta (inicio)
const caseCard = (t, c, i) => `
      <a class="card case-card" href="${r(t, 'cases')}#${caseId(c)}" ${reveal(i)}>
        ${caseVisual(t, c)}
        <p class="case-meta">${caseTag(c)}<span>${serviceTitle(t, c.service)}</span></p>
        <h3>${c.title}</h3>
        <p class="case-summary">${c.summary}</p>
        <span class="link-arrow">${t.ui.learnMore} ${arrow()}</span>
      </a>`;

// Ficha completa (página de casos)
const caseFeature = (t, c, i) => `
      <article class="case-feature${i % 2 ? ' reverse' : ''}" id="${caseId(c)}" data-service="${c.service}" ${reveal()}>
        ${caseVisual(t, c)}
        <div class="case-content">
          <p class="case-meta">${caseTag(c)}<span>${c.client}</span><span>· ${serviceTitle(t, c.service)}</span></p>
          <h2>${c.title}</h2>
          <p class="lead">${c.summary}</p>
          <dl class="case-body">
            <div><dt>${t.caseLabels.challenge}</dt><dd>${c.challenge}</dd></div>
            <div><dt>${t.caseLabels.solution}</dt><dd><ul class="checklist">${c.solution.map((x) => `<li>${icon('check', 'icon icon-sm')}<span>${x}</span></li>`).join('')}</ul></dd></div>
            <div class="case-result"><dt>${icon('trending-down', 'icon icon-sm')}${t.caseLabels.result}</dt><dd>${c.result}</dd></div>
          </dl>
          <ul class="chips">${c.tech.map((x) => `<li>${x}</li>`).join('')}</ul>
        </div>
      </article>`;

const finalCta = (t) => `
    <section class="section">
      <div class="container">
        <div class="cta-band" ${reveal()}>
          <div class="cta-band-art" aria-hidden="true">${icon('sparkles', 'icon')}</div>
          <div class="cta-band-copy">
            <h2>${t.home.finalTitle}</h2>
            <p>${t.home.finalText}</p>
          </div>
          <div class="cta-band-actions">
            <a class="btn btn-light" href="${r(t, 'contact')}">${t.ui.cta} ${arrow()}</a>
            <a class="btn btn-outline-light" href="${callHref(t)}">${icon('telephone', 'icon icon-sm')}${t.ui.callMe}</a>
          </div>
        </div>
      </div>
    </section>`;

const prose = (t, page) => `
    ${pageHeader('file-text', '', page.h1, page.intro ?? '')}
    <section class="section section-tight">
      <div class="container narrow prose">
        ${page.sections.map((s) => `<h2>${s.h}</h2>${s.p.map((p) => `<p>${p}</p>`).join('')}`).join('\n        ')}
      </div>
    </section>`;

export const pages = {
  home: (t) => {
    const h = t.home;
    const [feature, ...rest] = t.services;
    return {
      title: h.title,
      description: h.description,
      body: `
    <section class="hero">
      <div class="hero-bg" aria-hidden="true">${heroNetwork()}</div>
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">${h.eyebrow}</p>
          <h1>${h.h1}</h1>
          <p class="lead">${h.lead}</p>
          <div class="actions">
            <a class="btn btn-primary" href="${r(t, 'contact')}">${h.ctaPrimary} ${arrow()}</a>
            <a class="btn btn-ghost" href="#servicios">${h.ctaSecondary}</a>
          </div>
          <p class="note">${icon('check', 'icon icon-sm')}${h.note}<a class="note-link" href="${callHref(t)}">${icon('telephone', 'icon icon-xs')}${t.ui.callMe}</a></p>
        </div>
        <div class="hero-visual">
          <figure class="agent-demo" aria-label="${t.ui.illustrative}: ${h.demo.title}">
            <div class="agent-demo-head">
              <span class="agent-avatar">${icon('bot', 'icon icon-sm')}</span>
              <strong>${h.demo.title}</strong>
              <span class="agent-demo-tag">${t.ui.illustrative}</span>
            </div>
            <ol class="agent-steps">
              ${h.demo.steps
                .map(
                  (s, i) =>
                    `<li style="--i:${i}"><span class="step-check">${icon(['message-circle', 'database', 'send'][i], 'icon icon-sm')}</span><div><strong>${s.label}</strong><span>${s.detail}</span></div></li>`,
                )
                .join('\n              ')}
            </ol>
          </figure>
          <div class="float-card chart-card" aria-hidden="true">
            <p class="float-card-title">${icon('bar-chart-3', 'icon icon-xs')}${h.chart.title}</p>
            ${heroChart(h.chart)}
            <p class="chart-legend"><span class="lg-old">${h.chart.before}</span><span class="lg-new">${h.chart.after}</span></p>
          </div>
          <div class="float-chip" aria-hidden="true">${icon('shield-check', 'icon icon-sm')}${h.badge}</div>
        </div>
      </div>
    </section>

    <section class="trust">
      ${clientsMarquee(h.clientsTitle)}
      <div class="container">${sectorsStrip(t, h.sectorsTitle)}</div>
    </section>

    <section class="section section-alt">
      <div class="container">
        ${sectionHead(h.problemTitle, '')}
        <div class="grid grid-3">
          ${h.problems
            .map(
              (p, i) => `<div class="problem" ${reveal(i)}><span class="problem-icon">${icon(ICONS.problems[i])}</span><h3>${p.title}</h3><p>${p.text}</p></div>`,
            )
            .join('\n          ')}
        </div>
      </div>
    </section>

    <section class="section" id="servicios">
      <div class="container">
        ${sectionHead(h.servicesTitle, h.servicesLead)}
        <div class="bento">
          ${serviceCard(t, feature, 0, true)}
          ${rest.map((s, i) => serviceCard(t, s, i + 1, false)).join('')}
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        ${sectionHead(h.howTitle, h.howLead)}
        <ol class="timeline">
          ${t.steps
            .map(
              (s, i) => `<li ${reveal(i)}><span class="timeline-icon">${icon(ICONS.steps[i])}<b>${i + 1}</b></span><h3>${s.title}</h3><p>${s.text}</p></li>`,
            )
            .join('\n          ')}
        </ol>
      </div>
    </section>

    <section class="section" id="ia-responsable">
      <div class="container">
        ${sectionHead(h.responsible.title, h.responsible.lead)}
        <div class="grid grid-4">
          ${h.responsible.items
            .map((it, i) => `<div class="card value-card" ${reveal(i)}><span class="icon-badge">${icon(it.icon)}</span><h3>${it.title}</h3><p>${it.text}</p></div>`)
            .join('\n          ')}
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container team-grid">
        <div ${reveal()}>
          <h2 class="section-title">${h.teamTitle}</h2>
          <p class="lead">${h.teamLead}</p>
          ${chips(t.expertise)}
        </div>
        ${stats(t)}
      </div>
    </section>

    <section class="section">
      <div class="container">
        ${sectionHead(h.casesTitle, h.casesLead, `<a class="link-arrow" href="${r(t, 'cases')}">${t.ui.allCases} ${arrow()}</a>`)}
        <div class="grid grid-2">${t.cases
          .filter((c) => c.featured)
          .map((c, i) => caseCard(t, c, i))
          .join('')}
        </div>
      </div>
    </section>

    <section class="section section-alt" id="preguntas">
      <div class="container faq-grid">
        <div class="faq-head" ${reveal()}>
          <h2 class="section-title">${h.faq.title}</h2>
          <p class="lead">${h.faq.lead}</p>
          <a class="link-arrow" href="${r(t, 'contact')}">${t.ui.cta} ${arrow()}</a>
        </div>
        <div class="faq-list">
          ${h.faq.items
            .map((f, i) => `<details class="faq-item" ${reveal(i)}><summary>${f.q}${icon('chevron-right', 'icon icon-sm faq-chevron')}</summary><p>${f.a}</p></details>`)
            .join('\n          ')}
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
    ${pageHeader('sparkles', t.nav.services, p.h1, p.lead)}
    <nav class="container service-jump" aria-label="${t.nav.services}">
      ${t.services.map((s) => `<a href="#${s.id}">${icon(s.icon, 'icon icon-sm')}${s.title}</a>`).join('')}
    </nav>
    ${t.services
      .map(
        (s, i) => `
    <section class="section ${i % 2 ? 'section-alt' : ''}" id="${s.id}">
      <div class="container service-detail${i % 2 ? ' reverse' : ''}">
        <div ${reveal()}>
          <div class="icon-badge icon-badge-lg">${icon(s.icon)}</div>
          <h2>${s.title}</h2>
          <p class="lead">${s.short}</p>
          <p>${s.intro}</p>
          <div class="service-art-wrap service-art-lg">${serviceArt[s.id] ?? ''}</div>
        </div>
        <div>
          <h3 class="subhead-top">${p.listTitle}</h3>
          <ul class="feature-list">${s.bullets
            .map((b, j) => `<li ${reveal(j)}><span class="feature-icon">${icon(ICONS.bullets[s.id][j])}</span><span>${b}</span></li>`)
            .join('')}</ul>
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
    ${pageHeader('briefcase', t.nav.cases, p.h1, p.lead)}
    <section class="section section-tight">
      <div class="container">
        <div class="filters" role="group" aria-label="${t.nav.services}" hidden>
          <button type="button" class="filter" aria-pressed="true" data-filter="all">${icon('layers', 'icon icon-sm')}${t.ui.all}</button>
          ${used.map((s) => `<button type="button" class="filter" aria-pressed="false" data-filter="${s.id}">${icon(s.icon, 'icon icon-sm')}${s.title}</button>`).join('\n          ')}
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
    ${pageHeader('users', t.nav.about, p.h1, p.lead)}
    <section class="section section-tight">
      <div class="container story-grid">
        <div class="prose" ${reveal()}>
          <h2>${p.storyTitle}</h2>
          ${p.story.map((x) => `<p>${x}</p>`).join('')}
        </div>
        ${stats(t)}
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        ${sectionHead(p.valuesTitle, '')}
        <div class="grid grid-4">
          ${p.values
            .map(
              (v, i) => `<div class="card value-card" ${reveal(i)}><span class="icon-badge">${icon(ICONS.values[i])}</span><h3>${v.title}</h3><p>${v.text}</p></div>`,
            )
            .join('\n          ')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container team-grid">
        <div ${reveal()}>
          <h2 class="section-title">${p.teamTitle}</h2>
          <p class="lead">${p.teamText[0]}</p>
          ${p.teamText
            .slice(1)
            .map((x) => `<p class="team-text">${x}</p>`)
            .join('')}
          <p class="team-areas">${p.teamAreas}</p>
          ${chips(t.expertise)}
          ${
            p.certs.length
              ? `<h3 class="subhead">${p.certsTitle}</h3>
          <ul class="plain-list">${p.certs.map((c) => `<li>${c}</li>`).join('')}</ul>`
              : ''
          }
        </div>
        <div class="team-quote" ${reveal(1)}>
          ${icon('handshake', 'icon team-quote-icon')}
          <p>${p.values[3].text}</p>
        </div>
      </div>
      <div class="container">
        ${clientsGrid(p.clientsTitle)}
        ${sectorsStrip(t, p.sectorsTitle)}
      </div>
    </section>
${finalCta(t)}`,
    };
  },

  contact: (t, site) => {
    const p = t.contactPage;
    const f = p.form;
    const c = p.callback;
    const field = (name, label, ic, attrs = '') =>
      `<label class="field">${icon(ic, 'icon icon-sm field-icon')}<input name="${name}" placeholder=" " ${attrs}><span class="field-label">${label}</span></label>`;
    // Envío: endpoint propio, o FormSubmit con los correos de `notify`, o (sin nada) el cliente de correo.
    const notify = site.notify || [];
    const endpoint = site.formEndpoint || (notify.length ? `https://formsubmit.co/ajax/${notify[0]}` : '');
    const service = (subject) =>
      !site.formEndpoint && notify.length
        ? `<input type="hidden" name="_subject" value="${subject}"><input type="hidden" name="_template" value="table"><input type="hidden" name="_captcha" value="false">${notify.length > 1 ? `<input type="hidden" name="_cc" value="${notify.slice(1).join(',')}">` : ''}`
        : '';
    const formAttrs = (kind, x) =>
      `method="POST" action="${endpoint.replace('/ajax/', '/') || '#'}" data-kind="${kind}" data-endpoint="${endpoint}" data-email="${site.email}" data-subject="${x.mailSubject}" data-sending="${x.sending}" data-ok="${x.ok}" data-error="${x.error}"`;
    const consent = `<label class="checkbox"><input type="checkbox" name="consent" required><span>${f.consent.replace('{privacy}', r(t, 'privacy'))}</span></label>
          <div class="visually-hidden" aria-hidden="true"><input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></div>`;
    const phones = site.phones || [];
    return {
      title: p.title,
      description: p.description,
      body: `
    <section class="contact-hero">
      <div class="page-header-bg" aria-hidden="true"></div>
      <div class="container contact-layout">
        <div class="contact-intro" ${reveal()}>
          <p class="eyebrow eyebrow-icon">${icon('send', 'icon icon-sm')}${t.nav.contact}</p>
          <h1>${p.h1}</h1>
          <p class="lead">${p.lead}</p>
        </div>
        <div class="contact-more">
          <h2 class="contact-steps-title">${p.next.title}</h2>
          <ol class="contact-steps">
            ${p.next.items
              .map((it, i) => `<li ${reveal(i + 1)}><span class="contact-step-icon">${icon(it.icon, 'icon icon-sm')}<b>${i + 1}</b></span><div><strong>${it.title}</strong><span>${it.text}</span></div></li>`)
              .join('\n            ')}
          </ol>
          <div class="contact-direct">
            ${
              site.email
                ? `<div class="contact-direct-row">
              <span class="contact-direct-icon">${icon('mail')}</span>
              <div><p>${p.asideTitle}</p><a href="mailto:${site.email}">${site.email}</a></div>
              <button class="copy-btn" type="button" data-copy="${site.email}" data-copied="${p.copied}">${icon('copy', 'icon icon-xs')}<span>${p.copy}</span></button>
            </div>`
                : ''
            }
            ${
              site.whatsapp
                ? `<div class="contact-direct-row">
              <span class="contact-direct-icon contact-direct-wa">${brandIcon('whatsapp')}</span>
              <div><p>WhatsApp</p><a href="${whatsappHref(site, t)}" target="_blank" rel="noopener">${phoneLabel(site.whatsapp)}</a></div>
            </div>`
                : ''
            }
            ${
              phones.length
                ? `<div class="contact-direct-row">
              <span class="contact-direct-icon">${icon('telephone')}</span>
              <div><p>${p.phonesTitle}</p><div class="phone-list">${phones.map((n) => `<a href="${phoneHref(n)}">${phoneLabel(n)}</a>`).join('')}</div></div>
            </div>`
                : ''
            }
          </div>
          ${site.linkedin ? `<a class="contact-linkedin" href="${site.linkedin}" rel="noopener">${icon('linkedin', 'icon icon-sm')}LinkedIn</a>` : ''}
        </div>

        <div class="contact-card" ${reveal(1)}>
          <div class="contact-tabs" role="tablist" aria-label="${t.nav.contact}">
            <button type="button" role="tab" id="tab-write" aria-controls="panel-write" aria-selected="true">${icon('message-square', 'icon icon-sm')}${p.tabs.write}</button>
            <button type="button" role="tab" id="tab-call" aria-controls="panel-call" aria-selected="false" tabindex="-1">${icon('telephone', 'icon icon-sm')}${p.tabs.call}</button>
          </div>

          <form class="contact-form" id="panel-write" role="tabpanel" aria-labelledby="tab-write" ${formAttrs('contact', f)} data-topics="${f.topicsLabel}">
            <div class="contact-card-head">
              <h2>${f.title}</h2>
              <p>${icon('check', 'icon icon-xs')}${f.note}</p>
            </div>
            <fieldset class="topics">
              <legend>${f.topicsLabel}</legend>
              <div class="topic-list">
                ${f.topics.map((tp) => `<label class="topic"><input type="checkbox" name="topics" value="${tp.label}"><span>${icon(tp.icon, 'icon icon-sm')}${tp.label}</span></label>`).join('\n                ')}
              </div>
            </fieldset>
            <div class="field-row">
              ${field('name', f.name, 'user', 'autocomplete="name" required')}
              ${field('company', f.company, 'building-2', 'autocomplete="organization"')}
            </div>
            ${field('email', f.email, 'mail', 'type="email" autocomplete="email" required')}
            <label class="field field-area">${icon('message-square', 'icon icon-sm field-icon')}<textarea name="message" rows="5" placeholder=" " required aria-describedby="message-hint"></textarea><span class="field-label">${f.message}</span></label>
            <p class="field-hint" id="message-hint">${f.messageHint}</p>
            ${consent}
            ${service(f.mailSubject)}
            <button class="btn btn-primary btn-block" type="submit">${f.submit} ${icon('send', 'icon icon-sm')}</button>
            <p class="form-status" role="status" aria-live="polite"></p>
          </form>

          <form class="contact-form" id="panel-call" role="tabpanel" aria-labelledby="tab-call" ${formAttrs('callback', c)} data-when="${c.when}">
            <div class="contact-card-head">
              <h2>${c.title}</h2>
              <p>${icon('check', 'icon icon-xs')}${c.note}</p>
            </div>
            <div class="field-row">
              ${field('name', c.name, 'user', 'autocomplete="name" required')}
              ${field('phone', c.phone, 'telephone', 'type="tel" autocomplete="tel" inputmode="tel" pattern="[0-9+ ]{9,}" required')}
            </div>
            <fieldset class="topics">
              <legend>${c.when}</legend>
              <div class="topic-list">
                ${c.slots.map((sl, i) => `<label class="topic"><input type="radio" name="when" value="${sl}"${i === c.slots.length - 1 ? ' checked' : ''}><span>${icon('clock', 'icon icon-sm')}${sl}</span></label>`).join('\n                ')}
              </div>
            </fieldset>
            ${consent}
            ${service(c.mailSubject)}
            <button class="btn btn-primary btn-block" type="submit">${c.submit} ${icon('telephone', 'icon icon-sm')}</button>
            <p class="form-status" role="status" aria-live="polite"></p>
          </form>
        </div>
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
      <div class="page-header-bg" aria-hidden="true"></div>
      <div class="container narrow">
        <p class="eyebrow eyebrow-icon">${icon('search', 'icon icon-sm')}404</p>
        <h1>${t.notFound.h1}</h1>
        <p class="lead">${t.notFound.text}</p>
        <div class="actions"><a class="btn btn-primary" href="${r(t, 'home')}">${t.notFound.back}</a></div>
      </div>
    </section>`,
});
