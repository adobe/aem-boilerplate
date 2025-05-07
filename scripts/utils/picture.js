const DEF_BREAK = [{ media: '(min-width: 600px)', width: '2000' }, { width: '750' }];

export default function createPicture({ src, alt = '', eager = false, breakpoints = DEF_BREAK }) {
  const url = !src.startsWith('http') ? new URL(src, window.location.href) : new URL(src);
  const picture = document.createElement('picture');
  const { origin, pathname } = url;
  const ext = pathname.split('.').pop();

  // webp
  breakpoints.forEach((br) => {
    const source = document.createElement('source');
    if (br.media) source.setAttribute('media', br.media);
    source.setAttribute('type', 'image/webp');
    source.setAttribute('srcset', `${origin}${pathname}?width=${br.width}&format=webply&optimize=medium`);
    picture.appendChild(source);
  });

  // fallback
  breakpoints.forEach((br, i) => {
    if (i < breakpoints.length - 1) {
      const source = document.createElement('source');
      if (br.media) source.setAttribute('media', br.media);
      source.setAttribute('srcset', `${origin}${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
      picture.appendChild(source);
    } else {
      const img = document.createElement('img');
      img.setAttribute('loading', eager ? 'eager' : 'lazy');
      img.setAttribute('alt', alt);
      picture.appendChild(img);
      img.setAttribute('src', `${origin}${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
    }
  });

  return picture;
}