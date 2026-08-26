// ==========================================
// MUSIC HUB - USER SESSION
// ==========================================

window.addEventListener("DOMContentLoaded", () => {

    const loginLink = document.getElementById("login-link");
    const currentUser = localStorage.getItem("currentUser");

    if (loginLink) {

        if (currentUser) {

            loginLink.innerHTML = `👋 ${currentUser} | Logout`;
            loginLink.href = "#";
            loginLink.onclick = logout;

        } else {

            loginLink.innerHTML = "Login";
            loginLink.href = "login.html";

        }

    }

    displayCart();

});

// Logout
function logout() {

    localStorage.removeItem("currentUser");

    alert("Logged Out Successfully");

    window.location.href = "login.html";

}


// ==========================================
// MUSIC HUB - CART SYSTEM
// ==========================================

let cart = JSON.parse(localStorage.getItem("musicCart")) || [];


// Save Cart
function saveCart() {
    localStorage.setItem("musicCart", JSON.stringify(cart));
}


// Add To Cart
function addToCart(button) {

    const card = button.closest(".product-card");

    const name = card.querySelector("h3").textContent;

const price = parseInt(
    card.querySelector(".price").textContent.replace(/[₹,]/g, "")
);
    const existing = cart.find(item => item.name === name);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            id: Date.now(),
            name,
            price,
            quantity: 1
        });

    }

    saveCart();

    alert(name + " added to cart!");

}


// Increase Quantity
function increase(id) {

    const item = cart.find(x => x.id === id);

    if (!item) return;

    item.quantity++;

    saveCart();

    displayCart();

}


// Decrease Quantity
function decrease(id) {

    const item = cart.find(x => x.id === id);

    if (!item) return;

    if (item.quantity > 1) {

        item.quantity--;

    } else {

        removeItem(id);
        return;

    }

    saveCart();

    displayCart();

}


// Remove Item
function removeItem(id) {

    cart = cart.filter(x => x.id !== id);

    saveCart();

    displayCart();

}

function displayCart(){

    const container = document.getElementById("cart-container");

    if(!container) return;

    container.innerHTML="";

    let total = 0;

    cart.forEach(item=>{

        total += item.price * item.quantity;

        container.innerHTML += `
        <div class="product-card">

            <div class="emoji">🎵</div>

            <h3>${item.name}</h3>

            <p class="price">₹${item.price}</p>

            <div class="quantity">

                <button onclick="decrease(${item.id})">-</button>

                <strong>${item.quantity}</strong>

                <button onclick="increase(${item.id})">+</button>

            </div>

            <p><strong>Subtotal:</strong> ₹${item.price * item.quantity}</p>

            <button onclick="removeItem(${item.id})">Remove</button>

        </div>`;
    });

    const totalElement = document.getElementById("cart-total");

    if(totalElement){
        totalElement.textContent = total;
    }

    // NEW: Save total for checkout
    localStorage.setItem("checkoutTotal", total);
}
// ===========================
// PRODUCT SEARCH
// ===========================

function searchProducts() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;

    const filter = input.value.toLowerCase();

    const products =
        document.querySelectorAll(".search-item");

    products.forEach(card => {

        const name =
            card.querySelector("h3").textContent.toLowerCase();

        if (name.includes(filter)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}
// =======================
// PRODUCT DETAILS
// =======================

const products = {

guitar:{
name:"Acoustic Guitar",
price:5999,
rating:"⭐⭐⭐⭐☆ (4.5)",
image:"images/guitar.jpg",
desc:"A premium acoustic guitar with rich sound, ideal for beginners and professionals."
},

keyboard:{
name:"Digital Keyboard",
price:8499,
rating:"⭐⭐⭐⭐⭐ (4.8)",
image:"images/keyboard.jpg",
desc:"61-key digital keyboard with multiple tones and recording support."
},

microphone:{
name:"Studio Microphone",
price:3999,
rating:"⭐⭐⭐⭐☆ (4.4)",
image:"images/microphone.jpg",
desc:"Professional condenser microphone for studio recording and podcasts."
},

headphones:{
name:"Studio Headphones",
price:2499,
rating:"⭐⭐⭐⭐⭐ (4.9)",
image:"images/headphones.jpg",
desc:"Noise-isolating studio headphones with high-quality audio output."
},

drums:{
name:"Drum Set",
price:15999,
rating:"⭐⭐⭐⭐☆ (4.6)",
image:"images/drums.jpg",
desc:"Complete drum kit suitable for live performance and practice."
},

violin:{
name:"Violin",
price:6999,
rating:"⭐⭐⭐⭐☆ (4.3)",
image:"images/violin.jpg",
desc:"Elegant wooden violin with excellent tone and carrying case."
}

};

function openProduct(id){

localStorage.setItem("selectedProduct",id);

window.location.href="product.html";

}

window.addEventListener("DOMContentLoaded",()=>{

const id=localStorage.getItem("selectedProduct");

if(!id || !products[id]) return;

const p=products[id];

if(document.getElementById("productName")){

productName.textContent=p.name;
productPrice.textContent="₹"+p.price.toLocaleString();
productRating.textContent=p.rating;
productImage.src=p.image;
productDesc.textContent=p.desc;

addBtn.onclick=()=>{

const existing=cart.find(x=>x.name===p.name);

if(existing){
existing.quantity++;
}else{
cart.push({
id:Date.now(),
name:p.name,
price:p.price,
quantity:1
});
}

saveCart();

alert("Added to Cart");

};

}

});
// =======================
// WISHLIST
// =======================

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function toggleWishlist(id){

    if(wishlist.includes(id)){
        wishlist = wishlist.filter(x => x !== id);
    }else{
        wishlist.push(id);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    alert("Wishlist Updated ❤️");
}
// ==========================
// LOAD WISHLIST PAGE
// ==========================

function loadWishlist(){

    const container = document.getElementById("wishlistContainer");

    if(!container) return;

    container.innerHTML="";

    wishlist.forEach(id=>{

        const p = productData[id];

        if(!p) return;

        container.innerHTML += `
        <div class="product-card">

            <img src="${p.image}" class="product-img">

            <h3>${p.name}</h3>

            <div class="rating">${p.rating}</div>

            <p class="price">₹${p.price.toLocaleString()}</p>

            <button onclick="openProduct('${id}')">
                View Product
            </button>

        </div>`;
    });

    if(wishlist.length===0){

        container.innerHTML = `
        <h2 style="text-align:center;width:100%;">
            No favourite products yet ❤️
        </h2>`;

    }

}

window.addEventListener("DOMContentLoaded", loadWishlist);
// =======================
// CATEGORY FILTER
// =======================

window.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const cat = params.get("cat");

    if(!cat) return;

    const cards = document.querySelectorAll(".search-item");

    cards.forEach(card=>{

        const name = card.querySelector("h3").textContent.toLowerCase();

        let show = false;

        if(cat==="string"){
            show = name.includes("guitar") || name.includes("violin");
        }
        else if(cat==="keyboard"){
            show = name.includes("keyboard");
        }
        else if(cat==="studio"){
            show = name.includes("microphone") || name.includes("headphones");
        }
        else if(cat==="drums"){
            show = name.includes("drum");
        }

        card.style.display = show ? "block" : "none";

    });

});