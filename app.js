function activateNavigation() {
  const sections = document.querySelectorAll("section");
  const sideNavContainer = document.createElement("nav");
  const navItems = Array.from(sections).map((section) => {
    return `
    <div class='sidenav-item' data-for-section='${section.id}'>
        <a href='#${section.id}' class='sidenav-link'></a>
        <span class='sidenav-label'>${section.dataset.label}</span>
    </div>
    `;
  });

  sideNavContainer.classList.add("sidenav");
  sideNavContainer.innerHTML = navItems.join("");

  const observer = new IntersectionObserver(
    (entries) => {
      document.querySelectorAll(".sidenav-link").forEach((sidenavLink) => {
        sidenavLink.classList.remove("sidenav-link-selected");
      });

      const visibleSection = entries.filter((entry) => entry.isIntersecting)[0];

      document
        .querySelector(
          `.sidenav-item[data-for-section="${visibleSection.target.id}"] .sidenav-link`
        )
        .classList.add("sidenav-link-selected");
    },
    {
      threshold: 0.5,
    }
  );

  sections.forEach((section) => observer.observe(section));

  document.body.appendChild(sideNavContainer);
}

activateNavigation();
