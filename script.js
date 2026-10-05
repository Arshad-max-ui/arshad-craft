/*
  ARSHAD CRAFT — EDIT THESE TWO VALUES BEFORE PUBLISHING
  1) WHATSAPP_NUMBER: your WhatsApp number in international format, without + or spaces.
  2) CURRENCY can stay as ₹.
*/
const WHATSAPP_NUMBER = "91XXXXXXXXXX";
const CURRENCY = "₹";

const products = [
  {id:1,name:"Customized Name Pen",category:"custom",price:299,icon:"✒️",description:"Personalized name pen for gifts and everyday use."},
  {id:2,name:"Name Locket",category:"custom",price:399,icon:"💍",description:"Elegant personalized locket with your chosen name."},
  {id:3,name:"Custom Seal / Stamp",category:"custom",price:349,icon:"🏷️",description:"Customized stamp for personal, study or business use."},
  {id:4,name:"Customized Gift Item",category:"custom",price:499,icon:"🎁",description:"A thoughtful personalized gift for someone special."},
  {id:5,name:"Islamic Book",category:"islamic",price:199,icon:"📖",description:"Useful Islamic reading and study material."},
  {id:6,name:"Qur'an Study Book",category:"islamic",price:249,icon:"📚",description:"Selected Qur'an-related study material."},
  {id:7,name:"Premium Cap",category:"fashion",price:299,icon:"🧢",description:"Comfortable cap suitable for everyday wear."},
  {id:8,name:"Quality Fabric",category:"fashion",price:599,icon:"🧵",description:"Selected fabric pieces for traditional and everyday use."},
  {id:9,name:"Attar / Perfume",category:"fragrance",price:299,icon:"🌿",description:"Pleasant fragrance for everyday and special occasions."},
  {id:10,name:"Imama / Pagri",category:"fashion",price:499,icon:"🧕",description:"Traditional headwear selected with care."}
];

let cart = JSON.parse(localStorage.getItem("arshadCraftCart") || "[]");

const money = n => CURRENCY + Number(n).toLocaleString("en-IN");

function renderProducts(category="all"){
  const grid = document.getElementById("productGrid");
  const list = category === "all" ? products : products.filter(p=>p.category===category);
  grid.innerHTML = list.map(p=>`
    <article class="product-card">
      <div class="product-image">${p.icon}</div>
      <div class="product-info">
        <span class="tag">${p.category}</span>
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="product-bottom">
          <span class="price">${money(p.price)}</span>
          <button class="add" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    </article>`).join("");
}

function addToCart(id){
  const existing = cart.find(x=>x.id===id);
  if(existing) existing.qty++;
  else cart.push({id,qty:1});
  saveCart();
  openCart();
}

function saveCart(){
  localStorage.setItem("arshadCraftCart", JSON.stringify(cart));
  renderCart();
}

function renderCart(){
  const box = document.getElementById("cartItems");
  const count = cart.reduce((s,x)=>s+x.qty,0);
  document.getElementById("cartCount").textContent = count;
  if(!cart.length){
    box.innerHTML = `<div class="empty">Your cart is empty.<br>Add something you like! 🛍️</div>`;
    document.getElementById("cartTotal").textContent = money(0);
    return;
  }
  let total=0;
  box.innerHTML = cart.map(item=>{
    const p=products.find(x=>x.id===item.id);
    const subtotal=p.price*item.qty; total+=subtotal;
    return `<div class="cart-row">
      <div class="cart-thumb">${p.icon}</div>
      <div><h4>${p.name}</h4><small>${money(p.price)} each</small>
        <div class="qty">
          <button onclick="changeQty(${p.id},-1)">−</button><span>${item.qty}</span><button onclick="changeQty(${p.id},1)">+</button>
        </div>
      </div>
      <strong>${money(subtotal)}</strong>
    </div>`;
  }).join("");
  document.getElementById("cartTotal").textContent=money(total);
}

function changeQty(id,delta){
  const item=cart.find(x=>x.id===id); if(!item)return;
  item.qty+=delta; if(item.qty<=0) cart=cart.filter(x=>x.id!==id);
  saveCart();
}

function openCart(){
  document.getElementById("cartPanel").classList.add("open");
  document.getElementById("overlay").classList.add("open");
}
function closeCart(){
  document.getElementById("cartPanel").classList.remove("open");
  document.getElementById("overlay").classList.remove("open");
}

function orderOnWhatsApp(){
  if(!cart.length){alert("Your cart is empty.");return;}
  if(WHATSAPP_NUMBER.includes("X")){
    alert("Please add your WhatsApp number in script.js first.");
    return;
  }
  let total=0;
  let lines=["Assalamu Alaikum, I want to place an order from Arshad Craft:",""];
  cart.forEach(item=>{
    const p=products.find(x=>x.id===item.id);
    const sub=p.price*item.qty; total+=sub;
    lines.push(`• ${p.name} × ${item.qty} — ${money(sub)}`);
  });
  lines.push("",`Estimated product total: ${money(total)}`,"","Please confirm availability, delivery charges and final total.");
  const url=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url,"_blank");
}

document.getElementById("cartBtn").onclick=openCart;
document.getElementById("ctaCartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("overlay").onclick=closeCart;
document.getElementById("orderBtn").onclick=orderOnWhatsApp;
document.getElementById("menuBtn").onclick=()=>document.getElementById("navLinks").classList.toggle("open");

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active"); renderProducts(btn.dataset.category);
  });
});
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts(); renderCart();
