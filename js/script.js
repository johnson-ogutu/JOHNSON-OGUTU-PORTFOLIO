document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const themeToggle = document.getElementById("themeToggle");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") document.documentElement.setAttribute("data-theme", "dark");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      document.documentElement.toggleAttribute("data-theme", !dark);
      if (!dark) document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("portfolio-theme", dark ? "light" : "dark");
    });
  }

  document.querySelectorAll("[data-placeholder]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      alert(link.dataset.placeholder);
    });
  });

  // Project filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      projectItems.forEach(item => {
        item.style.display = filter === "all" || item.dataset.category === filter ? "" : "none";
      });
    });
  });

  // Project detail modal
  const modal = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalTitle");
  const modalType = document.getElementById("modalType");
  const modalContent = document.getElementById("modalContent");

  const projectData = {
    poultry: {
      type: "Software Project",
      title: "Poultry Management System",
      html: `<p><strong>Category:</strong> Software / database project</p>
             <p><strong>Objective:</strong> Develop a practical poultry management system as a KNEC project.</p>
             <p><strong>Technology:</strong> Visual Basic 6.0 and database concepts.</p>
             <p><strong>Evidence to add later:</strong> screenshots, project documentation and repository/demo link where available.</p>`
    },
    biometric: {
      type: "Data & Analytics",
      title: "Biometric Attendance Data Analysis",
      html: `<p><strong>Category:</strong> Data cleaning, transformation and business intelligence.</p>
             <p><strong>Workflow:</strong> Prepare attendance data, handle nulls, separate date/time fields, transform the data and build Power BI reporting.</p>
             <p><strong>Tools:</strong> Power Query, Power BI and Excel.</p>
             <p><strong>Privacy:</strong> No confidential attendance records are published in this portfolio.</p>`
    },
    network: {
      type: "Infrastructure",
      title: "Institutional ICT & Network Work",
      html: `<p><strong>Category:</strong> ICT infrastructure and support.</p>
             <p><strong>Scope:</strong> Networking, hardware, operating systems, printers, user accounts, shared folders, CCTV and general ICT operations.</p>
             <p><strong>Technologies:</strong> TCP/IP, DHCP, DNS, MikroTik, switches and access points.</p>
             <p><strong>Privacy:</strong> Internal IPs, credentials, security configurations and confidential institutional information are excluded.</p>`
    },
    python: {
      type: "Data Science",
      title: "Voice Gender Classification System",
      html: `<p><strong>Category:</strong> Machine-learning classification project.</p>
             <p><strong>Technology:</strong> Python.</p>
             <p><strong>Methods:</strong> Logistic Regression and Random Forest.</p>
             <p><strong>Evidence to add later:</strong> selected notebook/screenshots and repository link where available.</p>`
    },
    books: {
      type: "Data Science",
      title: "Book Recommendation System",
      html: `<p><strong>Category:</strong> Recommendation-system project.</p>
             <p><strong>Focus:</strong> Applying data and machine-learning concepts to book recommendations.</p>
             <p><strong>Evidence to add later:</strong> screenshots, notebook and repository link where available.</p>`
    }
  };

  document.querySelectorAll(".details-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const data = projectData[btn.dataset.project];
      if (!data || !modal) return;
      modalType.textContent = data.type;
      modalTitle.textContent = data.title;
      modalContent.innerHTML = data.html;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modal) modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
});
