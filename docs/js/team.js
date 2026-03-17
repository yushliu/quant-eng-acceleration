function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function getTeamGridClass(section) {
  if (section && section.columns === "xl") {
    return "mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4";
  }

  return "mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3";
}

function renderMemberCard(member, sectionId) {
  const paddingClass = sectionId === "leads" ? "p-6" : "p-5";
  const avatarSizeClass = sectionId === "leads" ? "h-11 w-11" : "h-10 w-10";
  const disciplineMarkup = member.discipline
    ? `<p class="mt-4 text-xs text-gray-500">${escapeHtml(member.discipline)}</p>`
    : "";
  const tagsMarkup = Array.isArray(member.tags) && member.tags.length > 0
    ? `
      <div class="mt-3 flex flex-wrap gap-2">
        ${member.tags.map((tag) => `<span class="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600">${escapeHtml(tag)}</span>`).join("")}
      </div>
    `
    : "";

  return `
    <article class="glass-subpanel rounded-[1.1rem] ${paddingClass} transition hover:border-gray-300 hover:shadow">
      <div class="flex items-center gap-4">
        <div class="flex ${avatarSizeClass} items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">${escapeHtml(member.initials)}</div>
        <div>
          <h3 class="text-base font-semibold text-gray-900">${escapeHtml(member.name)}</h3>
          <p class="text-sm text-gray-600">${escapeHtml(member.role)}</p>
        </div>
      </div>
      ${disciplineMarkup}
      ${tagsMarkup}
      <p class="mt-4 text-sm leading-6 text-gray-700">${escapeHtml(member.bio)}</p>
    </article>
  `;
}

function renderTeamSection(section) {
  const members = Array.isArray(section.members) ? section.members : [];
  const cardsMarkup = members.map((member) => renderMemberCard(member, section.id)).join("");

  return `
    <section aria-labelledby="${escapeHtml(section.id)}-heading">
      <h2 id="${escapeHtml(section.id)}-heading" class="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">${escapeHtml(section.title)}</h2>
      <div class="${getTeamGridClass(section)}">
        ${cardsMarkup}
      </div>
    </section>
  `;
}

function renderParticipationSection(section) {
  const intro = section.intro
    ? `<p class="mt-3 max-w-3xl text-sm leading-6 text-gray-700">${escapeHtml(section.intro)}</p>`
    : "";
  const groups = Array.isArray(section.groups) ? section.groups : [];
  const groupsMarkup = groups.map((group) => {
    const description = group.description
      ? `<p class="mt-2 text-sm leading-6 text-gray-700">${escapeHtml(group.description)}</p>`
      : "";
    const bullets = Array.isArray(group.bullets) && group.bullets.length > 0
      ? `
        <ul class="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-700">
          ${group.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}
        </ul>
      `
      : "";

    return `
      <article class="glass-subpanel rounded-[1.1rem] p-5">
        <h3 class="text-base font-semibold text-gray-900">${escapeHtml(group.title || "")}</h3>
        ${description}
        ${bullets}
      </article>
    `;
  }).join("");

  return `
    <section aria-labelledby="${escapeHtml(section.id)}-heading">
      <h2 id="${escapeHtml(section.id)}-heading" class="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">${escapeHtml(section.title)}</h2>
      ${intro}
      <div class="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-3">
        ${groupsMarkup}
      </div>
    </section>
  `;
}

function renderInfoCardsSection(section) {
  const intro = section.intro
    ? `<p class="mt-3 max-w-3xl text-sm leading-6 text-gray-700">${escapeHtml(section.intro)}</p>`
    : "";
  const cards = Array.isArray(section.cards) ? section.cards : [];
  const cardsMarkup = cards.map((card) => {
    const description = card.description
      ? `<p class="mt-3 text-sm leading-6 text-gray-700">${escapeHtml(card.description)}</p>`
      : "";
    const bullets = Array.isArray(card.bullets) && card.bullets.length > 0
      ? `
        <ul class="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-700">
          ${card.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}
        </ul>
      `
      : "";

    return `
      <article class="glass-subpanel rounded-[1.1rem] p-5">
        <h3 class="text-base font-semibold text-gray-900">${escapeHtml(card.title || "")}</h3>
        ${description}
        ${bullets}
      </article>
    `;
  }).join("");

  return `
    <section aria-labelledby="${escapeHtml(section.id)}-heading">
      <h2 id="${escapeHtml(section.id)}-heading" class="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">${escapeHtml(section.title)}</h2>
      ${intro}
      <div class="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
        ${cardsMarkup}
      </div>
    </section>
  `;
}

