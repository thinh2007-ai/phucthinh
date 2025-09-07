window.addEventListener("load", () => {
  const bgVideo = document.getElementById("bgVideo");
  bgVideo.style.width = window.innerWidth + "px";
  bgVideo.style.height = window.innerHeight + "px";
});

// Không update khi resize => giữ nguyên
// Reload web khi người dùng thay đổi kích thước cửa sổ
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    location.reload();
  }, 300); // đợi 300ms sau khi resize xong mới reload
});





let hashes = document.getElementById("hashes");
let percentText = document.getElementById("percent");
let loadingScreen = document.getElementById("loadingScreen");
let pressBtn = document.getElementById("pressBtn");
let progressBox = document.getElementById("progressBox");
let progress = 0;

const totalHashes = 53;

// Loading bar
let loading = setInterval(() => {
  progress++;
  let filled = Math.floor(progress / 100 * totalHashes);

  hashes.textContent = "#".repeat(filled);
  percentText.textContent = progress + "%";

  if (progress >= 101) {
    clearInterval(loading);
    hashes.textContent = "#".repeat(totalHashes);
    percentText.textContent = "100% DONE!";

    progressBox.style.display = "none";
    pressBtn.style.display = "inline-block"; // hiện nút
  }
}, 50);

// Khi bấm nút "Vui lòng ấn"
pressBtn.addEventListener("click", () => {
  loadingScreen.style.display = "none";       // ẩn màn hình đen
  document.body.classList.add("active");      // bật hiệu ứng border video
  startSite();                                // chạy site
});


// ----------- Chức năng site -----------
const profileBtn = document.getElementById('profileBtn');
const profileBox = document.getElementById('profileBox');
const bgMusic = document.getElementById('bgMusic');
const bgVideo = document.getElementById('bgVideo');

// Khởi động site
function startSite() {
  profileBtn.style.display = 'inline-block';
  bgMusic.muted = false;
  bgMusic.volume = 0.35;
  bgMusic.play();
}

// Bật/tắt profile + gõ chữ
function toggleProfile() {
  if (profileBox.style.display === "block") {
    profileBox.style.display = "none";
    profileBtn.style.display = "inline-block";
  } else {
    profileBox.style.display = "block";
    profileBtn.style.display = "none";

    const elements = profileBox.querySelectorAll(".typewriter");
    let index = 0;

    function runNext() {
      if (index < elements.length) {
        const el = elements[index];
        typeWriter(el, el.getAttribute("data-text"), 100, runNext);
        index++;
      }
    }
    runNext();
  }
}

// Hiệu ứng gõ chữ
function typeWriter(el, text, speed = 100, callback) {
  let i = 0;
  el.textContent = "";
  function typing() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if (callback) callback();
  }
  typing();
}

// Responsive video căn giữa
function centerVideo() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const vidRatio = bgVideo.videoWidth / bgVideo.videoHeight;
  const winRatio = vw / vh;

  if (winRatio > vidRatio) {
    bgVideo.style.width = vw + "px";
    bgVideo.style.height = "auto";
  } else {
    bgVideo.style.width = "auto";
    bgVideo.style.height = vh + "px";
  }

  bgVideo.style.position = "absolute";
  bgVideo.style.left = (vw - bgVideo.offsetWidth) / 2 + "px";
  bgVideo.style.top = (vh - bgVideo.offsetHeight) / 2 + "px";
}

window.addEventListener("resize", centerVideo);
bgVideo.addEventListener("loadedmetadata", centerVideo);
