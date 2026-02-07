const contracts = [
  {
    id: "ctr-msa-acme",
    title: "MSA - Acme Vendor",
    status: "DRAFT",
    createdAt: "Jan 12, 2026",
    risk: "MEDIUM",
    blurb: "Cloud services agreement with auto-renew and usage-based pricing.",
    summary: {
      whatItIs: "Master Services Agreement for software and support delivery.",
      payments: "$12,000 / quarter",
      term: "24 months minimum",
      renewal: "Auto-renews yearly",
    },
    findings: [
      "Termination language allows unilateral suspension on broad material breach wording.",
      "Price adjustment clause permits fee changes with 30-day notice only.",
      "Data residency obligations are vague for non-EU hosting regions.",
    ],
    redFlags: [
      "High indemnity cap mismatch between customer and vendor obligations.",
      "Ambiguous SLA credit remedy could limit practical recourse.",
    ],
    keyDates: ["2026-02-15 notice cutoff", "2026-03-31 price review"],
    nextActions: [
      "Request tighter cure period language for suspension events.",
      "Ask for explicit data localization addendum.",
      "Send redline covering fee increase thresholds.",
    ],
  },
  {
    id: "ctr-nda-orbit",
    title: "Mutual NDA - Orbit Labs",
    status: "ANALYZED",
    createdAt: "Jan 18, 2026",
    risk: "LOW",
    blurb: "Two-way confidentiality agreement for product diligence meetings.",
    summary: {
      whatItIs: "Mutual non-disclosure agreement for pre-contract information exchange.",
      payments: "No payment obligations",
      term: "36 months confidentiality period",
      renewal: "No renewal",
    },
    findings: [
      "Definition of Confidential Information is broad but standard for cross-border NDAs.",
      "Residual knowledge carve-out is present and favorable.",
      "Disclosure exceptions align with litigation and regulator requests.",
    ],
    redFlags: ["No major red flags identified by current ruleset."],
    keyDates: ["2029-01-18 confidentiality expiry"],
    nextActions: [
      "Confirm governing law alignment with main service agreement.",
      "Capture disclosure channel and notice contact details.",
    ],
  },
  {
    id: "ctr-procurement-zenith",
    title: "Procurement Terms - Zenith",
    status: "ANALYZED",
    createdAt: "Jan 22, 2026",
    risk: "HIGH",
    blurb: "Supplier template with strict liability and short cure windows.",
    summary: {
      whatItIs: "Procurement and delivery terms for infrastructure components.",
      payments: "Net 90 with late-payment penalties",
      term: "12 months with rolling PO addenda",
      renewal: "Manual renewal",
    },
    findings: [
      "Unlimited consequential damages exposure in Section 14.",
      "Automatic assignment rights to parent affiliates without consent.",
      "One-sided audit rights and unilateral delivery rejection language.",
    ],
    redFlags: [
      "Liability framework materially unfavorable compared to market baselines.",
      "Termination for convenience grants no cost recovery for committed inventory.",
    ],
    keyDates: ["2026-02-03 supplier response deadline", "2026-04-01 renewal decision"],
    nextActions: [
      "Insert mutual liability cap tied to annual contract value.",
      "Negotiate minimum 45-day cure period for operational breaches.",
      "Request balanced audit and acceptance provisions.",
    ],
  },
];

const projects = [
  {
    id: "prj-saas-q1",
    title: "SaaS Vendor Review Q1 2026",
    status: "ACTIVE",
    createdAt: "Jan 09, 2026",
    description:
      "Context-aware review of subscriptions, DPAs, and support schedules across core SaaS stack.",
    contractIds: ["ctr-msa-acme", "ctr-nda-orbit"],
    contextDocuments: [
      { title: "GDPR Article 6 Brief", type: "regulation", words: 1840 },
      { title: "Security Addendum 2025", type: "prior_contract", words: 2640 },
      { title: "Data Transfer Memo", type: "legal_text", words: 1210 },
    ],
  },
  {
    id: "prj-procurement-refresh",
    title: "Procurement Refresh 2026",
    status: "ACTIVE",
    createdAt: "Jan 20, 2026",
    description:
      "Renegotiation lane for vendor procurement terms with operational and liability constraints.",
    contractIds: ["ctr-procurement-zenith"],
    contextDocuments: [
      { title: "Model Limitation of Liability", type: "legal_text", words: 980 },
      { title: "Prior Purchase Agreement", type: "prior_contract", words: 3120 },
    ],
  },
  {
    id: "prj-expansion-compliance",
    title: "Regional Expansion Compliance",
    status: "DRAFT",
    createdAt: "Jan 25, 2026",
    description:
      "Early-stage package for cross-border contracting standards and notice-calendar rules.",
    contractIds: [],
    contextDocuments: [{ title: "Market Entry Checklist", type: "other", words: 740 }],
  },
];

