const header = document.querySelector(".top");
const onScroll = () => {
  if (!header) return;
  header.classList.toggle("is-solid", window.scrollY > 24);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".rail-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    const label = toggle.querySelector(".visually-hidden");
    if (label) label.textContent = open ? "Fechar menu" : "Abrir menu";
  });

  nav.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    const label = toggle.querySelector(".visually-hidden");
    if (label) label.textContent = "Abrir menu";
  });
}

const form = document.querySelector("#form-contato");
const status = document.querySelector("#form-status");

const rises = document.querySelectorAll("[data-rise]");
if (rises.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );
  rises.forEach((el) => {
    const delay = el.getAttribute("data-delay");
    if (delay) el.style.transitionDelay = delay + "ms";
    io.observe(el);
  });
} else {
  rises.forEach((el) => el.classList.add("in"));
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const nome = String(data.get("nome") || "").trim();
    const telefone = String(data.get("telefone") || "").trim();
    const cidade = String(data.get("cidade") || "").trim();
    const uso = String(data.get("uso") || "").trim();
    const mensagem = String(data.get("mensagem") || "").trim();

    const texto = [
      "Olá, Yara. Vim pelo site da ya • arquitetura.",
      `Nome: ${nome}`,
      `Telefone: ${telefone}`,
      `Cidade: ${cidade}`,
      `Uso: ${uso}`,
      mensagem ? `Detalhes: ${mensagem}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    if (status) status.textContent = "Abrindo o WhatsApp com a sua mensagem.";
    window.open(
      `https://wa.me/5534999596906?text=${encodeURIComponent(texto)}`,
      "_blank",
      "noopener"
    );
  });
}
