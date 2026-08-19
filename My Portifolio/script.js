/* =========================================================
   PORTFÓLIO ELOISA — INTERAÇÕES
   - Revela elementos suavemente conforme o usuário rola a página
   - Atualiza o ano do rodapé automaticamente
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Ano automático no rodapé
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Letras flutuantes: separa o texto de .float-text em spans animados ----
  document.querySelectorAll(".float-text").forEach((el) => {
    const chars = [...el.textContent];
    el.textContent = "";
    chars.forEach((ch, i) => {
      const span = document.createElement("span");
      span.className = "letter";
      span.style.setProperty("--i", i);
      span.textContent = ch === " " ? "\u00A0" : ch;
      el.appendChild(span);
    });
  });

  // ---- Papel de parede: brilhinhos dourados subindo pela tela ----
  const sparkleContainer = document.getElementById("sparkles");

  if (sparkleContainer && !prefersReducedMotion) {
    const symbols = ["✦", "✧", "•"];
    const total = 14;

    for (let i = 0; i < total; i++) {
      const el = document.createElement("span");
      el.className = "sparkle";
      el.textContent = symbols[i % symbols.length];
      el.style.left = Math.random() * 100 + "%";
      el.style.fontSize = 10 + Math.random() * 10 + "px";
      el.style.setProperty("--drift", (Math.random() * 60 - 30) + "px");
      el.style.animationDuration = 16 + Math.random() * 16 + "s";
      el.style.animationDelay = -Math.random() * 26 + "s";
      el.style.color = i % 2 === 0 ? "var(--dourado)" : "var(--rosa-deep)";
      sparkleContainer.appendChild(el);
    }
  }

  // ---- Vídeo de exemplo dentro do tablet: clique para tocar/pausar ----
  const videoWrap = document.getElementById("tablet-video-wrap");
  const videoEl = document.getElementById("tablet-video");
  const playIcon = document.getElementById("tablet-play");

  if (videoWrap && videoEl && playIcon) {
    videoWrap.addEventListener("click", () => {
      if (videoEl.paused) {
        videoEl.play();
        playIcon.classList.add("is-hidden");
      } else {
        videoEl.pause();
        playIcon.classList.remove("is-hidden");
      }
    });

    videoEl.addEventListener("ended", () => {
      playIcon.classList.remove("is-hidden");
    });
  }

  const butterfly = document.getElementById("butterfly");

  if (butterfly && !prefersReducedMotion) {
    let ticking = false;

    const updateButterfly = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

      // desenho em "zig-zag" suave conforme a página é rolada
      const leftPercent = 8 + Math.sin(progress * Math.PI * 5) * 7;
      const topPercent = 14 + progress * 62;

      butterfly.style.left = leftPercent + "%";
      butterfly.style.top = topPercent + "%";
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(updateButterfly);
        ticking = true;
      }
    });

    updateButterfly();
  }

  // Animação de entrada suave (fade + slide) ao rolar a página
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // fallback: navegadores muito antigos apenas mostram tudo
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

});