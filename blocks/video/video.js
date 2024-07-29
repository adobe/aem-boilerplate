import { decorateIcons } from '../../scripts/aem.js';

function parseConfig(block) {
    return [...block.children].map((child) => {
        const videoUrl = child.querySelector(':scope > div:first-child').textContent;
        const title = child.querySelector(':scope > div:nth-child(2) > h1').textContent;
        const description = child.querySelector(':scope > div:nth-child(2) > p').textContent;

        return {
            videoUrl,
            title,
            description
        };
    });
}

async function loadVideoJs() {
    let resolvePromise;
    const promise = new Promise((resolve) => {
        resolvePromise = resolve;
    });
  
    const css = document.createElement('link');
    css.setAttribute('href', 'https://vjs.zencdn.net/8.3.0/video-js.css');
    css.setAttribute('rel', 'stylesheet');
  
    const mainScript = document.createElement('script');
    mainScript.setAttribute('src', 'https://vjs.zencdn.net/8.3.0/video.min.js');
    mainScript.setAttribute('async', 'true');
    mainScript.onload = () => resolvePromise();
  
    const header = document.querySelector('head');
    header.append(css);
    header.append(mainScript);
  
    await promise;
}

function createPlayButton(container, player) {
    const button = document.createElement('button');
    button.classList.add('custom-play-button');
    button.addEventListener('click', () => {
      if (player.paused()) {
        player.play();
      } else {
        player.pause();
      }
    });
  
    const pauseIcon = document.createElement('span');
    pauseIcon.classList.add('icon');
    pauseIcon.classList.add('icon-pause');

    const playIcon = document.createElement('span');
    playIcon.classList.add('icon');
    playIcon.classList.add('icon-play');

    button.append(pauseIcon);
    button.append(playIcon);

    decorateIcons(button);

    container.append(button);
}

function setupPlayer(videoContainer, config) {
    const videoElement = document.createElement('video');
    videoElement.classList.add('video-js');
    videoContainer.append(videoElement);
    
    // eslint-disable-next-line no-undef
    const player = videojs(videoElement, {
      controls: false,
      bigPlayButton: false,
      autoplay: true,
      muted: true,
      fluid: true,
      loop: true,
    });
  
    player.src(config.url);

    createPlayButton(videoContainer, player);

    player.on('play', () => {
      videoContainer.classList.add('video-playing');
    });
    player.on('pause', () => {
      videoContainer.classList.remove('video-playing');
    });
}

function decorateVideoCard(container, config) {
    const videoContainer = document.createElement('div');
    videoContainer.classList.add('video-container');

    const title = document.createElement('h3');
    title.classList.add('video-card__title');
    title.textContent = config.title;

    const description = document.createElement('p');
    description.classList.add('video-card__description');
    description.textContent = config.description;

    const content = document.createElement('div');
    content.classList.add('video-card__content');
    content.append(title);
    content.append(description);

    const article = document.createElement('article');
    article.classList.add('video-card');
    article.append(videoContainer);
    article.append(content);

    setupPlayer(videoContainer, {
        url: config.videoUrl
    });

    container.append(article);
}

export default async function decorate(block) {
    await loadVideoJs();

    const config = parseConfig(block);
    const gridContainer = document.createElement('ul');
    gridContainer.classList.add('video-card-grid');

    block.innerHTML = '';
    block.append(gridContainer);

    config.forEach((videoConfig) => {
        const gridItem = document.createElement('li');
        gridItem.classList.add('video-card-grid__item');
        gridContainer.append(gridItem);
        
        decorateVideoCard(gridItem, videoConfig);
    });
}