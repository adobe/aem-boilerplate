document.addEventListener("DOMContentLoaded", function() {
    // List of heading IDs to be converted
    const headingIDs = ['accept'];

    // Function to convert heading to button
    function convertHeadingToButton(id) {
        const headingIDs = document.getElementById(id);
        if (headingIDs) {
            const button = document.createElement('button');
            button.innerText = heading.innerText;
            heading.replaceWith(button);
        }
    }

    // Convert each heading in the list
    headingIDs.forEach(convertHeadingToButton);
});
