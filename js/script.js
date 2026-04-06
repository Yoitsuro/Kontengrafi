// Tab switching
function switchTab(type) {
  document
    .querySelectorAll(".ptab")
    .forEach((t) => t.classList.remove("active"));
  event.target.classList.add("active");
  document
    .getElementById("grid-foto")
    .classList.toggle("hidden", type !== "foto");
  document
    .getElementById("grid-video")
    .classList.toggle("hidden", type !== "video");
}

// Trigger hidden file input
function triggerUpload(type, idx) {
  document.getElementById(`input-${type}-${idx}`).click();
}

// Handle file upload and preview
function handleUpload(input, type, idx) {
  const file = input.files[0];
  if (!file) return;
  const ph = document.getElementById(`ph-${type}-${idx}`);
  const container = ph.parentElement;

  const reader = new FileReader();
  reader.onload = function (e) {
    const dataUrl = e.target.result;

    // Remove old media if any
    container.querySelectorAll("img, video").forEach((el) => el.remove());
    container.querySelectorAll(".port-play").forEach((el) => el.remove());

    if (type === "foto") {
      const img = document.createElement("img");
      img.src = dataUrl;
      img.alt = "Portofolio foto";
      img.onclick = (ev) => {
        ev.stopPropagation();
        openLightbox("img", dataUrl);
      };
      ph.style.display = "none";
      container.insertBefore(img, container.querySelector(".port-badge"));
    } else {
      const video = document.createElement("video");
      video.src = dataUrl;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.currentTime = 0.1;
      const playOverlay = document.createElement("div");
      playOverlay.className = "port-play";
      playOverlay.innerHTML = `<div class="port-play-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="#111"><path d="M8 5v14l11-7z"/></svg></div>`;
      playOverlay.onclick = (ev) => {
        ev.stopPropagation();
        openLightbox("video", dataUrl);
      };
      ph.style.display = "none";
      container.insertBefore(video, container.querySelector(".port-badge"));
      container.appendChild(playOverlay);
    }
  };
  reader.readAsDataURL(file);
}

// Lightbox
function openLightbox(type, url) {
  const lb = document.getElementById("lightbox");
  const content = document.getElementById("lightbox-content");
  content.innerHTML = "";
  if (type === "img") {
    const img = document.createElement("img");
    img.src = url;
    content.appendChild(img);
  } else {
    const video = document.createElement("video");
    video.src = url;
    video.controls = true;
    video.autoplay = true;
    video.style.maxWidth = "100%";
    video.style.maxHeight = "85vh";
    video.style.borderRadius = "12px";
    content.appendChild(video);
  }
  lb.classList.add("open");
}

function closeLightbox() {
  const lb = document.getElementById("lightbox");
  lb.classList.remove("open");
  // Stop video if playing
  lb.querySelectorAll("video").forEach((v) => v.pause());
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
