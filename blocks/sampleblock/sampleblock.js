function convertHeadingToButton(id) {
    // Get the heading element by id
    var heading = document.getElementById(id);
    if (heading) {
        // Create a new button element
        var button = document.createElement("button");
        // Set the button's text content to the heading's text content
        button.textContent = heading.textContent;
        // Add a class to the button for styling
        button.className = "buttons";
        // Add a click event listener to the button
        button.addEventListener("click", function() {
            alert("Button for " + heading.textContent + " clicked!");
        });
        // Replace the heading with the button
        heading.parentNode.replaceChild(button, heading);
    }
}

// List of heading ids to be converted
var headingIds = ["accept", "decline"];

// Loop through the list and convert each heading to a button
headingIds.forEach(function(id) {
    convertHeadingToButton(id);
});