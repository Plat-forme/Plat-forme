// --- NAVIGATION ENTRE SECTIONS ---

const links = document.querySelectorAll('[data-section]');
const sections = document.querySelectorAll('.section');

function showSection(id) {
  sections.forEach(sec => sec.classList.add('hidden'));
  const target = document.getElementById(id);
  if (target) target.classList.remove('hidden');
}

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.dataset.section;
    showSection(target);
  });
});

// --- PANIER GLOBAL ---

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id, name, price) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  saveCart();
  renderCart();
}

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);
    addToCart(id, name, price);
    alert("Produit ajouté au panier !");
  });
});

function renderCart() {
  const container = document.getElementById('cart-items');
  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name}</span>
      <span>x ${item.quantity}</span>
      <span>${item.price.toFixed(2)} €</span>
      <button class="btn-secondary remove">Retirer</button>
    `;

    div.querySelector(".remove").addEventListener("click", () => {
      cart = cart.filter(i => i.id !== item.id);
      saveCart();
      renderCart();
    });

    container.appendChild(div);
  });

  const totalEl = document.getElementById("cart-total");
  if (totalEl) {
    totalEl.textContent = total.toFixed(2) + " €";
  }
}

renderCart();

// Bouton valider commande
const checkout = document.getElementById("checkout-btn");
if (checkout) {
  checkout.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Votre panier est vide.");
      return;
    }
    alert("Merci pour votre commande (simulation) !");
    cart = [];
    saveCart();
    renderCart();
  });
}

// Bouton vider panier
const clearCartBtn = document.getElementById("clear-cart-btn");
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Votre panier est déjà vide.");
      return;
    }
    if (confirm("Voulez-vous vraiment vider votre panier ?")) {
      cart = [];
      saveCart();
      renderCart();
    }
  });
}

// Afficher accueil au chargement
showSection("accueil");
