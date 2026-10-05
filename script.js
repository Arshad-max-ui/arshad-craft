const photos = [
  ['Picsart_26-10-06_03-35-52-723.jpg','Premium Gift Pen Set 01','gift'],
  ['Picsart_26-10-06_03-36-12-346.jpg','Classic Pen Collection 02','pen'],
  ['Picsart_26-10-06_03-37-03-055.jpg','Custom Keychain Set 03','keychain'],
  ['Picsart_26-10-06_03-37-18-620.jpg','Name Keychain Gift Set 04','keychain'],
  ['Picsart_26-10-06_03-37-35-366.jpg','Elegant Pen Set 05','pen'],
  ['Picsart_26-10-06_03-37-49-373.jpg','Premium Pen 06','pen'],
  ['Picsart_26-10-06_03-38-02-297.jpg','Red Pen Gift Pack 07','gift'],
  ['Picsart_26-10-06_03-38-20-460.jpg','Metal Pen 08','pen'],
  ['Picsart_26-10-06_03-38-35-229.jpg','Signature Pen Set 09','pen'],
  ['Picsart_26-10-06_03-38-54-012.jpg','Classic Black Pen Pair 10','pen'],
  ['Picsart_26-10-06_03-39-07-387.jpg','Premium Keychain Gift 11','keychain'],
  ['Picsart_26-10-06_03-39-24-508.jpg','Assorted Pen Collection 12','gift'],
  ['Picsart_26-10-06_03-39-46-176.jpg','Red Premium Pen Pair 13','pen'],
  ['Picsart_26-10-06_03-40-00-897.jpg','Signature Pen Set 14','pen'],
  ['Picsart_26-10-06_03-40-14-785.jpg','Classic Pen Box 15','gift'],
  ['Picsart_26-10-06_03-40-30-515.jpg','Decorative Pen Set 16','pen'],
  ['Picsart_26-10-06_03-40-43-632.jpg','Premium Keychain Set 17','keychain'],
  ['Picsart_26-10-06_03-41-02-825.jpg','Golden Pen Pair 18','pen'],
  ['Picsart_26-10-06_03-41-17-989.jpg','Blue Pen Collection 19','pen'],
  ['Picsart_26-10-06_03-41-33-013.jpg','Classic Golden Pen Pair 20','pen'],
  ['Picsart_26-10-06_03-41-52-222.jpg','Premium Keychain Gift 21','keychain'],
  ['Picsart_26-10-06_03-42-06-507.jpg','Red Decorative Pen Set 22','pen'],
  ['Picsart_26-10-06_03-42-24-615.jpg','Blue & Black Pen Pair 23','pen'],
  ['Picsart_26-10-06_03-42-39-423.jpg','Premium Multi-Pen Set 24','gift']
];
const grid=document.getElementById('productGrid');
function card(p,i){const [file,name,type]=p;const label=type==='gift'?'Gift Set':type==='keychain'?'Keychain':'Pen';const msg=`Hello Arshad Craft, I want to know the current price and availability of ${name}. Product photo: ${file}`;return `<article class="card" data-type="${type}"><div class="photo"><img src="products/${file}" alt="${name}" loading="lazy"></div><div class="card-body"><span class="tag">${label}</span><h3>${name}</h3><p>Current price & availability on WhatsApp.</p><a class="order" href="https://wa.me/916901914922?text=${encodeURIComponent(msg)}" target="_blank">Ask / Order on WhatsApp ↗</a></div></article>`}
function render(filter='all'){grid.innerHTML=photos.filter(p=>filter==='all'||p[2]===filter).map(card).join('')}
document.querySelectorAll('#filters button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('#filters button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');render(btn.dataset.filter)}));
document.getElementById('year').textContent=new Date().getFullYear();
const float=document.createElement('a');float.className='wa-float';float.href='https://wa.me/916901914922?text=Hello%20Arshad%20Craft%2C%20I%20need%20help%20with%20an%20order.';float.target='_blank';float.textContent='WhatsApp ↗';document.body.appendChild(float);


// Smooth reveal animations — lightweight and mobile friendly.
const revealTargets = document.querySelectorAll('.section, .strip, .founder-card, .steps > div, .cta');
revealTargets.forEach(el => el.classList.add('reveal'));
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
},{threshold:0.12});
revealTargets.forEach(el => observer.observe(el));

// Re-apply reveal to product cards whenever filters change.
const originalRender = render;
render = function(filter='all'){
  originalRender(filter);
  document.querySelectorAll('.card').forEach(cardEl => {
    cardEl.classList.add('reveal');
    requestAnimationFrame(() => cardEl.classList.add('visible'));
  });
};
render();
