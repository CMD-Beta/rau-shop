const productsEl = document.getElementById("products");
const currencySelect = document.getElementById("currency");

let products = [];

const rates = {
  AZN: 1,
  RUB: 57,
  USD: 0.59,
  EUR: 0.54,
};

const symbols = {
  AZN: "₼",
  RUB: "₽",
  USD: "$",
  EUR: "€",
};

const MARKUP_AZN = 1;

fetch("products.json")
  .then((r) => r.json())
  .then((data) => {
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

  products.forEach((p) => {
    productsEl.innerHTML += `
      <div class="card">
        <img src="${p.image}" alt="${p.title}" />
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="price">${convert(p.priceAZN, cur)} ${symbols[cur]}</div>
      </div>
    `;
  });
}
