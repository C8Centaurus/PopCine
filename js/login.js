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