window.TEAM_DATA = {
  hero: {
    title: "Team",
    description: "People working on quantitative algorithms through reproducible benchmarking."
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
          bio: "Owns CI workflows, repo templates, and review conventions."
        },
        {
          initials: "MT",
          name: "Morgan Tate",
          role: "Tech Lead (Infra)",
          tags: ["Infra", "CPU"],
          bio: "Defines engineering baselines and documents reproducible environment standards."
        },
        {
          initials: "RK",
          name: "Riley Kim",
          role: "Benchmark Lead",
          discipline: "Statistics · Computer Science",
          tags: ["CPU"],
          bio: "Defines benchmark methodology and reporting format for p50, p95, and p99."
        },
        {
          initials: "JS",
          name: "Jordan Shaw",
          role: "FPGA-sim Lead",
          discipline: "Electrical and Computer Engineering",
          tags: ["FPGA-sim"],
          bio: "Builds FPGA-sim parsers and measures end-to-end latency distribution."
        }
      ]
    },
    {
      id: "contributors",
      title: "Contributors",
      columns: "lg",
      members: [
        {
          initials: "NP",
          name: "Noah Park",
          role: "Track Lead - CPU",
          tags: ["CPU"],
          bio: "Implements CPU baselines and OpenMP optimization experiments with benchmark reports."
        },
        {
          initials: "EV",
          name: "Elliot Vega",
          role: "Track Lead - GPU",
          discipline: "Data Science · Applied Math",
          tags: ["GPU"],
          bio: "Prototypes GPU paths with CuPy and Numba while tracking throughput gains."
        },
        {
          initials: "CG",
          name: "Casey Grant",
          role: "Contributor",
          tags: ["Infra", "GPU"],
          bio: "Maintains automation scripts and validates benchmark artifacts before merge."
        },
        {
          initials: "PT",
          name: "Parker Tran",
          role: "Contributor",
          discipline: "Electrical Engineering · Systems",
          tags: ["FPGA-sim"],
          bio: "Builds simulation validation checks and summarizes latency distributions for reviews."
        }
      ]
    },
    {
      id: "two-track-structure",
      type: "info-cards",
      title: "Two-Track Structure",
      intro: "The club is organized into two tracks to improve technical focus, ownership, and long-term project clarity.",
      cards: [
        {
          title: "Infrastructure",
          description: "Infrastructure supports tooling, data and compute workflows, reproducibility systems, and benchmarking reliability.",
          bullets: [
            "tooling and environments",
            "workflow support",
            "release reliability"
          ]
        },
        {
          title: "Algorithm",
          description: "Algorithm focuses on quantitative models, risk logic, pricing methods, and research-oriented comparison work.",
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
      title: "Participation",
      intro: "This club welcomes students who want to contribute to algorithm-oriented technical work, reproducible benchmarking, and long-term project building.",
      groups: [
        {
          title: "Join Us",
          description: "Members contribute across algorithm work, engineering support, benchmark evaluation, and reproducible release preparation."
        },
        {
          title: "Current Open Roles",
          bullets: [
            "Algorithm Track Contributor: implement and compare quantitative methods under shared evaluation rules.",
            "Infrastructure Track Contributor: support tooling, environments, and benchmark workflow reliability.",
            "Documentation and Release Support: organize notes, release summaries, and linked artifacts for review."
          ]
        },
        {
          title: "How to Start",
          bullets: [
            "Read the Team, Plan, and Release pages.",
            "Choose a topic area or track that matches your interests.",
            "Start with implementation, documentation, review, or experiment support tasks.",
            "Grow into deeper technical ownership over time."
          ]
        }
      ]
    }
  ]
};
