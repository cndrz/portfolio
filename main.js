// ──────────────────────────────────────────────
// DEFAULT DATA
// ──────────────────────────────────────────────
const DEFAULTS = {
  profile: {
    firstname: 'Jose Mari',
    lastname: 'Dela Cruz',
    tagline: 'Building AI-powered solutions, full-stack web apps, and developer tools. Currently finishing a BS Computer Science at OLFU.',
    email: 'jmdelacruz2735@gmail.com',
    phone: '+63 956 008 3446',
    location: 'Caloocan City, Metro Manila',
    github: 'https://github.com/cndrz',
    education: 'BS Computer Science, OLFU · 2022–2026',
    eyebrow: 'Computer Science Student & Developer — Metro Manila, Philippines',
    about: `I'm a computer science student specializing in full-stack development and AI integration. My work spans web applications, desktop tools, and intelligent systems — built with a focus on real user impact.\n\nI've worked as a Software Engineering Intern at JL Uni Multiserv Inc., where I built and deployed a production company website. I've also built and shipped several AI-powered products independently.\n\nMy thesis, LabBase, is an AI-powered job order system that streamlines preventive maintenance workflows for laboratory equipment services — combining practical engineering with intelligent automation.`
  },
  skills: [
    { id: 1, group: 'Languages', items: ['Python', 'Java', 'C++', 'JavaScript', 'SQL', 'HTML/CSS'] },
    { id: 2, group: 'Frontend', items: ['React', 'Next.js', 'Node.js', 'TensorFlow', 'Pandas', 'NumPy'] },
    { id: 3, group: 'Tools & Platforms', items: ['Git', 'Google AI Studio', 'Linux', 'VS Code', 'Groq', 'Claude Code'] },
    { id: 4, group: 'Concepts', items: ['REST APIs', 'Agile/Scrum', 'OOP', 'CI/CD', 'LLM Integration', 'JamStack'] }
  ],
  experience: [
    { id: 1, title: 'Software Engineering Intern', company: 'JL Uni Multiserv Inc.', date: 'Feb 2026 – May 2026', desc: 'Built and deployed a company website using Vanilla HTML/CSS and Vite, establishing a centralized system for real-time schedule and event updates while expanding client outreach.' }
  ],
  projects: [
    { id: 1, name: 'RESCREEN', desc: 'AI-powered web platform that automates resume critiques and ATS optimization. Built with a semantic evaluation engine powered by Llama 3 via Groq, delivering sub-second matching scores and skill gap analyses.', url: 'https://rescreenapp.vercel.app', linkLabel: 'View Live', tech: ['HTML/CSS', 'JavaScript', 'Vite', 'Groq'] },
    { id: 2, name: 'INDEX', desc: 'Data analytics web app for streamlining exploratory data analysis and quality auditing. Automated pipeline to ingest CSV files, compute statistical summaries, and detect anomalies with dynamic ECharts visualizations.', url: 'https://github.com/cndrz/InDex', linkLabel: 'GitHub', tech: ['React', 'Node.js', 'Express', 'ECharts'] },
    { id: 3, name: 'DAILYZEN', desc: 'AI-powered desktop app delivering personalized daily wisdom and motivational insights. Built on Electron with secure IPC architecture and powered by Llama 3.1 via Groq, featuring a six-theme visual customization engine.', url: 'https://github.com/cndrz/DailyZen', linkLabel: 'GitHub', tech: ['Electron', 'Node.js', 'Groq'] }
  ],
  certifications: [
    { id: 1, name: 'Cisco Certified Support Technician Cybersecurity (CCST)', date: 'January 2026' },
    { id: 2, name: 'Networking Devices and Initial Configuration — Cisco', date: 'October 2024' },
    { id: 3, name: 'Networking Basics — Cisco', date: 'November 2024' },
    { id: 4, name: 'Introduction to Cybersecurity — Cisco', date: 'January 2026' }
  ],
  password: 'admin123'
};

// ──────────────────────────────────────────────
// STORAGE
// ──────────────────────────────────────────────
function getData() {
  try {
    const d = localStorage.getItem('portfolio_data');
    return d ? JSON.parse(d) : JSON.parse(JSON.stringify(DEFAULTS));
  } catch { return JSON.parse(JSON.stringify(DEFAULTS)); }
}
function saveData(data) {
  localStorage.setItem('portfolio_data', JSON.stringify(data));
}
function resetData() {
  saveData(JSON.parse(JSON.stringify(DEFAULTS)));
  renderAll();
  renderAdminLists();
  fillProfileForm();
  showToast('Reset to defaults');
}

