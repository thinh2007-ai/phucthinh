const helloBtn = document.getElementById('helloBtn');
const profileBtn = document.getElementById('profileBtn');
const profileBox = document.getElementById('profileBox');
const bgMusic = document.getElementById('bgMusic');
const bgVideo = document.getElementById('bgVideo');

// Bắt đầu site
function startSite() {
  helloBtn.style.display = 'none';
  profileBtn.style.display = 'inline-block';
  bgMusic.muted = false;
  bgMusic.volume = 0.35;
  bgMusic.play();
}

// Bật/tắt profile và gõ chữ
function toggleProfile() {
  const box = profileBox;
  const btn = profileBtn;

  if (box.style.display === "block") {
    box.style.display = "none";
    btn.style.display = "inline-block";
  } else {
    box.style.display = "block";
    btn.style.display = "none";

    const elements = box.querySelectorAll(".typewriter");
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

// Hiệu ứng gõ chữ từng dòng
function typeWriter(el, text, speed = 100, callback) {
  let i = 0;
  el.textContent = "";
  function typing() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else {
      if (callback) callback();
    }
  }
  typing();
}

// Giữ video căn giữa và responsive
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

  bgVideo.style.left = (vw - bgVideo.offsetWidth)/2 + "px";
  bgVideo.style.top = (vh - bgVideo.offsetHeight)/2 + "px";
}

window.addEventListener("resize", centerVideo);
bgVideo.addEventListener("loadedmetadata", centerVideo);
