function hasSubClass(element, substring) {
    const classList = element.classList;
    for (let i = 0; i < classList.length; i++) {
        if (classList[i].includes(substring)) return classList[i];
    }
    return false;
}

export default function decorate(block) {
    if (block.children.length > 1) {
        const bg = block.firstElementChild;
        block.style.background = bg;
        bg.remove();
    }

    const spaceClass = hasSubClass(block, 'spacing');
    if (spaceClass) {
        const [_, axis, a, b] = spaceClass.split('-');
        const pos = ['top', 'right', 'bottom', 'left'];
        const spacing = pos.filter((_, i) => axis === 'x' ? i % 2 !== 0 : i % 2 === 0);
        block.classList.add(`${spacing[0]}-${a}`, `${spacing[1]}-${b}`);
    }

    [...block.children].forEach((div) => {
        // clean up the content so we only nest once
        div.classList.add('text-content');
        const text = div.querySelector('h1, h2, h3, h4, h5, h6, p')?.closest('div');
        div.replaceChildren(...text.children);
    });
}