// ──────────────────────────────────────────────
// NAVIGATION
// ──────────────────────────────────────────────
let currentPage = 'home';
function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(page + '-page').classList.add('active');
  currentPage = page;
  window.scrollTo(0, 0);
  if (page === 'admin') initAdmin();
}

// ──────────────────────────────────────────────
// RENDER HOME
// ──────────────────────────────────────────────
function renderAll() {
  const d = getData();
  const p = d.profile;

  // Hero
  document.getElementById('hero-firstname').textContent = p.firstname;
  document.getElementById('hero-lastname').textContent = p.lastname;
  document.getElementById('hero-tagline').textContent = p.tagline;
  document.getElementById('hero-eyebrow').textContent = p.eyebrow;
  document.getElementById('hero-cta-link').href = 'mailto:' + p.email;
  document.getElementById('hero-meta-school').textContent = p.education.split('·')[0]?.trim() || '';
  document.getElementById('hero-meta-year').textContent = p.education;
  const ghHandle = p.github.replace('https://github.com/', 'github.com/');
  document.getElementById('hero-meta-github').textContent = ghHandle;

  // About
  const aboutParas = p.about.split('\n\n').filter(s => s.trim());
  document.getElementById('about-text').innerHTML = aboutParas.map(t => `<p>${t}</p>`).join('');
  document.getElementById('aside-location').textContent = p.location;
  document.getElementById('aside-education').textContent = p.education;
  document.getElementById('aside-email').textContent = p.email;
  document.getElementById('aside-email').href = 'mailto:' + p.email;
  document.getElementById('aside-github').textContent = ghHandle;
  document.getElementById('aside-github').href = p.github;
  document.getElementById('aside-phone').textContent = p.phone;

  // Contact
  document.getElementById('contact-email-link').href = 'mailto:' + p.email;
  document.getElementById('contact-github-link').href = p.github;

  // Skills
  const sg = document.getElementById('skills-grid');
  sg.innerHTML = d.skills.map(g => `
    <div class="skill-group">
      <div class="skill-group-label">${g.group}</div>
      <div class="skill-tags">${g.items.map(i => `<span class="skill-tag">${i}</span>`).join('')}</div>
    </div>`).join('');

  // Experience
  const el = document.getElementById('exp-list');
  el.innerHTML = d.experience.map(e => `
    <div class="exp-item">
      <div>
        <div class="exp-title">${e.title}</div>
        <div class="exp-company">${e.company}</div>
        <div class="exp-desc">${e.desc}</div>
      </div>
      <div class="exp-date">${e.date}</div>
    </div>`).join('');

  // Projects
  const pg = document.getElementById('projects-grid');
  pg.innerHTML = d.projects.map((pr, i) => `
    <div class="project-card">
      <div class="project-num">${String(i + 1).padStart(2, '0')}</div>
      <div class="project-title">${pr.name}</div>
      <div class="project-desc">${pr.desc}</div>
      <div class="project-tech">${pr.tech.map(t => `<span>${t}</span>`).join('')}</div>
      ${pr.url ? `<a class="project-link" href="${pr.url}" target="_blank">${pr.linkLabel || 'View Project'} ↗</a>` : ''}
    </div>`).join('');

  // Certifications
  const cl = document.getElementById('certs-list');
  cl.innerHTML = d.certifications.map(c => `
    <div class="cert-item">
      <div class="cert-name">${c.name}</div>
      <div class="cert-date">${c.date}</div>
    </div>`).join('');
}

