/* =========================================
   PHOTO OVERLAY
========================================= */

window.openPhotoOverlay = function () {
  const root = document.getElementById("overlay-root");
  if (!root) return;

  root.innerHTML = `
    <div class="photo-overlay" id="photoOverlay">
      <img src="overlays/photo/photo.png" alt="">
    </div>
  `;

  const overlay = document.getElementById("photoOverlay");

  // trigger fade-in
  requestAnimationFrame(() => {
    overlay.classList.add("active");
  });

  // click anywhere to close
  overlay.addEventListener("click", () => {
    overlay.classList.remove("active");

    setTimeout(() => {
      root.innerHTML = "";
    }, 600);
  });
};
