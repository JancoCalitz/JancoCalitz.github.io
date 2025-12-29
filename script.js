const weddingDate = new Date("August 1, 2026 15:00:00").getTime();
const countdown = document.getElementById("countdown");

setInterval(() => {
  const now = new Date().getTime();
  const diff = weddingDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  countdown.innerHTML = `
    <strong>${days}</strong> days
    <strong>${hours}</strong> hours
    <strong>${minutes}</strong> minutes
  `;
}, 1000);

/* ===== Rotating gallery (3 tiles) =====
   - Each tile rotates through its own list
   - 10 seconds per image
   - Soft cross-fade via CSS class
*/
const ROTATE_EVERY_MS = 8000;
const FADE_MS = 800; // must match CSS transition (0.8s)

const galleries = [
  {
    el: document.getElementById("gallery1"),
    images: ["block1.JPG", "1block2.JPG", "1block3.JPG", "1block4.JPG"]
  },
  {
    el: document.getElementById("gallery2"),
    images: ["2block1.JPG", "2block2.JPG", "2block3.JPG"]
  },
  {
    el: document.getElementById("gallery3"),
    images: ["3block3.1.JPG", "3block2.JPG", "3block3.JPG"]
  }
];

// Start each tile at index 0 (as in your HTML)
const indices = galleries.map(() => 0);

function swapImageWithFade(imgEl, nextSrc) {
  if (!imgEl) return;

  // Fade out
  imgEl.classList.add("is-fading");

  // After fade-out, swap src, then fade in
  setTimeout(() => {
    imgEl.src = nextSrc;

    // If the image fails to load, remove fade anyway
    imgEl.onload = () => {
      imgEl.classList.remove("is-fading");
      imgEl.onload = null;
    };

    imgEl.onerror = () => {
      imgEl.classList.remove("is-fading");
      imgEl.onerror = null;
    };

    // Fallback: ensure it fades back even if load event does not fire
    setTimeout(() => imgEl.classList.remove("is-fading"), 1200);
  }, FADE_MS);
}

setInterval(() => {
  galleries.forEach((g, i) => {
    if (!g.el || !g.images || g.images.length < 2) return;

    indices[i] = (indices[i] + 1) % g.images.length;
    const nextSrc = g.images[indices[i]];
    swapImageWithFade(g.el, nextSrc);
  });
}, ROTATE_EVERY_MS);
