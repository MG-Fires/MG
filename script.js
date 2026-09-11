const hamburger=document.getElementById("hamburger");
const nav=document.getElementById("nav");
hamburger?.addEventListener("click",()=>nav.classList.toggle("open"));
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();

const io=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("show");io.unobserve(entry.target)}
  });
},{threshold:.12});
document.querySelectorAll(".section,.event-card,.album-card").forEach(el=>io.observe(el));
