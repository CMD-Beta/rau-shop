const productsEl = document.getElementById("products");
const currencySelect = document.getElementById("currency");

let products = [];

/* Курсы валют (можно потом заменить на API) */
const rates = {
  AZN: 1,
  RUB: 57,   // 1 AZN ≈ 57 RUB
  USD: 0.59, // 1 AZN ≈ 0.59 USD
  EUR: 0.54  // 1 AZN ≈ 0.54 EUR
};

const symbols = {
  AZN: "₼",
  RUB: "₽",
  USD: "$",
  EUR: "€"
};

/* Надбавка */
const MARKUP_AZN = 1;

/* Загрузка товаров */
fetch("data/products.json")
  .then(r => r.json())
  .then(data => {
    products = data;
    render();
  });

currencySelect.addEventListener("change", render);

function convert(priceAZN, currency) {
  const withMarkup = priceAZN + MARKUP_AZN;
  return (withMarkup * rates[currency]).toFixed(2);
}

function render() {
  const cur = currencySelect.value;
  productsEl.innerHTML = "";

  products.forEach(p => {
    productsEl.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="price">
          ${convert(p.priceAZN, cur)} ${symbols[cur]}
        </div>
      </div>
    `;
  });
}
