const cubeta = document.getElementById("cubeta");
const palomitas = document.getElementById("palomitas");
const pista = document.getElementById("pista");
const capaTarjeta = document.getElementById("capaTarjeta");
const tarjeta = document.getElementById("tarjeta");
const formulario = document.getElementById("formulario");
const correo = document.getElementById("correo");
const clave = document.getElementById("clave");
const errorGeneral = document.getElementById("errorGeneral");
 
const CORREO_OK = "admin@cinecatalogo.com";
const CLAVE_OK = "palomitas123";
 
const pideMenosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hayGsap = window.gsap && !pideMenosMovimiento;

if (sessionStorage.getItem("cine_sesion")) {
  window.location.href = "admin.html";
}
 
function azar(min, max) {
  return Math.random() * (max - min) + min;
}
 

if (hayGsap) {

  gsap.set(cubeta, { transformOrigin: "50% 100%" });
  gsap.from(cubeta, { y: -800, rotation: -12, duration: 1.3, ease: "bounce.out" });
 
  gsap.from(palomitas, { scale: 0, duration: 0.6, delay: 1.1, ease: "back.out(2)" });
 
  gsap.to(cubeta, { rotation: 2.5, duration: 1.3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.4 });
 
  gsap.from(pista, { opacity: 0, y: 10, duration: 0.6, delay: 1.5 });
}

function lanzarPalomita(x, y) {
  const tamano = azar(14, 28) * (cubeta.offsetWidth / 240);
 
  const palomita = document.createElement("div");
  palomita.className = "vuela";
  palomita.style.width = tamano + "px";
  palomita.style.height = tamano + "px";
  palomita.style.left = x + "px";
  palomita.style.top = y + "px";
  document.body.appendChild(palomita);
 
  const haciaLado = azar(-340, 340);   
  const altura = azar(160, 420);       
  const giro = azar(-540, 540);        
 
  gsap.set(palomita, { scale: 0.4 });
  gsap.to(palomita, {
    delay: azar(0, 0.25),
    keyframes: [
      
      { x: haciaLado * 0.55, y: -altura, rotation: giro / 2, scale: 1, duration: 0.7, ease: "power1.out" },
      
      { x: haciaLado, y: window.innerHeight - y + 80, rotation: giro, duration: azar(0.9, 1.5), ease: "power1.in" }
    ],
    onComplete: function () {
      palomita.remove();  
    }
  });
}

let yaAbierta = false;
 
function abrirLogin() {
  if (yaAbierta) return;   
  yaAbierta = true;
  pista.style.display = "none";
 

  if (!hayGsap) {
    cubeta.style.display = "none";
    capaTarjeta.classList.remove("d-none");
    correo.focus();
    return;
  }
 
  const caja = palomitas.getBoundingClientRect();
  const x = caja.left + caja.width / 2;
  const y = caja.top + 20;
 
  gsap.killTweensOf(cubeta);  
 
  
  const linea = gsap.timeline();
  linea
    .to(cubeta, { scaleX: 1.12, scaleY: 0.86, rotation: 0, duration: 0.2 })        
    .add(function () {                                                              
      for (let i = 0; i < 46; i++) lanzarPalomita(x, y);
    })
    .to(cubeta, { scaleX: 0.92, scaleY: 1.15, y: -14, duration: 0.25 })            
    .to(cubeta, { y: "60vh", rotation: 8, opacity: 0, duration: 0.6, ease: "power2.in" }) 
    .add(function () { capaTarjeta.classList.remove("d-none"); }, "-=0.4")          
    .from(tarjeta, { opacity: 0, scale: 0.7, y: 30, duration: 0.65, ease: "back.out(1.7)" }, "<")
    .from(".reveal", { opacity: 0, y: 14, duration: 0.4, stagger: 0.07 }, "-=0.3")   
    .add(function () {
      cubeta.style.display = "none";
      correo.focus();
    });
}

