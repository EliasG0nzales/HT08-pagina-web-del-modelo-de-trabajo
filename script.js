const navbar = document.querySelector("#navbar");
const scrollTop = document.querySelector("#scrollTop");
const preloader = document.querySelector("#preloader");
const cursorGlow = document.querySelector("#cursorGlow");
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector(".nav-links");
const mainNavLinks = document.querySelectorAll(".nav-links a");
const revealItems = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll(".tilt-card");
const questionCards = document.querySelectorAll(".question-card");
const counters = document.querySelectorAll("[data-count]");
const canvas = document.querySelector("#starfield");
const ctx = canvas.getContext("2d");
const matrixCanvas = document.querySelector("#matrixRain");
const matrixCtx = matrixCanvas.getContext("2d");
const trafficChart = document.querySelector("#trafficChart");
const trafficCtx = trafficChart?.getContext("2d");
const donutChart = document.querySelector("#donutChart");
const donutCtx = donutChart?.getContext("2d");
const kasperskyLaunch = document.querySelector("#kasperskyLaunch");
const kasperskyModal = document.querySelector("#kasperskyModal");
const kasperskyClose = document.querySelector("#kasperskyClose");
const kasperskyFrame = document.querySelector("#kasperskyFrame");
const terminalText = document.querySelector("#terminalText");
const osNavItems = document.querySelectorAll(".os-nav-item");
const osPanelTitle = document.querySelector("#osPanelTitle");
const osPanelBadge = document.querySelector("#osPanelBadge");
const osPanelStack = document.querySelector("#osPanelStack");
const osScoreValue = document.querySelector("#osScoreValue");
const osScoreLabel = document.querySelector("#osScoreLabel");
const osLogsBadge = document.querySelector("#osLogsBadge");
const osLogsList = document.querySelector("#osLogsList");
const osTraffic = document.querySelector("#osTraffic");
const osModelVisual = document.querySelector("#osModelVisual");
const osModelTitle = document.querySelector("#osModelTitle");
const osModelTag = document.querySelector("#osModelTag");
const osModelDescription = document.querySelector("#osModelDescription");
const osExamples = document.querySelector("#osExamples");

let stars = [];
let matrixDrops = [];
let trafficData = Array.from({ length: 34 }, () => Math.random() * 80 + 20);
let blockedRatio = 72;
let mouseX = 0;
let mouseY = 0;
const terminalLines = [
  "> booting FortiGate web-filter module...",
  "> inspection-mode: proxy",
  "> ngfw-mode: policy-based",
  "> scanning packets...",
  "> category: social media -> blocked",
  "> category: malware -> blocked",
  "> ssl inspection profile loaded",
  "> webfilter-profile: corporativo",
  "> security systems online"
];

