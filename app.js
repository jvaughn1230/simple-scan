function activateNavigation() {
  const sections = document.querySelectorAll("section");
  const sideNavContainer = document.createElement("nav");
  const navItems = Array.from(sections).map((section) => {
    return `
    <div class='sidenav-item' data-for-section='${section.id}'>
        <a href='#${section.id}' class='sidenav-link'></a>
        <span class='sidenav-label'>${
          section.dataset.label[0].toUpperCase() +
          section.dataset.label.slice(1)
        }</span>
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

function newDate() {
  return new Date().getFullYear();
}

document.getElementById("year").innerHTML = newDate();

// Mobile Menu
const hamburger = document.querySelector(".hamburger");
const topNavMenu = document.querySelector(".topnav__links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  topNavMenu.classList.toggle("active");
});

document.querySelectorAll(".topnav__link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    topNavMenu.classList.remove("active");
  })
);

// jquery smooth scrolling to ensure smooth scrolling for all browsers
$(document).ready(function () {
  $(".sidenav-link").click(function (e) {
    e.preventDefault();
    let target = $($(this).attr("href"));
    if (target.length) {
      let scrollTo = target.offset().top;
      $("body, html").animate({ scrollTop: scrollTo + "px" }, 500);
    }
  });
});
