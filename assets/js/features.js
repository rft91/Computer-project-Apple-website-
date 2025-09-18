document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".feature-video");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;

      if (entry.isIntersecting) {
        // play if muted and visible
        if (video.paused) {
          video.play().catch(err => {
            console.log("Autoplay blocked:", err);
          });
        }
      } else {
        // stop when scrolled away, but keep last frame if ended
        if (!video.ended) {
          video.pause();
          video.currentTime = 0; // reset only if not ended
        }
      }
    });
  }, { threshold: 0.6 }); // 60% visible before playing

  videos.forEach(video => {
    // Ensure muted for autoplay
    video.muted = true;
    video.playsInline = true;

    // Observe visibility
    observer.observe(video);

    // Freeze at last frame
    video.addEventListener("ended", () => {
      video.pause();
      video.currentTime = video.duration;
    });
  });
});
