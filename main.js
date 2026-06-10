// ──────────────────────────────────────────────
// DEFAULT DATA
// ──────────────────────────────────────────────
const DEFAULTS = {
  profile: {
    firstname: "Jose Mari",
    lastname: "Dela Cruz",
    tagline:
      "Engineering the architecture. Integrating the intelligence. Delivering the impact.",
    email: "jmdelacruz2735@gmail.com",
    phone: "+63 956 008 3446",
    location: "Caloocan City, Metro Manila",
    github: "https://github.com/cndrz",
    education: "BS Computer Science, OLFU · 2022–2026",
    eyebrow: "Software Engineer — Metro Manila, Philippines",
    about: `Building scalable, responsive, and highly secure web applications. From crafting intuitive front-end user experiences to architecting reliable database schemas and serverless backends, I write clean, maintainable code that handles real-world traffic seamlessly.\n\nMoving past the hype of artificial intelligence to deliver practical, localized business value. I integrate advanced natural language processing, train specialized models on custom datasets, and build intelligent sales agents and automation workflows that turn raw data into operational leverage.\n\nMoving past the hype of artificial intelligence to deliver practical, localized business value. I integrate advanced natural language processing, train specialized models on custom datasets, and build intelligent sales agents and automation workflows that turn raw data into operational leverage.`,
  },
  skills: [
    {
      id: 1,
      group: "Frontend",
      items: [
        "JavaScript",
        "HTML/CSS",
        "React",
        "React Native",
        "Next.js",
        "Electron",
        "Tauri",
        "Vite",
      ],
    },
    {
      id: 2,
      group: "Backend",
      items: [
        "Python",
        "Java",
        "C++",
        "SQL",
        "Node.js",
        "Express",
        "Supabase",
        "Firebase",
      ],
    },
    {
      id: 3,
      group: "AI & Tools",
      items: [
        "Google AI Studio",
        "Groq",
        "Claude Code",
        "LM Studio",
        "Ollama",
        "Zed",
        "Git",
      ],
    },
    {
      id: 4,
      group: "Concepts",
      items: [
        "REST APIs",
        "Agile/Scrum",
        "OOP",
        "CI/CD",
        "LLM Integration",
        "JamStack",
      ],
    },
  ],
  experience: [
    {
      id: 1,
      title: "Software Engineering Intern",
      company: "JL Uni Multiserv Inc.",
      date: "Feb 2026 – May 2026",
      desc: "Spearheaded the development of a high-performance company website using Vite and Vanilla HTML/CSS, expanding client outreach and establishing a centralized system for real-time schedule and event updates.",
    },
  ],
  projects: [
    {
      id: 1,
      name: "RESCREEN",
      desc: "AI-powered web platform that automates resume critiques and ATS optimization. Built with a semantic evaluation engine powered by Llama 3 via Groq, delivering sub-second matching scores and skill gap analyses.",
      url: "https://rescreenapp.vercel.app",
      linkLabel: "View Live",
      tech: ["HTML/CSS", "JavaScript", "Vite", "Groq"],
    },
    {
      id: 2,
      name: "INDEX",
      desc: "Data analytics web app for streamlining exploratory data analysis and quality auditing. Automated pipeline to ingest CSV files, compute statistical summaries, and detect anomalies with dynamic ECharts visualizations.",
      url: "https://github.com/cndrz/InDex",
      linkLabel: "GitHub",
      tech: ["React", "Node.js", "Express", "ECharts"],
    },
    {
      id: 3,
      name: "DAILYZEN",
      desc: "AI-powered desktop app delivering personalized daily wisdom and motivational insights. Built on Electron with secure IPC architecture and powered by Llama 3.1 via Groq, featuring a six-theme visual customization engine.",
      url: "https://github.com/cndrz/DailyZen",
      linkLabel: "GitHub",
      tech: ["Electron", "Node.js", "Groq"],
    },
    {
      id: 4,
      name: "ORBIT",
      desc: "A high-performance, privacy-respecting desktop utility designed to seamlessly merge daily logistics with intelligent data synthesis. Built on a local-first architecture using Tauri, React, and SQLite, this application empowers users to manage complex delivery schedules and daily to-do tasks, while running a dual-engine Retrieval-Augmented Generation (RAG) pipeline.",
      url: "https://github.com/cndrz/Orbit",
      linkLabel: "GitHub",
      tech: ["Tauri", "HTML/CSS", "JavaScript", "SQLite", "Groq"],
    },
  ],
  certifications: [
    {
      id: 1,
      name: "Cisco Certified Support Technician Cybersecurity (CCST)",
      date: "January 2026",
    },
    {
      id: 2,
      name: "Networking Devices and Initial Configuration — Cisco",
      date: "October 2024",
    },
    { id: 3, name: "Networking Basics — Cisco", date: "November 2024" },
    {
      id: 4,
      name: "Introduction to Cybersecurity — Cisco",
      date: "January 2026",
    },
  ],
};

