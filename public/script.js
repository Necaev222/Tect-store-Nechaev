document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const heroText = document.querySelector(".hero-text");

  if (header) {
    header.classList.add("show");
  }

  if (heroText) {
    setTimeout(() => {
      heroText.classList.add("show");
    }, 150);
  }

  const hiddenElements = document.querySelectorAll(
    ".product-card, .info-card, .contact-card, .section-title, .hero-image-box, .product-gallery-card, .product-info-card"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    hiddenElements.forEach((el) => {
      el.classList.add("hidden");
      observer.observe(el);
    });
  }

  const buttons = document.querySelectorAll(".btn, .buy-btn, button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.add("clicked");
      setTimeout(() => button.classList.remove("clicked"), 200);
    });
  });

  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const productCards = document.querySelectorAll(".product-card[data-product-id]");
  productCards.forEach((card) => {
    const productId = card.dataset.productId;

    const openProductPage = () => {
      window.location.href = `product.html?id=${productId}`;
    };

    card.addEventListener("mouseenter", () => card.classList.add("hovered"));
    card.addEventListener("mouseleave", () => card.classList.remove("hovered"));
    card.addEventListener("click", openProductPage);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProductPage();
      }
    });
  });
});