const navSections = Array.from(mainNavLinks)
  .map(link => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const osViews = {
  policies: {
    title: "Policy Manager",
    badge: "UTM enabled",
    score: "96%",
    scoreLabel: "risk posture stable",
    logsBadge: "real time",
    rows: [
      ["Marketing", "Social limitado", 88],
      ["TI", "Acceso avanzado", 96],
      ["Estudiantes", "Streaming bloqueado", 74]
    ],
    logs: ["malware.blocked", "social.media.denied", "ssl.deep.scan"],
    traffic: [100, 78, 92, 64],
    model: "model-policy",
    modelTitle: "Modelo por perfiles",
    modelTag: "policy-based",
    description: "Representa como FortiGate aplica perfiles distintos por area para controlar categorias web, aplicaciones y excepciones.",
    examples: ["Marketing: redes sociales limitadas", "TI: acceso tecnico ampliado", "Estudiantes: streaming bloqueado"]
  },
  web: {
    title: "Web Filter",
    badge: "78 categorias",
    score: "72%",
    scoreLabel: "contenido no laboral bloqueado",
    logsBadge: "category feed",
    rows: [
      ["Redes sociales", "denegado en horario", 82],
      ["Streaming", "bloqueo productivo", 76],
      ["Malware", "categoria critica", 98]
    ],
    logs: ["category.social.blocked", "streaming.media.denied", "malware.site.quarantine"],
    traffic: [72, 88, 64, 94],
    model: "model-web",
    modelTitle: "Modelo de categorias",
    modelTag: "web filtering",
    description: "Clasifica destinos web por riesgo o productividad y decide si permitir, monitorear o bloquear la navegacion.",
    examples: ["Social media: restringido", "Streaming: bloqueado", "Malware: cuarentena"]
  },
  ssl: {
    title: "SSL Inspection",
    badge: "proxy deep",
    score: "86%",
    scoreLabel: "trafico https inspeccionado",
    logsBadge: "tls events",
    rows: [
      ["Certificados", "validacion activa", 84],
      ["HTTPS", "contenido cifrado", 91],
      ["Deep scan", "perfil corporativo", 86]
    ],
    logs: ["tls.handshake.checked", "certificate.valid", "https.content.scanned"],
    traffic: [86, 68, 90, 78],
    model: "model-ssl",
    modelTitle: "Modelo de inspeccion TLS",
    modelTag: "proxy deep",
    description: "Simula la revision de trafico HTTPS para aplicar politicas aunque el contenido viaje cifrado.",
    examples: ["Validar certificado", "Inspeccionar HTTPS", "Aplicar perfil corporativo"]
  },
  reports: {
    title: "Reports",
    badge: "risk trend",
    score: "42",
    scoreLabel: "eventos revisados",
    logsBadge: "audit trail",
    rows: [
      ["Productividad", "impacto medido", 80],
      ["Falsos positivos", "excepciones", 38],
      ["Riesgo semanal", "tendencia baja", 62]
    ],
    logs: ["report.generated", "exception.reviewed", "risk.trend.updated"],
    traffic: [52, 64, 72, 88],
    model: "model-reports",
    modelTitle: "Modelo de reporteria",
    modelTag: "audit trail",
    description: "Resume eventos, excepciones y tendencias para justificar decisiones y mejorar la politica web.",
    examples: ["Reporte semanal", "Excepcion revisada", "Riesgo en descenso"]
  }
};

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
  stars = Array.from({ length: Math.min(130, Math.floor(window.innerWidth / 9)) }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * 1.6 + 0.25,
    r: Math.random() * 1.7 + 0.35
  }));
  matrixDrops = Array.from({ length: Math.ceil(window.innerWidth / 18) }, () => Math.random() * -80);
  setupCharts();
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const star of stars) {
    star.y += star.z * 0.18;
    star.x += (mouseX - 0.5) * star.z * 0.16;
    if (star.y > canvas.height) star.y = 0;
    if (star.x > canvas.width) star.x = 0;
    if (star.x < 0) star.x = canvas.width;

    ctx.beginPath();
    ctx.fillStyle = `rgba(105, 231, 255, ${0.22 + star.z * 0.22})`;
    ctx.shadowColor = "#36e7ff";
    ctx.shadowBlur = 8;
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}

function drawMatrix() {
  matrixCtx.fillStyle = "rgba(5, 7, 13, 0.08)";
  matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
  matrixCtx.fillStyle = "rgba(109, 255, 184, 0.55)";
  matrixCtx.font = "14px monospace";

  matrixDrops.forEach((drop, index) => {
    const text = Math.random() > 0.5 ? "1" : "0";
    const x = index * 18;
    const y = drop * 18;
    matrixCtx.fillText(text, x, y);
    matrixDrops[index] = y > matrixCanvas.height && Math.random() > 0.975 ? 0 : drop + 0.35;
  });

  requestAnimationFrame(drawMatrix);
}

function setupCharts() {
  if (trafficChart) {
    trafficChart.width = trafficChart.clientWidth * devicePixelRatio;
    trafficChart.height = 220 * devicePixelRatio;
  }
  if (donutChart) {
    donutChart.width = donutChart.clientWidth * devicePixelRatio;
    donutChart.height = 220 * devicePixelRatio;
  }
}

