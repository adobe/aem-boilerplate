// // Function to convert heading to button
// function convertHeadingToButton() {
//     // Get the heading element by its ID
//     const heading = document.getElementById('accept', 'decline');

//     // Create a new button element
//     const button = document.createElement('button');

//     // Transfer the text content from heading to button
//     button.textContent = heading.textContent;

//     // Copy attributes from heading to button if necessary
//     // For example, copy class, style, etc.
//     button.className = heading.className;
//     button.style.cssText = heading.style.cssText;

//     // Replace the heading with the button
//     heading.parentNode.replaceChild(button, heading);

//     // Optional: Add event listener to the button
//     button.addEventListener('click', function() {
//         alert('Button clicked!');
//     });
// }

// // Call the function to convert the heading to a button
// convertHeadingToButton();
document.addEventListener("DOMContentLoaded", function() {
    // List of heading IDs to be converted
    const headingIDs = ['accept', 'decline',];

    // Function to convert heading to button
    function convertHeadingToButton(id) {
        const heading = document.getElementById(id);
        if (heading) {
            const button = document.createElement('button');
            button.innerText = heading.innerText;
            heading.replaceWith(button);
        }
    }

    // Convert each heading in the list
    headingIDs.forEach(convertHeadingToButton);
});
