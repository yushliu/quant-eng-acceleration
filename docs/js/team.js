function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
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

function renderStageSection(title, intro, innerMarkup, sectionId, headingTag = "h2") {
  const safeHeadingTag = headingTag === "h1" ? "h1" : "h2";
  const descriptionMarkup = intro
    ? `<p class="mt-3 max-w-3xl text-sm leading-6 text-gray-600 sm:text-base">${escapeHtml(intro)}</p>`
    : "";

  return `
    <section class="glass-panel home-stage-surface rounded-[1.5rem] p-7" aria-labelledby="${escapeHtml(sectionId)}-heading">
      <div class="max-w-3xl">
        <${safeHeadingTag} id="${escapeHtml(sectionId)}-heading" class="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">${escapeHtml(title)}</${safeHeadingTag}>
        ${descriptionMarkup}
      </div>
      <div class="mt-8">
        ${innerMarkup}
      </div>
    </section>
  `;
}

function renderHeroSection(hero) {
  const overviewLine1 = hero.description
    || "Meet the people behind the club's algorithm work, engineering support, and reproducible benchmarking system.";
  const overviewLine2 = "This page outlines team structure, leadership, collaboration flow, and practical contribution paths.";

  return renderStageSection(
    hero.title || "Team",
    "",
    `
      <div class="max-w-3xl space-y-2">
        <p class="text-sm leading-6 text-gray-600 sm:text-base">${escapeHtml(overviewLine1)}</p>
        <p class="text-sm leading-6 text-gray-600 sm:text-base">${escapeHtml(overviewLine2)}</p>
      </div>
    `,
    "team-hero",
    "h1"
  );
}

function renderStructureSection(structure) {
  const cards = Array.isArray(structure?.cards) ? structure.cards : [];
  const algorithmCard = cards.find((card) => String(card?.title || "").toLowerCase() === "algorithm");
  const infrastructureCard = cards.find((card) => String(card?.title || "").toLowerCase() === "infrastructure");
  const orderedCards = [algorithmCard, infrastructureCard].filter(Boolean);

  const cardsMarkup = orderedCards.map((card) => {
    const bullets = Array.isArray(card.bullets) && card.bullets.length > 0
      ? `
        <ul class="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-700">
          ${card.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}
        </ul>
      `
      : "";

    return `
      <article class="glass-subpanel rounded-[1.1rem] p-5">
        <h3 class="text-lg font-semibold text-gray-900">${escapeHtml(card.title || "")}</h3>
        <p class="mt-3 text-sm leading-6 text-gray-700">${escapeHtml(card.description || "")}</p>
        ${bullets}
      </article>
    `;
  }).join("");

  return renderStageSection(
    "How the Club Is Structured",
    structure?.intro || "The club uses two tracks so technical ownership stays clear while shared benchmark work remains connected.",
    `<div class="grid grid-cols-1 gap-5 md:grid-cols-2">${cardsMarkup}</div>`,
    "team-structure"
  );
}

function renderLeadershipSection(leads) {
  const members = Array.isArray(leads?.members) ? leads.members : [];
  const cardsMarkup = members.map((member) => renderMemberCard(member, "leads")).join("");

  return renderStageSection(
    "Leadership",
    "The leadership team sets technical direction, engineering standards, and review quality across club tracks.",
    `<div class="grid grid-cols-1 gap-5 md:grid-cols-2">${cardsMarkup}</div>`,
    "team-leadership"
  );
}

function renderContributorsSection(contributors) {
  const members = Array.isArray(contributors?.members) ? contributors.members : [];
  const cardsMarkup = members.map((member) => renderMemberCard(member, "contributors")).join("");

  return renderStageSection(
    "Contributors",
    "Contributors execute implementation tasks, benchmark checks, and workflow support under shared evaluation conventions.",
    `<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">${cardsMarkup}</div>`,
    "team-contributors"
  );
}