// ──────────────────────────────────────────────
// ADMIN AUTH
// ──────────────────────────────────────────────
let authed = false;
function doLogin() {
  const pw = document.getElementById('login-password').value;
  const d = getData();
  if (pw === (d.password || DEFAULTS.password)) {
    authed = true;
    document.getElementById('admin-login-view').style.display = 'none';
    document.getElementById('admin-auth-view').style.display = 'block';
    fillProfileForm();
    renderAdminLists();
  } else {
    document.getElementById('login-error').style.display = 'block';
  }
}
function doLogout() {
  authed = false;
  document.getElementById('admin-login-view').style.display = 'block';
  document.getElementById('admin-auth-view').style.display = 'none';
  document.getElementById('login-password').value = '';
  document.getElementById('login-error').style.display = 'none';
}
function initAdmin() {
  if (authed) {
    document.getElementById('admin-login-view').style.display = 'none';
    document.getElementById('admin-auth-view').style.display = 'block';
    fillProfileForm();
    renderAdminLists();
  } else {
    document.getElementById('admin-login-view').style.display = 'flex';
    document.getElementById('admin-auth-view').style.display = 'none';
  }
}

// ──────────────────────────────────────────────
// ADMIN TABS
// ──────────────────────────────────────────────
function switchTab(name, el) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.admin-nav-item').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  el.classList.add('active');
}

// ──────────────────────────────────────────────
// PROFILE
// ──────────────────────────────────────────────
function fillProfileForm() {
  const p = getData().profile;
  document.getElementById('p-firstname').value = p.firstname;
  document.getElementById('p-lastname').value = p.lastname;
  document.getElementById('p-tagline').value = p.tagline;
  document.getElementById('p-email').value = p.email;
  document.getElementById('p-phone').value = p.phone;
  document.getElementById('p-location').value = p.location;
  document.getElementById('p-github').value = p.github;
  document.getElementById('p-education').value = p.education;
  document.getElementById('p-eyebrow').value = p.eyebrow;
  document.getElementById('p-about').value = p.about;
}
function saveProfile() {
  const d = getData();
  d.profile = {
    ...d.profile,
    firstname: document.getElementById('p-firstname').value.trim(),
    lastname: document.getElementById('p-lastname').value.trim(),
    tagline: document.getElementById('p-tagline').value.trim(),
    email: document.getElementById('p-email').value.trim(),
    phone: document.getElementById('p-phone').value.trim(),
    location: document.getElementById('p-location').value.trim(),
    github: document.getElementById('p-github').value.trim(),
    education: document.getElementById('p-education').value.trim(),
    eyebrow: document.getElementById('p-eyebrow').value.trim(),
    about: document.getElementById('p-about').value.trim(),
  };
  saveData(d);
  renderAll();
  showToast('Profile saved');
}

// ──────────────────────────────────────────────
// SKILLS
// ──────────────────────────────────────────────
function renderAdminSkills() {
  const d = getData();
  document.getElementById('skills-admin-list').innerHTML = d.skills.map(g => `
    <div class="admin-list-item">
      <div>
        <div class="item-title">${g.group}</div>
        <div class="item-sub">${g.items.join(', ')}</div>
      </div>
      <div class="item-actions">
        <button class="btn btn-danger btn-sm" onclick="deleteSkillGroup(${g.id})">Delete</button>
      </div>
    </div>`).join('');
}
function addSkillGroup() {
  const name = document.getElementById('skill-group-name').value.trim();
  const items = document.getElementById('skill-group-items').value.split(',').map(s => s.trim()).filter(Boolean);
  if (!name || !items.length) return;
  const d = getData();
  d.skills.push({ id: Date.now(), group: name, items });
  saveData(d);
  renderAll();
  renderAdminSkills();
  document.getElementById('skill-group-name').value = '';
  document.getElementById('skill-group-items').value = '';
  showToast('Skill group added');
}
function deleteSkillGroup(id) {
  const d = getData();
  d.skills = d.skills.filter(s => s.id !== id);
  saveData(d);
  renderAll();
  renderAdminSkills();
  showToast('Deleted');
}

// ──────────────────────────────────────────────
// EXPERIENCE
// ──────────────────────────────────────────────
function renderAdminExp() {
  const d = getData();
  document.getElementById('exp-admin-list').innerHTML = d.experience.map(e => `
    <div class="admin-list-item">
      <div>
        <div class="item-title">${e.title} — ${e.company}</div>
        <div class="item-sub">${e.date}</div>
      </div>
      <div class="item-actions">
        <button class="btn btn-danger btn-sm" onclick="deleteExp(${e.id})">Delete</button>
      </div>
    </div>`).join('');
}
function addExperience() {
  const title = document.getElementById('exp-title').value.trim();
  const company = document.getElementById('exp-company').value.trim();
  const date = document.getElementById('exp-date').value.trim();
  const desc = document.getElementById('exp-desc').value.trim();
  if (!title || !company) return;
  const d = getData();
  d.experience.push({ id: Date.now(), title, company, date, desc });
  saveData(d);
  renderAll();
  renderAdminExp();
  ['exp-title', 'exp-company', 'exp-date', 'exp-desc'].forEach(id => document.getElementById(id).value = '');
  showToast('Experience added');
}
function deleteExp(id) {
  const d = getData();
  d.experience = d.experience.filter(e => e.id !== id);
  saveData(d);
  renderAll();
  renderAdminExp();
  showToast('Deleted');
}

