import { decorateIcons } from '../../scripts/aem.js';

function parseConfig(block) {
    if (block.classList.contains('hero')) {
        const videoUrl = block.querySelector(':scope > div > div:first-child').textContent;
        const title = block.querySelector(':scope > div > div:nth-child(2) > h1').textContent;
        const description = block.querySelector(':scope > div > div:nth-child(2) > p').textContent;
        const button = block.querySelector(':scope > div > div:nth-child(2) > p:last-child').textContent;

        return {
            isHeroBlock: true,
            videoUrl,
            title,
            description,
            button
        };
    }

    const cards = [...block.children].map((child) => {
        const videoUrl = child.querySelector(':scope > div:first-child').textContent;
        const title = child.querySelector(':scope > div:nth-child(2) > h1').textContent;
        const description = child.querySelector(':scope > div:nth-child(2) > p').textContent;

        return {
            videoUrl,
            title,
            description
        };
    });

    return {
        isHeroBlock: false,
        cards
    };
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
    const pauseIcon = document.createElement('span');
    pauseIcon.classList.add('icon');
    pauseIcon.classList.add('icon-pause');

    const playIcon = document.createElement('span');
    playIcon.classList.add('icon');
    playIcon.classList.add('icon-play');

    function updateIcons(isPaused) {
        if (isPaused) {
            playIcon.style.display = '';
            pauseIcon.style.display = 'none';
        } else {
            playIcon.style.display = 'none';
            pauseIcon.style.display = '';
        }
    }

    const button = document.createElement('button');
    button.classList.add('custom-play-button');
    button.addEventListener('click', () => {
        if (player.paused()) {
            player.play();
        } else {
            player.pause();
        }
    });

    button.append(pauseIcon);
    button.append(playIcon);

    player.on('play', () => {
        updateIcons(false);
    });
    player.on('pause', () => {
        updateIcons(true);
    });

    decorateIcons(button);

    container.append(button);
}

function setupPlayer(videoContainer, config) {
    const videoElement = document.createElement('video');
    videoElement.classList.add('video-js');
    videoElement.id = `video-${Math.random().toString(36).substr(2, 9)}`;
    
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

function decorateHeroBlock(block, config) {
    const container = document.createElement('div');
    container.classList.add('video-hero');

    const title = document.createElement('h1');
    title.classList.add('video-hero__title');
    title.textContent = config.title;

    const description = document.createElement('p');
    description.classList.add('video-hero__description');
    description.textContent = config.description;

    const button = document.createElement('button');
    button.classList.add('video-hero__button');
    button.textContent = config.button;

    const content = document.createElement('div');
    content.classList.add('video-hero__content');
    content.append(title);
    content.append(description);
    content.append(button);

    container.append(content);

    block.innerHTML = '';
    block.append(container);

    setupPlayer(container, {
        url: config.videoUrl
    });
}

function decorateVideoCards(block, config) {
    const gridContainer = document.createElement('ul');
    gridContainer.classList.add('video-card-grid');

    block.innerHTML = '';
    block.append(gridContainer);

    config.cards.forEach((videoConfig) => {
        const gridItem = document.createElement('li');
        gridItem.classList.add('video-card-grid__item');
        gridContainer.append(gridItem);
        
        decorateVideoCard(gridItem, videoConfig);
    });
}

export default async function decorate(block) {
    await loadVideoJs();

    const config = parseConfig(block);
    if (config.isHeroBlock) {
        decorateHeroBlock(block, config);
        return;
    }

    decorateVideoCards(block, config);
}