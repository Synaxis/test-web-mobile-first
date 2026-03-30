const menuBtn = document.querySelector("#menuBtn");
const nav = document.querySelector("#nav");
const links = document.querySelectorAll("#nav a");
const searchInput = document.querySelector("#searchInput");
const searchStatus = document.querySelector("#searchStatus");
const cards = document.querySelectorAll(".card");
const likeBtns = document.querySelectorAll(".like-btn");
const year = document.querySelector("#year");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.textContent = isOpen ? "✕" : "☰";
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "☰";
    });
  });
}

const filterCards = () => {
  if (!searchInput || !searchStatus) return;

  const term = searchInput.value.trim().toLowerCase();
  let total = 0;

  cards.forEach((card) => {
    const data = (card.dataset.search || "").toLowerCase();
    const show = data.includes(term);
    card.classList.toggle("hide", !show);
    if (show) total += 1;
  });

  searchStatus.textContent = `${total} ${total === 1 ? "post encontrado." : "posts encontrados."}`;
};

if (searchInput) {
  searchInput.addEventListener("input", filterCards);
}

likeBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const countEl = button.querySelector(".like-count");
    if (!countEl) return;

    const isLiked = button.dataset.liked === "true";
    let count = Number(countEl.textContent) || 0;

    if (isLiked) {
      count -= 1;
      button.dataset.liked = "false";
      button.classList.remove("on");
    } else {
      count += 1;
      button.dataset.liked = "true";
      button.classList.add("on");
    }

    countEl.textContent = String(count);
  });
});

if (year) {
  year.textContent = String(new Date().getFullYear());
}
