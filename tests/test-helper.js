export const createPage = async (content) => {
  document.body.innerHTML = `
    <main>
      <div class="section">
        ${content}
      </div>
    </main>
  `;

  await import('/scripts/scripts.js');
}
