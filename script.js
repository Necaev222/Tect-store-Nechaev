const tabs = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', e => {
        e.preventDefault();
        const target = tab.dataset.tab;

        tabContents.forEach(tc => tc.classList.remove('active'));
        document.getElementById(target).classList.add('active');
    });
});

const products = [
    {id:1, name:"iPhone 14", price:900, img:"https://via.placeholder.com/150"},
    {id:2, name:"MacBook Pro", price:2000, img:"https://via.placeholder.com/150"},
    {id:3, name:"Gaming PC", price:1500, img:"https://via.placeholder.com/150"},
    {id:4, name:"Microwave Oven", price:200, img:"https://via.placeholder.com/150"},
    {id:5, name:"Samsung Galaxy S23", price:850, img:"https://via.placeholder.com/150"},
];

const productList = document.getElementById('product-list');
let cart = [];

function renderProducts(list) {
    productList.innerHTML = '';
    list.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Цена: $${product.price}</p>
            <button onclick="addToCart(${product.id}, this)">Добавить в корзину</button>
        `;
        productList.appendChild(div);
    });
}

function addToCart(id, btn) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;

    cartCount.classList.add('cart-count-anim');
    setTimeout(() => cartCount.classList.remove('cart-count-anim'), 300);

    btn.style.background = '#00ff7f';
    setTimeout(() => btn.style.background = 'linear-gradient(45deg, #1e90ff, #00bfff)', 300);

    alert(`${product.name} добавлен в корзину!`);
}

document.getElementById('filter-btn').addEventListener('click', () => {
    const search = document.getElementById('search').value.toLowerCase();
    const min = parseFloat(document.getElementById('min-price').value) || 0;
    const max = parseFloat(document.getElementById('max-price').value) || Infinity;

    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(search) && p.price >= min && p.price <= max
    );

    renderProducts(filtered);
});

renderProducts(products);