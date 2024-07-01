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

// Step 1: Create a new div element
var divElement = document.createElement('div');

// Step 2: Set any attributes or properties for the div
divElement.id = 'myDiv'; // Example ID for the div
divElement.className = 'container'; // Example class for styling

// Step 3: Append the div to an existing element or to the document body
document.body.appendChild(divElement); // Appends to the end of the document body
// Alternatively, you can append it to another existing element:
// document.getElementById('parentElementId').appendChild(divElement);

// Step 1: Retrieve the headings by their IDs
var heading1 = document.getElementById('accept');
var heading2 = document.getElementById('decline');

// Step 2: Create new button elements
var button1 = document.createElement('button');
var button2 = document.createElement('button');

// Step 3: Set inner text or HTML content for the buttons
button1.innerText = heading1.innerText; // Example: Copies the text from heading1
button2.innerText = heading2.innerText; // Example: Copies the text from heading2

// Step 4: Replace the headings with the newly created buttons
heading1.parentNode.replaceChild(button1, heading1);
heading2.parentNode.replaceChild(button2, heading2);