function drawTrafficChart() {
  if (!trafficCtx || !trafficChart) return;
  const width = trafficChart.width;
  const height = trafficChart.height;
  trafficCtx.clearRect(0, 0, width, height);
  trafficCtx.strokeStyle = "rgba(54, 231, 255, 0.16)";
  trafficCtx.lineWidth = 1 * devicePixelRatio;

  for (let i = 0; i < 5; i++) {
    const y = (height / 5) * i;
    trafficCtx.beginPath();
    trafficCtx.moveTo(0, y);
    trafficCtx.lineTo(width, y);
    trafficCtx.stroke();
  }

  trafficCtx.beginPath();
  trafficData.forEach((value, index) => {
    const x = (width / (trafficData.length - 1)) * index;
    const y = height - (value / 120) * height;
    if (index === 0) trafficCtx.moveTo(x, y);
    else trafficCtx.lineTo(x, y);
  });
  trafficCtx.strokeStyle = "#36e7ff";
  trafficCtx.lineWidth = 3 * devicePixelRatio;
  trafficCtx.shadowColor = "#36e7ff";
  trafficCtx.shadowBlur = 14 * devicePixelRatio;
  trafficCtx.stroke();
  trafficCtx.shadowBlur = 0;
}

function drawDonutChart() {
  if (!donutCtx || !donutChart) return;
  const width = donutChart.width;
  const height = donutChart.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.34;
  const start = -Math.PI / 2;
  const end = start + Math.PI * 2 * (blockedRatio / 100);

  donutCtx.clearRect(0, 0, width, height);
  donutCtx.lineWidth = 22 * devicePixelRatio;
  donutCtx.strokeStyle = "rgba(255,255,255,0.1)";
  donutCtx.beginPath();
  donutCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  donutCtx.stroke();

  donutCtx.strokeStyle = "#6dffb8";
  donutCtx.shadowColor = "#6dffb8";
  donutCtx.shadowBlur = 18 * devicePixelRatio;
  donutCtx.beginPath();
  donutCtx.arc(centerX, centerY, radius, start, end);
  donutCtx.stroke();
  donutCtx.shadowBlur = 0;

  donutCtx.fillStyle = "#eef6ff";
  donutCtx.font = `${36 * devicePixelRatio}px Inter, sans-serif`;
  donutCtx.textAlign = "center";
  donutCtx.fillText(`${Math.round(blockedRatio)}%`, centerX, centerY + 8 * devicePixelRatio);
}

function animateCharts() {
  trafficData.push(Math.random() * 85 + 24);
  trafficData.shift();
  blockedRatio += (Math.random() - 0.5) * 2.4;
  blockedRatio = Math.max(62, Math.min(92, blockedRatio));
  drawTrafficChart();
  drawDonutChart();
}

function typeTerminal() {
  if (!terminalText) return;
  let line = 0;
  let char = 0;

  const type = () => {
    if (line >= terminalLines.length) return;
    const current = terminalLines[line];
    terminalText.textContent = `${terminalLines.slice(0, line).join("\n")}\n${current.slice(0, char)}`;
    char += 1;
    if (char > current.length) {
      line += 1;
      char = 0;
      setTimeout(type, 350);
    } else {
      setTimeout(type, 28);
    }
  };

  type();
}

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach(item => observer.observe(item));

const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.dataset.done) return;

      entry.target.dataset.done = "true";
      const end = Number(entry.target.dataset.count);
      const suffix = end === 24 ? "/7" : "%";
      let current = 0;
      const step = Math.max(1, Math.ceil(end / 42));

      const tick = () => {
        current = Math.min(end, current + step);
        entry.target.textContent = `${current}${suffix}`;
        if (current < end) requestAnimationFrame(tick);
      };

      tick();
    });
  },
  { threshold: 0.5 }
);

counters.forEach(counter => counterObserver.observe(counter));