let activePanel = "contracts";
let selectedContractId = contracts[0].id;
let selectedProjectId = projects[0].id;

const contractsListEl = document.querySelector("#contractsList");
const projectsListEl = document.querySelector("#projectsList");
const contractDetailEl = document.querySelector("#contractDetail");
const projectDetailEl = document.querySelector("#projectDetail");

function getRiskClass(risk) {
  if (risk === "HIGH") return "risk-high";
  if (risk === "LOW") return "risk-low";
  return "risk-medium";
}

function renderContractsList() {
  if (!contractsListEl) return;

  contractsListEl.innerHTML = contracts
    .map(
      (contract) => `
      <button class="entity-card tilt-card ${selectedContractId === contract.id ? "active" : ""}" data-contract-id="${contract.id}" type="button">
        <p class="entity-meta">${contract.createdAt}</p>
        <h4 class="entity-name">${contract.title}</h4>
        <p class="entity-blurb">${contract.blurb}</p>
        <div class="badge-row">
          <span class="badge status">${contract.status}</span>
          <span class="badge ${getRiskClass(contract.risk)}">${contract.risk} risk</span>
        </div>
      </button>
    `
    )
    .join("");

  contractsListEl.querySelectorAll("[data-contract-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedContractId = button.getAttribute("data-contract-id") || selectedContractId;
      renderContractsList();
      renderContractDetail();
      bindTilt();
    });
  });
}

function renderContractDetail() {
  if (!contractDetailEl) return;

  const contract = contracts.find((item) => item.id === selectedContractId);
  if (!contract) return;

  contractDetailEl.innerHTML = `
    <h3 class="detail-title">${contract.title}</h3>
    <p class="detail-sub">Uploaded ${contract.createdAt} / Status ${contract.status}</p>
    <div class="badge-row">
      <span class="badge ${getRiskClass(contract.risk)}">${contract.risk} risk</span>
      <span class="badge status">analysis ready</span>
    </div>

    <div class="quick-grid">
      <div class="quick-card">
        <p class="quick-label">What It Is</p>
        <p class="quick-value">${contract.summary.whatItIs}</p>
      </div>
      <div class="quick-card">
        <p class="quick-label">Payments</p>
        <p class="quick-value">${contract.summary.payments}</p>
      </div>
      <div class="quick-card">
        <p class="quick-label">Term</p>
        <p class="quick-value">${contract.summary.term}</p>
      </div>
      <div class="quick-card">
        <p class="quick-label">Renewal</p>
        <p class="quick-value">${contract.summary.renewal}</p>
      </div>
    </div>

    <div class="detail-block">
      <h4>Key Findings</h4>
      <ul class="mini-list">
        ${contract.findings.map((point) => `<li>${point}</li>`).join("")}
      </ul>
    </div>

    <div class="detail-block">
      <h4>Red Flags</h4>
      <ul class="mini-list">
        ${contract.redFlags.map((flag) => `<li>${flag}</li>`).join("")}
      </ul>
    </div>

    <div class="detail-block">
      <h4>Key Dates</h4>
      <ul class="mini-list">
        ${contract.keyDates.map((date) => `<li>${date}</li>`).join("")}
      </ul>
    </div>

    <div class="detail-block">
      <h4>Recommended Actions</h4>
      <ul class="mini-list">
        ${contract.nextActions.map((action) => `<li>${action}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderProjectsList() {
  if (!projectsListEl) return;

  projectsListEl.innerHTML = projects
    .map((project) => {
      const contractsCount = project.contractIds.length;
      const contextCount = project.contextDocuments.length;

      return `
      <button class="entity-card tilt-card ${selectedProjectId === project.id ? "active" : ""}" data-project-id="${project.id}" type="button">
        <p class="entity-meta">${project.createdAt}</p>
        <h4 class="entity-name">${project.title}</h4>
        <p class="entity-blurb">${project.description}</p>
        <div class="badge-row">
          <span class="badge status">${project.status}</span>
          <span class="badge status">${contractsCount} contract${contractsCount === 1 ? "" : "s"}</span>
          <span class="badge status">${contextCount} context</span>
        </div>
      </button>
    `;
    })
    .join("");

  projectsListEl.querySelectorAll("[data-project-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedProjectId = button.getAttribute("data-project-id") || selectedProjectId;
      renderProjectsList();
      renderProjectDetail();
      bindTilt();
    });
  });
}

