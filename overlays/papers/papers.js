function openPapersOverlay() {
  const root = document.getElementById("overlay-root");
  if (!root) return;

  // Clear any existing overlay
  root.innerHTML = "";

  // Create overlay
  const overlay = document.createElement("div");
  overlay.className = "papers-overlay";

  // Image
  const img = document.createElement("img");
  img.src = "overlays/papers/1.png";
  img.alt = "Papers memory";

  // Close button
  const close = document.createElement("div");
  close.className = "close-btn";
  close.innerHTML = "&times;";

  // Close handlers
  close.onclick = closeOverlay;
  overlay.onclick = e => {
    if (e.target === overlay) closeOverlay();
  };

  overlay.appendChild(img);
  overlay.appendChild(close);
  root.appendChild(overlay);

  function closeOverlay() {
  overlay.classList.add("closing");
  setTimeout(() => {
    root.innerHTML = "";
  }, 250);
}
}
