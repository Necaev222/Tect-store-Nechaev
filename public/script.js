document.addEventListener("DOMContentLoaded", () => {
  // Плавное появление элементов при загрузке
  const heroContent = document.querySelector(".hero-content");
  const header = document.querySelector("header");

  if (header) {
    header.classList.add("show");
  }

  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add("show");
    }, 200);
  }

  // Появление элементов при скролле
  const hiddenElements = document.querySelectorAll(
    ".product-card, .category-card, .contact-card, .section-title, .about-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  hiddenElements.forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
  });

  // Анимация кнопок при клике
  const buttons = document.querySelectorAll(".btn, .buy-btn, button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.add("clicked");

      setTimeout(() => {
        button.classList.remove("clicked");
      }, 200);
    });
  });

  // Плавная прокрутка по якорям
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");

      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // Подсветка карточки товара при наведении мышки через JS
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("hovered");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("hovered");
    });
  });
});