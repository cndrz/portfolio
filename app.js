(function () {
  "use strict";

  function hashStr(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = (h << 5) - h + s.charCodeAt(i);
      h |= 0;
    }
    return "h" + Math.abs(h).toString(36);
  }

  function el(tag, cls, ...children) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    children.forEach(function (c) {
      if (c == null) return;
      if (typeof c === "string" || typeof c === "number") {
        e.appendChild(document.createTextNode(String(c)));
      } else if (c.nodeType) {
        e.appendChild(c);
      }
    });
    return e;
  }

  function sanitizeUrl(url) {
    if (!url) return "";
    var s = url.trim();
    if (/^javascript:/i.test(s) || /^data:/i.test(s)) return "";
    return s;
  }

  var DEFAULTS = {
    profile: {
      firstname: "Jose Mari",
      lastname: "Dela Cruz",
      tagline:
        "Building AI-powered solutions, full-stack web apps, and developer tools. Currently finishing a BS Computer Science at OLFU.",
      email: "jmdelacruz2735@gmail.com",
      phone: "+63 956 008 3446",
      location: "Caloocan City, Metro Manila",
      github: "https://github.com/cndrz",
      education: "BS Computer Science, OLFU · 2022–2026",
      eyebrow:
        "Computer Science Student & Developer — Metro Manila, Philippines",
      about:
        "I'm a computer science student specializing in full-stack development and AI integration. My work spans web applications, desktop tools, and intelligent systems — built with a focus on real user impact.\n\nI've worked as a Software Engineering Intern at JL Uni Multiserv Inc., where I built and deployed a production company website. I've also built and shipped several AI-powered products independently.\n\nMy thesis, LabBase, is an AI-powered job order system that streamlines preventive maintenance workflows for laboratory equipment services — combining practical engineering with intelligent automation.",
    },
    skills: [
      {
        id: 1,
        group: "Languages",
        items: ["Python", "Java", "C++", "JavaScript", "SQL", "HTML/CSS"],
      },
      { id: 2, group: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
      {
        id: 3,
        group: "Backend & ML",
        items: ["Node.js", "Express", "TensorFlow", "Pandas", "NumPy"],
      },
      {
        id: 4,
        group: "Tools & Platforms",
        items: [
          "Git",
          "Google AI Studio",
          "Linux",
          "VS Code",
          "Groq",
          "Claude Code",
        ],
      },
      {
        id: 5,
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
        desc: "Built and deployed a company website using Vanilla HTML/CSS and Vite, establishing a centralized system for real-time schedule and event updates while expanding client outreach.",
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
    password: hashStr("admin123"),
  };

  function getData() {
    try {
      var d = localStorage.getItem("portfolio_data");
      if (d) {
        var parsed = JSON.parse(d);
        if (parsed.password && !parsed.password.startsWith("h")) {
          parsed.password = hashStr(parsed.password);
          saveData(parsed);
        }
        return parsed;
      }
      return JSON.parse(JSON.stringify(DEFAULTS));
    } catch (_) {
      return JSON.parse(JSON.stringify(DEFAULTS));
    }
  }

  function saveData(data) {
    localStorage.setItem("portfolio_data", JSON.stringify(data));
  }

  function resetData() {
    saveData(JSON.parse(JSON.stringify(DEFAULTS)));
    renderAll();
    renderAdminLists();
    fillProfileForm();
    showToast("Reset to defaults");
  }

  var currentPage = "home";

  function navigate(page) {
    [].forEach.call(document.querySelectorAll(".page"), function (p) {
      p.classList.remove("active");
    });
    document.getElementById(page + "-page").classList.add("active");
    currentPage = page;
    window.scrollTo(0, 0);
    if (page === "admin") initAdmin();
  }

  function renderAll() {
    var d = getData();
    var p = d.profile;

    document.getElementById("hero-firstname").textContent = p.firstname;
    document.getElementById("hero-lastname").textContent = p.lastname;
    document.getElementById("hero-tagline").textContent = p.tagline;
    document.getElementById("hero-eyebrow").textContent = p.eyebrow;
    document.getElementById("hero-cta-link").href = "mailto:" + p.email;
    document.getElementById("hero-meta-school").textContent = (
      p.education.split("·")[0] || ""
    ).trim();
    document.getElementById("hero-meta-year").textContent = p.education;
    document.getElementById("hero-meta-github").textContent = p.github.replace(
      "https://github.com/",
      "github.com/",
    );

    var aboutParas = p.about.split("\n\n").filter(function (s) {
      return s.trim();
    });
    var aboutContainer = document.getElementById("about-text");
    aboutContainer.innerHTML = "";
    aboutParas.forEach(function (t) {
      var para = document.createElement("p");
      para.textContent = t;
      aboutContainer.appendChild(para);
    });

    document.getElementById("aside-location").textContent = p.location;
    document.getElementById("aside-education").textContent = p.education;
    document.getElementById("aside-email").textContent = p.email;
    document.getElementById("aside-email").href = "mailto:" + p.email;
    document.getElementById("aside-github").textContent = p.github.replace(
      "https://github.com/",
      "github.com/",
    );
    document.getElementById("aside-github").href = p.github;
    document.getElementById("aside-phone").textContent = p.phone;

    document.getElementById("contact-email-link").href = "mailto:" + p.email;
    document.getElementById("contact-github-link").href = p.github;

    var sg = document.getElementById("skills-grid");
    sg.innerHTML = "";
    d.skills.forEach(function (g) {
      var group = el(
        "div",
        "skill-group",
        el("div", "skill-group-label", g.group),
      );
      var tags = el("div", "skill-tags");
      g.items.forEach(function (i) {
        tags.appendChild(el("span", "skill-tag", i));
      });
      group.appendChild(tags);
      sg.appendChild(group);
    });

    var el_ = document.getElementById("exp-list");
    el_.innerHTML = "";
    d.experience.forEach(function (e) {
      var date = el("div", "exp-date", e.date);
      var info = el(
        "div",
        null,
        el("div", "exp-title", e.title),
        el("div", "exp-company", e.company),
        el("div", "exp-desc", e.desc),
      );
      var item = el("div", "exp-item", info, date);
      el_.appendChild(item);
    });

    var pg = document.getElementById("projects-grid");
    pg.innerHTML = "";
    d.projects.forEach(function (pr, i) {
      var num = el("div", "project-num", String(i + 1).padStart(2, "0"));
      var title = el("div", "project-title", pr.name);
      var desc = el("div", "project-desc", pr.desc);
      var tech = el("div", "project-tech");
      pr.tech.forEach(function (t) {
        tech.appendChild(el("span", null, t));
      });
      var card = el("div", "project-card", num, title, desc, tech);
      if (pr.url) {
        var safeUrl = sanitizeUrl(pr.url);
        if (safeUrl) {
          var link = document.createElement("a");
          link.className = "project-link";
          link.href = safeUrl;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = (pr.linkLabel || "View Project") + " \u2197";
          card.appendChild(link);
        }
      }
      pg.appendChild(card);
    });

    var cl = document.getElementById("certs-list");
    cl.innerHTML = "";
    d.certifications.forEach(function (c) {
      cl.appendChild(
        el(
          "div",
          "cert-item",
          el("div", "cert-name", c.name),
          el("div", "cert-date", c.date),
        ),
      );
    });
  }

  var authed = false;

  function doLogin() {
    var pw = document.getElementById("login-password").value;
    var d = getData();
    if (hashStr(pw) === (d.password || DEFAULTS.password)) {
      authed = true;
      document.getElementById("admin-login-view").style.display = "none";
      document.getElementById("admin-auth-view").style.display = "block";
      fillProfileForm();
      renderAdminLists();
      document.getElementById("login-error").style.display = "none";
    } else {
      document.getElementById("login-error").style.display = "block";
    }
  }

  function doLogout() {
    authed = false;
    document.getElementById("admin-login-view").style.display = "block";
    document.getElementById("admin-auth-view").style.display = "none";
    document.getElementById("login-password").value = "";
    document.getElementById("login-error").style.display = "none";
  }

  function initAdmin() {
    if (authed) {
      document.getElementById("admin-login-view").style.display = "none";
      document.getElementById("admin-auth-view").style.display = "block";
      fillProfileForm();
      renderAdminLists();
    } else {
      document.getElementById("admin-login-view").style.display = "flex";
      document.getElementById("admin-auth-view").style.display = "none";
    }
  }

  function switchTab(name) {
    [].forEach.call(document.querySelectorAll(".admin-section"), function (s) {
      s.classList.remove("active");
    });
    [].forEach.call(document.querySelectorAll(".admin-nav-item"), function (b) {
      b.classList.remove("active");
    });
    document.getElementById("tab-" + name).classList.add("active");
    var activeBtn = document.querySelector(
      '.admin-nav-item[data-tab="' + name + '"]',
    );
    if (activeBtn) activeBtn.classList.add("active");
  }

  function fillProfileForm() {
    var p = getData().profile;
    document.getElementById("p-firstname").value = p.firstname;
    document.getElementById("p-lastname").value = p.lastname;
    document.getElementById("p-tagline").value = p.tagline;
    document.getElementById("p-email").value = p.email;
    document.getElementById("p-phone").value = p.phone;
    document.getElementById("p-location").value = p.location;
    document.getElementById("p-github").value = p.github;
    document.getElementById("p-education").value = p.education;
    document.getElementById("p-eyebrow").value = p.eyebrow;
    document.getElementById("p-about").value = p.about;
  }

  function saveProfile() {
    var d = getData();
    d.profile = {
      firstname: document.getElementById("p-firstname").value.trim(),
      lastname: document.getElementById("p-lastname").value.trim(),
      tagline: document.getElementById("p-tagline").value.trim(),
      email: document.getElementById("p-email").value.trim(),
      phone: document.getElementById("p-phone").value.trim(),
      location: document.getElementById("p-location").value.trim(),
      github: document.getElementById("p-github").value.trim(),
      education: document.getElementById("p-education").value.trim(),
      eyebrow: document.getElementById("p-eyebrow").value.trim(),
      about: document.getElementById("p-about").value.trim(),
    };
    saveData(d);
    renderAll();
    showToast("Profile saved");
  }

  function renderAdminLists() {
    renderAdminSkills();
    renderAdminExp();
    renderAdminProjects();
    renderAdminCerts();
  }

  function renderAdminSkills() {
    var d = getData();
    var container = document.getElementById("skills-admin-list");
    container.innerHTML = "";
    d.skills.forEach(function (g) {
      var title = el("div", "item-title", g.group);
      var sub = el("div", "item-sub", g.items.join(", "));
      var info = el("div", null, title, sub);
      var del = document.createElement("button");
      del.className = "btn btn-danger btn-sm";
      del.textContent = "Delete";
      del.dataset.action = "delete-skill";
      del.dataset.id = g.id;
      var actions = el("div", "item-actions", del);
      container.appendChild(el("div", "admin-list-item", info, actions));
    });
  }

  function addSkillGroup() {
    var name = document.getElementById("skill-group-name").value.trim();
    var items = document
      .getElementById("skill-group-items")
      .value.split(",")
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
    if (!name || !items.length) return;
    var d = getData();
    d.skills.push({ id: Date.now(), group: name, items: items });
    saveData(d);
    renderAll();
    renderAdminSkills();
    document.getElementById("skill-group-name").value = "";
    document.getElementById("skill-group-items").value = "";
    showToast("Skill group added");
  }

  function deleteSkillGroup(id) {
    var d = getData();
    d.skills = d.skills.filter(function (s) {
      return s.id !== id;
    });
    saveData(d);
    renderAll();
    renderAdminSkills();
    showToast("Deleted");
  }

  function renderAdminExp() {
    var d = getData();
    var container = document.getElementById("exp-admin-list");
    container.innerHTML = "";
    d.experience.forEach(function (e) {
      var title = el("div", "item-title", e.title + " — " + e.company);
      var sub = el("div", "item-sub", e.date);
      var info = el("div", null, title, sub);
      var del = document.createElement("button");
      del.className = "btn btn-danger btn-sm";
      del.textContent = "Delete";
      del.dataset.action = "delete-exp";
      del.dataset.id = e.id;
      var actions = el("div", "item-actions", del);
      container.appendChild(el("div", "admin-list-item", info, actions));
    });
  }

  function addExperience() {
    var title = document.getElementById("exp-title").value.trim();
    var company = document.getElementById("exp-company").value.trim();
    var date = document.getElementById("exp-date").value.trim();
    var desc = document.getElementById("exp-desc").value.trim();
    if (!title || !company) return;
    var d = getData();
    d.experience.push({
      id: Date.now(),
      title: title,
      company: company,
      date: date,
      desc: desc,
    });
    saveData(d);
    renderAll();
    renderAdminExp();
    ["exp-title", "exp-company", "exp-date", "exp-desc"].forEach(function (id) {
      document.getElementById(id).value = "";
    });
    showToast("Experience added");
  }

  function deleteExp(id) {
    var d = getData();
    d.experience = d.experience.filter(function (e) {
      return e.id !== id;
    });
    saveData(d);
    renderAll();
    renderAdminExp();
    showToast("Deleted");
  }

  function renderAdminProjects() {
    var d = getData();
    var container = document.getElementById("projects-admin-list");
    container.innerHTML = "";
    d.projects.forEach(function (pr) {
      var subText = pr.tech.join(", ");
      if (pr.url) subText += " · " + pr.url;
      var title = el("div", "item-title", pr.name);
      var sub = el("div", "item-sub", subText);
      var info = el("div", null, title, sub);
      var del = document.createElement("button");
      del.className = "btn btn-danger btn-sm";
      del.textContent = "Delete";
      del.dataset.action = "delete-project";
      del.dataset.id = pr.id;
      var actions = el("div", "item-actions", del);
      container.appendChild(el("div", "admin-list-item", info, actions));
    });
  }

  function addProject() {
    var name = document.getElementById("proj-name").value.trim();
    var desc = document.getElementById("proj-desc").value.trim();
    var url = document.getElementById("proj-url").value.trim();
    var linkLabel =
      document.getElementById("proj-link-label").value.trim() || "View Project";
    var tech = document
      .getElementById("proj-tech")
      .value.split(",")
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
    if (!name) return;
    var d = getData();
    d.projects.push({
      id: Date.now(),
      name: name,
      desc: desc,
      url: sanitizeUrl(url),
      linkLabel: linkLabel,
      tech: tech,
    });
    saveData(d);
    renderAll();
    renderAdminProjects();
    [
      "proj-name",
      "proj-desc",
      "proj-url",
      "proj-link-label",
      "proj-tech",
    ].forEach(function (id) {
      document.getElementById(id).value = "";
    });
    showToast("Project added");
  }

  function deleteProject(id) {
    var d = getData();
    d.projects = d.projects.filter(function (p) {
      return p.id !== id;
    });
    saveData(d);
    renderAll();
    renderAdminProjects();
    showToast("Deleted");
  }

  function renderAdminCerts() {
    var d = getData();
    var container = document.getElementById("certs-admin-list");
    container.innerHTML = "";
    d.certifications.forEach(function (c) {
      var title = el("div", "item-title", c.name);
      var sub = el("div", "item-sub", c.date);
      var info = el("div", null, title, sub);
      var del = document.createElement("button");
      del.className = "btn btn-danger btn-sm";
      del.textContent = "Delete";
      del.dataset.action = "delete-cert";
      del.dataset.id = c.id;
      var actions = el("div", "item-actions", del);
      container.appendChild(el("div", "admin-list-item", info, actions));
    });
  }

  function addCert() {
    var name = document.getElementById("cert-name").value.trim();
    var date = document.getElementById("cert-date").value.trim();
    if (!name) return;
    var d = getData();
    d.certifications.push({ id: Date.now(), name: name, date: date });
    saveData(d);
    renderAll();
    renderAdminCerts();
    document.getElementById("cert-name").value = "";
    document.getElementById("cert-date").value = "";
    showToast("Certification added");
  }

  function deleteCert(id) {
    var d = getData();
    d.certifications = d.certifications.filter(function (c) {
      return c.id !== id;
    });
    saveData(d);
    renderAll();
    renderAdminCerts();
    showToast("Deleted");
  }

  function changePw() {
    var np = document.getElementById("new-pw").value;
    var cp = document.getElementById("confirm-pw").value;
    if (!np) return showToast("Enter a new password");
    if (np !== cp) return showToast("Passwords do not match");
    var d = getData();
    d.password = hashStr(np);
    saveData(d);
    document.getElementById("new-pw").value = "";
    document.getElementById("confirm-pw").value = "";
    showToast("Password updated");
  }

  var toastTimer;

  function showToast(msg) {
    var t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      t.classList.remove("show");
    }, 2500);
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderAll();

    document
      .getElementById("nav-home-link")
      .addEventListener("click", function (e) {
        e.preventDefault();
        navigate("home");
      });
    document
      .getElementById("nav-admin-link")
      .addEventListener("click", function (e) {
        e.preventDefault();
        navigate("admin");
      });

    [].forEach.call(document.querySelectorAll(".nav-links a"), function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        navigate("home");
      });
    });

    document
      .getElementById("login-password")
      .addEventListener("keydown", function (e) {
        if (e.key === "Enter") doLogin();
      });
    document.getElementById("login-btn").addEventListener("click", doLogin);
    document.getElementById("logout-btn").addEventListener("click", doLogout);
    document
      .getElementById("view-site-btn")
      .addEventListener("click", function (e) {
        e.preventDefault();
        navigate("home");
      });

    [].forEach.call(
      document.querySelectorAll(".admin-nav-item"),
      function (btn) {
        btn.addEventListener("click", function () {
          switchTab(this.dataset.tab);
        });
      },
    );

    document
      .getElementById("save-profile-btn")
      .addEventListener("click", saveProfile);
    document
      .getElementById("add-skill-btn")
      .addEventListener("click", addSkillGroup);
    document
      .getElementById("add-exp-btn")
      .addEventListener("click", addExperience);
    document
      .getElementById("add-project-btn")
      .addEventListener("click", addProject);
    document.getElementById("add-cert-btn").addEventListener("click", addCert);
    document
      .getElementById("change-pw-btn")
      .addEventListener("click", changePw);
    document
      .getElementById("reset-data-btn")
      .addEventListener("click", function () {
        if (confirm("Reset all data to defaults?")) resetData();
      });

    document
      .getElementById("skills-admin-list")
      .addEventListener("click", function (e) {
        var btn = e.target.closest("[data-action='delete-skill']");
        if (btn) deleteSkillGroup(Number(btn.dataset.id));
      });
    document
      .getElementById("exp-admin-list")
      .addEventListener("click", function (e) {
        var btn = e.target.closest("[data-action='delete-exp']");
        if (btn) deleteExp(Number(btn.dataset.id));
      });
    document
      .getElementById("projects-admin-list")
      .addEventListener("click", function (e) {
        var btn = e.target.closest("[data-action='delete-project']");
        if (btn) deleteProject(Number(btn.dataset.id));
      });
    document
      .getElementById("certs-admin-list")
      .addEventListener("click", function (e) {
        var btn = e.target.closest("[data-action='delete-cert']");
        if (btn) deleteCert(Number(btn.dataset.id));
      });
  });
})();