function renderSection(section) {
  if (section && section.type === "participation") {
    return renderParticipationSection(section);
  }

  if (section && section.type === "info-cards") {
    return renderInfoCardsSection(section);
  }

  return renderTeamSection(section);
}

function renderPagePanel(title, description, innerMarkup, extraClasses = "", headingKey = "", headingTag = "h2") {
  const baseKey = headingKey || String(title || "team");
  const headingId = `${String(baseKey).toLowerCase().replace(/[^a-z0-9]+/g, "-")}-panel-heading`;
  const cardClass = ["glass-panel", "home-stage-surface", "rounded-[1.5rem]", "p-7", extraClasses].filter(Boolean).join(" ");
  const safeHeadingTag = headingTag === "h1" ? "h1" : "h2";
  const descriptionMarkup = description
    ? `<p class="mt-3 max-w-3xl text-sm leading-6 text-gray-600 sm:text-base">${escapeHtml(description)}</p>`
    : "";

  return `
    <section class="${escapeHtml(cardClass)}" aria-labelledby="${escapeHtml(headingId)}">
      <div class="max-w-3xl">
        <${safeHeadingTag} id="${escapeHtml(headingId)}" class="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">${escapeHtml(title)}</${safeHeadingTag}>
        ${descriptionMarkup}
      </div>
      <div class="mt-8">
        ${innerMarkup}
      </div>
    </section>
  `;
}

function buildTeamPageMarkup(hero, sections) {
  const leads = sections.find((section) => section.id === "leads");
  const contributors = sections.find((section) => section.id === "contributors");
  const structure = sections.find((section) => section.id === "two-track-structure");
  const participation = sections.find((section) => section.id === "participation");

  const leadPanel = leads
    ? renderPagePanel(hero.title || "Team", hero.description || "", renderTeamSection(leads), "", "team-leads", "h1")
    : "";

  const contributorPanel = contributors
    ? renderPagePanel(
      "Contributors",
      "The club relies on focused technical contributors across CPU, GPU, FPGA-simulation, and workflow support.",
      renderTeamSection(contributors),
      "",
      "team-contributors"
    )
    : "";

  const finalCardSections = [structure, participation]
    .filter(Boolean)
    .map((section) => renderSection(section))
    .join("");

  const finalPanel = finalCardSections
    ? renderPagePanel(
      "Two-track Structure and Involvement",
      "The closing chapter explains how algorithm and infrastructure ownership fit together, then shows how new members can join that work.",
      `<div class="grid gap-10">${finalCardSections}</div>`,
      "team-final-stage"
    )
    : "";

  return [leadPanel, contributorPanel, finalPanel].filter(Boolean).join("");
}

async function loadTeamData() {
  try {
    const response = await fetch("./data/team.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load team data: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    // `file://` pages usually cannot fetch sibling JSON files due to browser restrictions.
    if (window.location.protocol === "file:" && window.TEAM_DATA && typeof window.TEAM_DATA === "object") {
      return window.TEAM_DATA;
    }
    throw error;
  }
}

async function renderTeamPage() {
  const sectionsHost = document.getElementById("team-sections");
  const errorHost = document.getElementById("team-error");

  if (!sectionsHost) {
    return;
  }

  try {
    const data = await loadTeamData();
    const hero = data && typeof data.hero === "object" ? data.hero : {};
    const sections = Array.isArray(data && data.sections) ? data.sections : [];

    sectionsHost.innerHTML = buildTeamPageMarkup(hero, sections);
  } catch (error) {
    sectionsHost.innerHTML = "";
    if (errorHost) {
      errorHost.textContent = window.location.protocol === "file:"
        ? "Unable to load team.json from file://. Use a local web server or preview server."
        : "Unable to load team data.";
      errorHost.classList.remove("hidden");
    }
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderTeamPage();
});
