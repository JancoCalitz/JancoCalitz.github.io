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