// ──────────────────────────────────────────────
// PROJECTS
// ──────────────────────────────────────────────
function renderAdminProjects() {
  const d = getData();
  document.getElementById('projects-admin-list').innerHTML = d.projects.map(pr => `
    <div class="admin-list-item">
      <div>
        <div class="item-title">${pr.name}</div>
        <div class="item-sub">${pr.tech.join(', ')} ${pr.url ? '· ' + pr.url : ''}</div>
      </div>
      <div class="item-actions">
        <button class="btn btn-danger btn-sm" onclick="deleteProject(${pr.id})">Delete</button>
      </div>
    </div>`).join('');
}
function addProject() {
  const name = document.getElementById('proj-name').value.trim();
  const desc = document.getElementById('proj-desc').value.trim();
  const url = document.getElementById('proj-url').value.trim();
  const linkLabel = document.getElementById('proj-link-label').value.trim() || 'View Project';
  const tech = document.getElementById('proj-tech').value.split(',').map(s => s.trim()).filter(Boolean);
  if (!name) return;
  const d = getData();
  d.projects.push({ id: Date.now(), name, desc, url, linkLabel, tech });
  saveData(d);
  renderAll();
  renderAdminProjects();
  ['proj-name', 'proj-desc', 'proj-url', 'proj-link-label', 'proj-tech'].forEach(id => document.getElementById(id).value = '');
  showToast('Project added');
}
function deleteProject(id) {
  const d = getData();
  d.projects = d.projects.filter(p => p.id !== id);
  saveData(d);
  renderAll();
  renderAdminProjects();
  showToast('Deleted');
}

// ──────────────────────────────────────────────
// CERTIFICATIONS
// ──────────────────────────────────────────────
function renderAdminCerts() {
  const d = getData();
  document.getElementById('certs-admin-list').innerHTML = d.certifications.map(c => `
    <div class="admin-list-item">
      <div>
        <div class="item-title">${c.name}</div>
        <div class="item-sub">${c.date}</div>
      </div>
      <div class="item-actions">
        <button class="btn btn-danger btn-sm" onclick="deleteCert(${c.id})">Delete</button>
      </div>
    </div>`).join('');
}
function addCert() {
  const name = document.getElementById('cert-name').value.trim();
  const date = document.getElementById('cert-date').value.trim();
  if (!name) return;
  const d = getData();
  d.certifications.push({ id: Date.now(), name, date });
  saveData(d);
  renderAll();
  renderAdminCerts();
  document.getElementById('cert-name').value = '';
  document.getElementById('cert-date').value = '';
  showToast('Certification added');
}
function deleteCert(id) {
  const d = getData();
  d.certifications = d.certifications.filter(c => c.id !== id);
  saveData(d);
  renderAll();
  renderAdminCerts();
  showToast('Deleted');
}

// ──────────────────────────────────────────────
// SETTINGS
// ──────────────────────────────────────────────
function changePw() {
  const np = document.getElementById('new-pw').value;
  const cp = document.getElementById('confirm-pw').value;
  if (!np) return showToast('Enter a new password');
  if (np !== cp) return showToast('Passwords do not match');
  const d = getData();
  d.password = np;
  saveData(d);
  document.getElementById('new-pw').value = '';
  document.getElementById('confirm-pw').value = '';
  showToast('Password updated');
}

// ──────────────────────────────────────────────
// RENDER ADMIN LISTS
// ──────────────────────────────────────────────
function renderAdminLists() {
  renderAdminSkills();
  renderAdminExp();
  renderAdminProjects();
  renderAdminCerts();
}

// ──────────────────────────────────────────────
// TOAST
// ──────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

// ──────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────
renderAll();
