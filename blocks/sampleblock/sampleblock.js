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

function convertHeadingToButton(heading) {
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

// Function to convert all headings inside a container to buttons
function convertHeadingsInContainer(containerId) {
    var container = document.getElementById(containerId);
    if (container) {
        var headings = container.querySelectorAll("accept, decline");
        headings.forEach(function(heading) {
            convertHeadingToButton(heading);
        });
    }
}

// Create a container div dynamically
var containerDiv = document.createElement("div");
containerDiv.id = "headingContainer"; // Set an id for the container
containerDiv.className = "button-container"; // Add the class for styling
document.body.appendChild(containerDiv); // Append container to body

// Add some headings to the container (for demonstration)
containerDiv.innerHTML = `
    <h4 id="accept">accept</h4>
    <h4 id="decline">decline</h4>
`;

// Convert headings inside the container to buttons
convertHeadingsInContainer("headingContainer");