// ──────────────────────────────────────────────
// NAVIGATION
// ──────────────────────────────────────────────
function navigate(page) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById(page + "-page").classList.add("active");
  window.scrollTo(0, 0);
}

// ──────────────────────────────────────────────
// RENDER HOME
// ──────────────────────────────────────────────
function renderAll() {
  const d = DEFAULTS;
  const p = d.profile;

  // Hero
  document.getElementById("hero-firstname").textContent = p.firstname;
  document.getElementById("hero-lastname").textContent = p.lastname;
  document.getElementById("hero-tagline").textContent = p.tagline;
  document.getElementById("hero-eyebrow").textContent = p.eyebrow;
  document.getElementById("hero-cta-link").href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + p.email;
  document.getElementById("hero-meta-school").textContent =
    p.education.split("·")[0]?.trim() || "";
  document.getElementById("hero-meta-year").textContent = p.education;
  const ghHandle = p.github.replace("https://github.com/", "github.com/");
  document.getElementById("hero-meta-github").textContent = ghHandle;

  // About
  const aboutParas = p.about.split("\n\n").filter((s) => s.trim());
  document.getElementById("about-text").innerHTML = aboutParas
    .map((t) => `<p>${t}</p>`)
    .join("");
  document.getElementById("aside-location").textContent = p.location;
  document.getElementById("aside-education").textContent = p.education;
  document.getElementById("aside-email").textContent = p.email;
  document.getElementById("aside-email").href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + p.email;
  document.getElementById("aside-github").textContent = ghHandle;
  document.getElementById("aside-github").href = p.github;
  document.getElementById("aside-phone").textContent = p.phone;

  // Contact
  document.getElementById("contact-email-link").href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + p.email;
  document.getElementById("contact-github-link").href = p.github;

  // Skills
  const sg = document.getElementById("skills-grid");
  sg.innerHTML = d.skills
    .map(
      (g) => `
    <div class="skill-group">
      <div class="skill-group-label">${g.group}</div>
      <div class="skill-tags">${g.items.map((i) => `<span class="skill-tag">${i}</span>`).join("")}</div>
    </div>`,
    )
    .join("");

  // Experience
  const el = document.getElementById("exp-list");
  el.innerHTML = d.experience
    .map(
      (e) => `
    <div class="exp-item">
      <div>
        <div class="exp-title">${e.title}</div>
        <div class="exp-company">${e.company}</div>
        <div class="exp-desc">${e.desc}</div>
      </div>
      <div class="exp-date">${e.date}</div>
    </div>`,
    )
    .join("");

  // Projects
  const pg = document.getElementById("projects-grid");
  pg.innerHTML = d.projects
    .map(
      (pr, i) => `
    <div class="project-card">
      <div class="project-num">${String(i + 1).padStart(2, "0")}</div>
      <div class="project-title">${pr.name}</div>
      <div class="project-desc">${pr.desc}</div>
      <div class="project-tech">${pr.tech.map((t) => `<span>${t}</span>`).join("")}</div>
      ${pr.url ? `<a class="project-link" href="${pr.url}" target="_blank">${pr.linkLabel || "View Project"} ↗</a>` : ""}
    </div>`,
    )
    .join("");

  // Certifications
  const cl = document.getElementById("certs-list");
  cl.innerHTML = d.certifications
    .map(
      (c) => `
    <div class="cert-item">
      <div class="cert-name">${c.name}</div>
      <div class="cert-date">${c.date}</div>
    </div>`,
    )
    .join("");
}

// ──────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────
renderAll();
