document.addEventListener("DOMContentLoaded", function() {
    // List of heading IDs to be converted
    const headingIDs = ['accept', 'decline'];

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
