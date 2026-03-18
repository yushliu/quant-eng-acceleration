window.TEAM_DATA = {
  hero: {
    title: "Team",
    description: "Meet the people behind the club’s algorithm work, engineering support, and shared benchmarking structure."
  },
  sections: [
    {
      id: "leads",
      title: "Leads",
      columns: "lg",
      members: [
        {
          initials: "AL",
          name: "Avery Lin",
          role: "Organizer / Lead",
          discipline: "Computer Engineering · Mathematics",
          tags: ["Infra"],
          bio: "Leads club direction, review conventions, and shared engineering workflows across projects."
        },
        {
          initials: "MT",
          name: "Morgan Tate",
          role: "Tech Lead (Infra)",
          discipline: "Systems Engineering · Compute Workflows",
          tags: ["Infra", "CPU"],
          bio: "Defines engineering baselines and maintains reproducible environment standards for implementation work."
        },
        {
          initials: "RK",
          name: "Riley Kim",
          role: "Benchmark Lead",
          discipline: "Statistics · Computer Science",
          tags: ["CPU"],
          bio: "Owns benchmark methodology, evaluation framing, and reporting standards across comparison work."
        },
        {
          initials: "JS",
          name: "Jordan Shaw",
          role: "FPGA-sim Lead",
          discipline: "Electrical and Computer Engineering",
          tags: ["FPGA-sim"],
          bio: "Develops FPGA-simulation tooling and validates latency-focused measurement workflows."
        }
      ]
    },
    {
      id: "contributors",
      title: "Contributors",
      columns: "lg",
      members: [
        {
          initials: "CZ",
          name: "Chenzixi Zhao",
          role: "Track Lead - CPU",
          discipline: "CPU Evaluation · Parallel Methods",
          tags: ["CPU"],
          bio: "Builds CPU baselines and contributes benchmark-ready implementation updates."
        },
        {
          initials: "EV",
          name: "Elliot Vega",
          role: "Track Lead - GPU",
          discipline: "Data Science · Applied Math",
          tags: ["GPU"],
          bio: "Develops GPU-oriented paths and tracks performance behavior under shared evaluation settings."
        },
        {
          initials: "CG",
          name: "Casey Grant",
          role: "Contributor",
          discipline: "Workflow Automation · Validation",
          tags: ["Infra", "GPU"],
          bio: "Supports automation, validation, and artifact checks before benchmark outputs are published."
        },
        {
          initials: "PT",
          name: "Parker Tran",
          role: "Contributor",
          discipline: "Electrical Engineering · Systems",
          tags: ["FPGA-sim"],
          bio: "Contributes simulation checks and summarizes latency results for technical review."
        }
      ]
    },
    {
      id: "two-track-structure",
      type: "info-cards",
      title: "Two-Track Structure",
      intro: "The club uses two tracks to keep technical ownership clear while connecting shared benchmark work.",
      cards: [
        {
          title: "Infrastructure",
          description: "Keeps engineering workflows stable, reviewable, and reusable across club projects.",
          bullets: [
            "tooling and environments",
            "workflow support",
            "artifact and release reliability"
          ]
        },
        {
          title: "Algorithm",
          description: "Algorithm develops the quantitative methods and comparison logic the club evaluates.",
          bullets: [
            "model implementation",
            "evaluation logic",
            "comparative research work"
          ]
        }
      ]
    },
    {
      id: "participation",
      type: "participation",
      title: "How to Get Involved",
      intro: "Use this section as a starting point for joining the club's algorithm, infrastructure, and benchmark-support work.",
      groups: [
        {
          title: "Join Us",
          description: "The club welcomes students who want to contribute to algorithm-oriented technical work, reproducible benchmarking, and long-term project building."
        },
        {
          title: "Current Open Roles",
          bullets: [
            "Algorithm Track Contributor: help implement and compare quantitative methods under shared evaluation rules.",
            "Infrastructure Track Contributor: support tooling, environments, and benchmark workflow reliability.",
            "Documentation and Release Support: organize notes, summaries, and linked artifacts for review."
          ]
        },
        {
          title: "How to Start",
          bullets: [
            "Read the Team, Plan, and Release pages.",
            "Choose a topic area or track that matches your interests.",
            "Start with implementation, documentation, review, or experiment-support tasks.",
            "Grow into deeper technical ownership over time."
          ]
        }
      ]
    }
  ]
};