function renderWorkflowSection() {
  const steps = [
    {
      title: "Scope and Prioritize",
      body: "Leadership defines scope, review criteria, and benchmark goals for each cycle."
    },
    {
      title: "Build and Compare",
      body: "Algorithm contributors implement methods and run comparisons under shared evaluation rules."
    },
    {
      title: "Stabilize and Validate",
      body: "Infrastructure contributors maintain tooling, environments, and reliability checks."
    },
    {
      title: "Document and Release",
      body: "Results are summarized, reviewed, and linked to reusable artifacts for the next cycle."
    }
  ];

  const cardsMarkup = steps.map((step, index) => `
    <article class="team-workflow-card glass-subpanel rounded-[1.1rem] p-5" aria-label="Workflow step ${index + 1}">
      <div class="team-workflow-marker mb-3">
        <span class="team-workflow-marker__label">Step ${index + 1}</span>
      </div>
      <h3 class="text-base font-semibold text-gray-900">${escapeHtml(step.title)}</h3>
      <p class="mt-3 text-sm leading-6 text-gray-700">${escapeHtml(step.body)}</p>
    </article>
  `).join("");

  return renderStageSection(
    "How Work Moves Across the Team",
    "The team follows a repeatable workflow so algorithm and infrastructure efforts stay aligned from implementation to publication.",
    `<div class="team-workflow-grid grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">${cardsMarkup}</div>`,
    "team-workflow"
  );
}

function findParticipationGroup(groups, title) {
  return groups.find((group) => String(group?.title || "").toLowerCase() === title);
}

function renderInvolvementSection(participation) {
  const groups = Array.isArray(participation?.groups) ? participation.groups : [];
  const startGroup = findParticipationGroup(groups, "how to start");
  const pathsGroup = findParticipationGroup(groups, "current open roles");
  const growthGroup = findParticipationGroup(groups, "join us");

  const whereToStartBullets = Array.isArray(startGroup?.bullets) && startGroup.bullets.length > 0
    ? startGroup.bullets
    : [
      "Read the Team, Plan, and Release pages.",
      "Choose a topic area or track that matches your interests.",
      "Start with implementation, documentation, review, or experiment-support tasks."
    ];
  const contributionPathBullets = Array.isArray(pathsGroup?.bullets) && pathsGroup.bullets.length > 0
    ? pathsGroup.bullets
    : [
      "Algorithm Track Contributor",
      "Infrastructure Track Contributor",
      "Documentation and Release Support"
    ];
  const growthBody = growthGroup?.description
    || "Contributors typically begin with scoped tasks, then grow into deeper ownership across algorithm, infrastructure, and release support.";

  const cardMarkup = `
    <article class="glass-subpanel rounded-[1.1rem] p-5">
      <h3 class="text-base font-semibold text-gray-900">Where to Start</h3>
      <ul class="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-700">
        ${whereToStartBullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </article>
    <article class="glass-subpanel rounded-[1.1rem] p-5">
      <h3 class="text-base font-semibold text-gray-900">Contribution Paths</h3>
      <ul class="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-700">
        ${contributionPathBullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </article>
    <article class="glass-subpanel rounded-[1.1rem] p-5">
      <h3 class="text-base font-semibold text-gray-900">How Growth Happens</h3>
      <p class="mt-3 text-sm leading-6 text-gray-700">${escapeHtml(growthBody)}</p>
    </article>
  `;

  return renderStageSection(
    "How to Get Involved",
    participation?.intro || "Use this section to find your entry point into algorithm, infrastructure, and benchmark support work.",
    `<div class="grid grid-cols-1 gap-5 lg:grid-cols-3">${cardMarkup}</div>`,
    "team-involved"
  );
}

function buildTeamPageMarkup(data) {
  const hero = data && typeof data.hero === "object" ? data.hero : {};
  const sections = Array.isArray(data?.sections) ? data.sections : [];
  const leads = sections.find((section) => section.id === "leads");
  const contributors = sections.find((section) => section.id === "contributors");
  const structure = sections.find((section) => section.id === "two-track-structure");
  const participation = sections.find((section) => section.id === "participation");

  return [
    renderHeroSection(hero),
    renderStructureSection(structure),
    renderLeadershipSection(leads),
    renderContributorsSection(contributors),
    renderWorkflowSection(),
    renderInvolvementSection(participation)
  ].join("");
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
    sectionsHost.innerHTML = buildTeamPageMarkup(data);
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