tiltCards.forEach(card => {
  card.addEventListener("mousemove", event => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 12;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

questionCards.forEach(card => {
  card.addEventListener("click", () => {
    questionCards.forEach(item => item.classList.remove("active"));
    card.classList.add("active");
  });
});

function renderOsView(viewKey) {
  const view = osViews[viewKey];
  if (
    !view ||
    !osPanelTitle ||
    !osPanelBadge ||
    !osPanelStack ||
    !osScoreValue ||
    !osScoreLabel ||
    !osLogsBadge ||
    !osLogsList ||
    !osTraffic ||
    !osModelVisual ||
    !osModelTitle ||
    !osModelTag ||
    !osModelDescription ||
    !osExamples
  ) return;

  osPanelTitle.textContent = view.title;
  osPanelBadge.textContent = view.badge;
  osScoreValue.textContent = view.score;
  osScoreLabel.textContent = view.scoreLabel;
  osLogsBadge.textContent = view.logsBadge;

  osPanelStack.innerHTML = view.rows
    .map(([name, detail, fill]) => `<i style="--fill: ${fill}%"><b>${name}</b><span>${detail}</span></i>`)
    .join("");

  osLogsList.innerHTML = view.logs
    .map(log => `<p><i></i> ${log}</p>`)
    .join("");

  osTraffic.querySelectorAll("span").forEach((bar, index) => {
    bar.style.width = `${view.traffic[index] || 64}%`;
  });

  osModelVisual.className = `os-model-visual ${view.model}`;
  osModelVisual.innerHTML = "<span></span><span></span><span></span>";
  osModelTitle.textContent = view.modelTitle;
  osModelTag.textContent = view.modelTag;
  osModelDescription.textContent = view.description;
  osExamples.innerHTML = view.examples
    .map(example => `<b>${example}</b>`)
    .join("");
}

osNavItems.forEach(item => {
  item.addEventListener("click", () => {
    osNavItems.forEach(navItem => {
      navItem.classList.remove("active");
      navItem.setAttribute("aria-pressed", "false");
    });

    item.classList.add("active");
    item.setAttribute("aria-pressed", "true");
    renderOsView(item.dataset.osView);
  });
});

document.addEventListener("mousemove", event => {
  mouseX = event.clientX / window.innerWidth;
  mouseY = event.clientY / window.innerHeight;
  if (cursorGlow) {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }

  document.querySelectorAll("[data-depth]").forEach(element => {
    const depth = Number(element.dataset.depth);
    const x = (mouseX - 0.5) * depth * 70;
    const y = (mouseY - 0.5) * depth * 70;
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
});

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 40;
  navbar.classList.toggle("scrolled", scrolled);
  scrollTop.classList.toggle("visible", window.scrollY > 560);

  document.body.style.setProperty("--scroll", `${window.scrollY}px`);

  const currentSection = navSections
    .filter(section => section.offsetTop <= window.scrollY + 180)
    .at(-1);

  if (currentSection) {
    mainNavLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentSection.id}`);
    });
  }

  document.querySelectorAll("[data-parallax]").forEach(layer => {
    const speed = Number(layer.dataset.parallax);
    layer.style.setProperty("--parallax-y", `${window.scrollY * speed}px`);
  });
});

scrollTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

mainNavLinks.forEach(link => {
  link.addEventListener("click", () => {
    mainNavLinks.forEach(item => item.classList.remove("active", "zap"));
    link.classList.add("active", "zap");
    window.setTimeout(() => link.classList.remove("zap"), 620);
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

function openKasperskyModal() {
  if (!kasperskyModal || !kasperskyFrame) return;
  if (!kasperskyFrame.src) {
    kasperskyFrame.src = kasperskyFrame.dataset.src;
  }
  kasperskyModal.classList.add("open");
  kasperskyModal.setAttribute("aria-hidden", "false");
}

function closeKasperskyModal() {
  if (!kasperskyModal) return;
  kasperskyModal.classList.remove("open");
  kasperskyModal.setAttribute("aria-hidden", "true");
}

kasperskyLaunch?.addEventListener("click", openKasperskyModal);
kasperskyClose?.addEventListener("click", closeKasperskyModal);
kasperskyModal?.addEventListener("click", event => {
  if (event.target === kasperskyModal) closeKasperskyModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeKasperskyModal();
});

window.addEventListener("resize", resizeCanvas);
window.addEventListener("load", () => {
  setTimeout(() => preloader?.classList.add("hidden"), 4200);
});

resizeCanvas();
drawStars();
drawMatrix();
drawTrafficChart();
drawDonutChart();
setInterval(animateCharts, 900);
typeTerminal();
