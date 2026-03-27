const products = [
    { id:1, name:"Hammer", price:250, category:"tools" },
    { id:2, name:"Drill Machine", price:2500, category:"tools" },
    { id:3, name:"PVC Pipe", price:150, category:"plumbing" },
    { id:4, name:"Water Tap", price:300, category:"plumbing" },
    { id:5, name:"Wire", price:200, category:"others" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts(list) {
    let html = "";
    list.forEach(p => {
        html += `
        <div class="card">
            <h4>${p.name}</h4>
            <p>₹${p.price}</p>
            <button onclick="addToCart(${p.id})">Add</button>
        </div>`;
    });
    document.getElementById("products").innerHTML = html;
}

function addToCart(id) {
    let item = cart.find(p => p.id === id);
    if(item) item.qty++;
    else {
        let product = products.find(p => p.id === id);
        cart.push({...product, qty:1});
    }
    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    let html = "";
    let total = 0;

    cart.forEach(p => {
        total += p.price * p.qty;
        html += `
        <div>
            ${p.name} (${p.qty})
            <button onclick="changeQty(${p.id},1)">+</button>
            <button onclick="changeQty(${p.id},-1)">-</button>
        </div>`;
    });

    document.getElementById("cart-items").innerHTML = html;
    document.getElementById("total").innerText = "Total: ₹" + total;
}

function changeQty(id, change) {
    let item = cart.find(p => p.id === id);
    item.qty += change;
    if(item.qty <= 0) cart = cart.filter(p => p.id !== id);
    saveCart();
}

function filterCategory(cat) {
    if(cat === "all") displayProducts(products);
    else displayProducts(products.filter(p => p.category === cat));
}

function searchProduct() {
    let val = document.getElementById("search").value.toLowerCase();
    let filtered = products.filter(p => p.name.toLowerCase().includes(val));
    displayProducts(filtered);
}

function orderWhatsApp() {
    let msg = "Order:%0A";
    cart.forEach(p => {
        msg += `${p.name} x${p.qty} = ₹${p.price*p.qty}%0A`;
    });

    window.open(`https://wa.me/919348521404?text=${msg}`);
}

displayProducts(products);
updateCart();