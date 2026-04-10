document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = window.PRODUCTS?.[productId];

  const title = document.getElementById("product-title");
  const breadcrumbName = document.getElementById("product-breadcrumb-name");
  const shortDescription = document.getElementById("product-short-description");
  const detail = document.getElementById("product-detail");

  if (!product) {
    document.title = "TechStore — Товар не найден";
    title.textContent = "Товар не найден";
    breadcrumbName.textContent = "Ошибка";
    shortDescription.textContent = "Похоже, ссылка на товар неверная или такого товара пока нет в каталоге.";
    detail.innerHTML = `
      <article class="product-info-card">
        <p>Вернитесь в каталог и выберите другой товар.</p>
        <a class="btn btn-primary" href="catalog.html">Назад в каталог</a>
      </article>
    `;
    return;
  }

  document.title = `TechStore — ${product.name}`;
  title.textContent = product.name;
  breadcrumbName.textContent = product.name;
  shortDescription.textContent = product.shortDescription;

  const specsHtml = product.specs
    .map(([label, value]) => `
      <div class="spec-row">
        <span class="spec-label">${label}</span>
        <span class="spec-value">${value}</span>
      </div>
    `)
    .join("");

  detail.innerHTML = `
    <div class="product-gallery-card">
      <img src="${product.image}" alt="${product.name}" class="product-detail-image">
    </div>

    <article class="product-info-card">
      <p class="product-detail-price">${product.price}</p>
      <p class="product-detail-description">${product.description}</p>

      <div class="product-actions">
        <a class="btn btn-primary" href="contacts.html">Заказать</a>
        <a class="btn btn-secondary" href="catalog.html">Назад в каталог</a>
      </div>

      <section class="specs-box">
        <h2>Характеристики</h2>
        <div class="specs-list">${specsHtml}</div>
      </section>
    </article>
  `;
});
