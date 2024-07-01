// function convertHeadingToButton(id) {
//     // Get the heading element by id
//     var heading = document.getElementById(id);
//     if (heading) {
//         // Create a new button element
//         var button = document.createElement("button");
//         // Set the button's text content to the heading's text content
//         button.textContent = heading.textContent;
//         // Add a class to the button for styling
//         button.className = "buttons";
//         // Add a click event listener to the button
//         button.addEventListener("click", function() {
//             alert("Button for " + heading.textContent + " clicked!");
//         });
//         // Replace the heading with the button
//         heading.parentNode.replaceChild(button, heading);
//     }
// }

// // List of heading ids to be converted
// var headingIds = ["accept", "decline"];

// // Loop through the list and convert each heading to a button
// headingIds.forEach(function(id) {
//     convertHeadingToButton(id);
// });

function convertHeadingToButton(id) {
    // Get the heading element by id
    var heading = document.getElementById(id);
    if (heading) {
        // Create a new button element
        var button = document.createElement("button");
        // Set the button's text content to the heading's text content
        button.textContent = heading.textContent;
        // Add a class to the button for styling
        button.className = "custom-button";

        // Create a div container for the button
        var divContainer = document.createElement("div");
        // Add a class to the div container for styling
        divContainer.className = "button-wrapper";
        // Append the button to the div container
        divContainer.appendChild(button);

        // Replace the heading with the div container
        heading.parentNode.replaceChild(divContainer, heading);
    }
}

// List of heading ids to be converted
var headingIds = ["accept", "decline"];

// Loop through the list and convert each heading to a button inside a div container
headingIds.forEach(function(id) {
    convertHeadingToButton(id);
});