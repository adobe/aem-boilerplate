document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the class 'text-to-button'
    const textElements = document.querySelectorAll('.text-to-button');

    textElements.forEach(element => {
        // Get the text content of the element
        const text = element.textContent;

        // Create a new button element
        const button = document.createElement('button');
        button.textContent = text;

        // Replace the text element with the button element
        element.replaceWith(button);
    });
});
