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
    <article class="rounded-lg border border-gray-200 bg-white ${paddingClass} shadow-sm transition hover:border-gray-300 hover:shadow">
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
    <section class="mt-12 first:mt-10" aria-labelledby="${escapeHtml(section.id)}-heading">
      <h2 id="${escapeHtml(section.id)}-heading" class="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">${escapeHtml(section.title)}</h2>
      <div class="${getTeamGridClass(section)}">
        ${cardsMarkup}
      </div>
    </section>
  `;
}

async function loadTeamData() {
  if (window.TEAM_DATA && typeof window.TEAM_DATA === "object") {
    return window.TEAM_DATA;
  }

  const response = await fetch("./data/team.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load team data: ${response.status}`);
  }
  return response.json();
}

async function renderTeamPage() {
  const heroTitle = document.getElementById("team-title");
  const heroDescription = document.getElementById("team-description");
  const sectionsHost = document.getElementById("team-sections");
  const errorHost = document.getElementById("team-error");

  if (!heroTitle || !heroDescription || !sectionsHost) {
    return;
  }

  try {
    const data = await loadTeamData();
    const hero = data && typeof data.hero === "object" ? data.hero : {};
    const sections = Array.isArray(data && data.sections) ? data.sections : [];

    heroTitle.textContent = hero.title || "Team";
    heroDescription.textContent = hero.description || "";
    sectionsHost.innerHTML = sections.map(renderTeamSection).join("");
  } catch (error) {
    sectionsHost.innerHTML = "";
    if (errorHost) {
      errorHost.textContent = "Unable to load team data.";
      errorHost.classList.remove("hidden");
    }
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderTeamPage();
});
