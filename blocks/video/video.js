function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Video block - custom video player
 *
 * Content model (rows):
 *   Row 1: Video URL (required) - link to mp4 or video source
 *   Row 2: Headline (optional) - displayed above the video
 *   Row 3: Poster image (optional) - shown before playback
 */
export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  let videoUrl = '';
  let headline = '';
  let posterUrl = '';

  const firstRow = rows[0];
  const linkEl = firstRow.querySelector('a');
  if (linkEl) {
    videoUrl = linkEl.href;
  } else {
    videoUrl = firstRow.textContent.trim();
  }

  if (rows.length > 1) {
    headline = rows[1].textContent.trim();
  }

  if (rows.length > 2) {
    const img = rows[2].querySelector('img');
    if (img) {
      posterUrl = img.src;
    } else {
      posterUrl = rows[2].textContent.trim();
    }
  }

  if (!videoUrl) return;

  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'video-wrapper';

  if (headline) {
    const header = document.createElement('div');
    header.className = 'video-header';
    const h3 = document.createElement('h3');
    h3.textContent = headline;
    header.append(h3);
    wrapper.append(header);
  }

  const playerContainer = document.createElement('div');
  playerContainer.className = 'video-player';

  const video = document.createElement('video');
  video.className = 'video-element';
  video.src = videoUrl;
  video.preload = 'metadata';
  video.playsInline = true;
  if (posterUrl) video.poster = posterUrl;

  const overlay = document.createElement('div');
  overlay.className = 'video-overlay';
  overlay.innerHTML = '<button class="video-big-play" aria-label="Play video"><svg viewBox="0 0 72 72" fill="none"><rect width="72" height="72" fill="#003d3f"/><path d="M30 22v28l22-14z" fill="#fff"/></svg></button>';

  const controls = document.createElement('div');
  controls.className = 'video-controls';

  const pauseIcon = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
  const playIcon = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';

  const playBtn = document.createElement('button');
  playBtn.className = 'video-play-btn';
  playBtn.setAttribute('aria-label', 'Play');
  playBtn.innerHTML = playIcon;

  const timeDisplay = document.createElement('div');
  timeDisplay.className = 'video-time';
  timeDisplay.innerHTML = '<span class="video-current">00:00</span><span class="video-separator">/</span><span class="video-duration">00:00</span>';

  const progressWrap = document.createElement('div');
  progressWrap.className = 'video-progress';
  const progressBar = document.createElement('div');
  progressBar.className = 'video-progress-bar';
  progressWrap.append(progressBar);

  const volumeBtn = document.createElement('button');
  volumeBtn.className = 'video-volume-btn';
  volumeBtn.setAttribute('aria-label', 'Mute');
  volumeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>';

  const fullscreenBtn = document.createElement('button');
  fullscreenBtn.className = 'video-fullscreen-btn';
  fullscreenBtn.setAttribute('aria-label', 'Fullscreen');
  fullscreenBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>';

  controls.append(playBtn, timeDisplay, progressWrap, volumeBtn, fullscreenBtn);
  playerContainer.append(video, overlay, controls);
  wrapper.append(playerContainer);
  block.append(wrapper);

  video.addEventListener('loadedmetadata', () => {
    timeDisplay.querySelector('.video-duration').textContent = formatTime(video.duration);
  });

  video.addEventListener('timeupdate', () => {
    timeDisplay.querySelector('.video-current').textContent = formatTime(video.currentTime);
    if (video.duration) {
      progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    }
  });

  video.addEventListener('play', () => {
    playBtn.innerHTML = pauseIcon;
    playBtn.setAttribute('aria-label', 'Pause');
    overlay.classList.add('hidden');
  });

  video.addEventListener('pause', () => {
    playBtn.innerHTML = playIcon;
    playBtn.setAttribute('aria-label', 'Play');
  });

  video.addEventListener('ended', () => {
    playBtn.innerHTML = playIcon;
    overlay.classList.remove('hidden');
  });

  function togglePlay() {
    if (video.paused) video.play();
    else video.pause();
  }

  playBtn.addEventListener('click', togglePlay);
  overlay.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay);

  progressWrap.addEventListener('click', (e) => {
    const rect = progressWrap.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    video.currentTime = ratio * video.duration;
  });

  volumeBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    volumeBtn.innerHTML = video.muted
      ? '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>';
  });

  fullscreenBtn.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else playerContainer.requestFullscreen();
  });
}