function renderProjectDetail() {
  if (!projectDetailEl) return;

  const project = projects.find((item) => item.id === selectedProjectId);
  if (!project) return;

  const linkedContracts = contracts.filter((contract) => project.contractIds.includes(contract.id));

  projectDetailEl.innerHTML = `
    <h3 class="detail-title">${project.title}</h3>
    <p class="detail-sub">Created ${project.createdAt} / Status ${project.status}</p>

    <div class="detail-block">
      <h4>Project Description</h4>
      <p>${project.description}</p>
    </div>

    <div class="detail-block">
      <h4>Contracts in Scope</h4>
      ${
        linkedContracts.length > 0
          ? `<ul class="mini-list">${linkedContracts
              .map(
                (contract) =>
                  `<li>${contract.title} <span class="badge ${getRiskClass(contract.risk)}">${contract.risk}</span></li>`
              )
              .join("")}</ul>`
          : "<p>No contracts attached yet.</p>"
      }
    </div>

    <div class="detail-block">
      <h4>Context Documents</h4>
      <div class="context-list">
        ${project.contextDocuments
          .map(
            (doc) => `
          <div class="context-row">
            <p>${doc.title}</p>
            <p class="context-type">${doc.type.replace("_", " ")} / ${doc.words.toLocaleString()} words</p>
          </div>
        `
          )
          .join("")}
      </div>
    </div>

    <div class="detail-block">
      <h4>Actions (Preview)</h4>
      <ul class="mini-list">
        <li>Add contract</li>
        <li>Add context document</li>
        <li>Open first contract for analysis</li>
      </ul>
    </div>
  `;
}

function setActivePanel(panelName) {
  activePanel = panelName;

  document.querySelectorAll("[data-panel-target]").forEach((node) => {
    const isActive = node.getAttribute("data-panel-target") === panelName;
    node.classList.toggle("active", isActive);
  });

  document.querySelectorAll("[data-panel]").forEach((panel) => {
    const isActive = panel.getAttribute("data-panel") === panelName;
    panel.classList.toggle("active", isActive);
  });
}

function bindPanelMenus() {
  document.querySelectorAll("[data-panel-target]").forEach((node) => {
    node.addEventListener("click", () => {
      const panelName = node.getAttribute("data-panel-target");
      if (!panelName) return;
      setActivePanel(panelName);
    });
  });

  document.querySelectorAll("[data-open-panel]").forEach((node) => {
    node.addEventListener("click", () => {
      const panelName = node.getAttribute("data-open-panel");
      if (!panelName) return;
      setActivePanel(panelName);
    });
  });
}

function initReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${index * 60}ms`;
    revealObserver.observe(element);
  });
}

function bindTilt() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tiltCards = document.querySelectorAll(".tilt-card");

  if (prefersReducedMotion || "ontouchstart" in window) {
    tiltCards.forEach((card) => {
      card.classList.remove("tilt-card");
    });
    return;
  }

  tiltCards.forEach((card) => {
    if (card.dataset.tiltBound === "true") return;

    const maxTilt = 8;

    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((centerY - y) / centerY) * maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    });

    card.dataset.tiltBound = "true";
  });
}

function init() {
  bindPanelMenus();
  renderContractsList();
  renderContractDetail();
  renderProjectsList();
  renderProjectDetail();
  setActivePanel(activePanel);
  initReveal();
  bindTilt();
}

init();
