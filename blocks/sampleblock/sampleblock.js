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

// Step 1: Create a main <div> container
const mainDiv = document.createElement('div');
mainDiv.id = 'mainContainer'; // Assign an ID for future reference or styling
document.body.appendChild(mainDiv); // Append the <div> to the body or another container

// Step 2: Convert headings to buttons
const headingsToConvert = ['accept', 'decline']; // IDs of headings to convert

headingsToConvert.forEach(id => {
    const heading = document.getElementById(id);
    if (heading) {
        const button = document.createElement('button');
        button.textContent = heading.textContent; // Use heading text as button text
        button.addEventListener('click', () => {
            // Example action on button click
            console.log(`Button ${id} clicked`);
        });
        heading.parentNode.replaceChild(button, heading); // Replace heading with button
    }
});
