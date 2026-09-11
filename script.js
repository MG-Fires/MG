const menu=document.getElementById("menu"),nav=document.getElementById("nav");
menu.addEventListener("click",()=>{nav.classList.toggle("open");});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".section,.card,.photo-feature,.memory-strip").forEach(e=>{e.style.transition="opacity .7s ease, transform .7s ease";e.style.opacity="0";e.style.transform="translateY(18px)";reveal.observe(e)});
const style=document.createElement("style");style.textContent=".visible{opacity:1!important;transform:none!important}";document.head.appendChild(style);

