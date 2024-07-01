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

// Select the main container where buttons will be placed
const mainContainer = document.querySelector('.main-container');

// Select all headings (you can adjust the selector as needed)
const headings = document.querySelectorAll('accept, decline');

// Loop through each heading
headings.forEach(heading => {
    // Get the id of the heading
    const id = heading.id;

    // Create a button element
    const button = document.createElement('button');
    
    // Set button text to heading text
    button.textContent = heading.textContent;

    // Set button attributes or classes as needed
    button.setAttribute('type', 'button'); // Optional: set type attribute
    
    // Add event listener or any additional customization
    button.addEventListener('click', () => {
        // Add functionality if needed
        console.log(`Button for ${id} clicked`);
    });

    // Append button to the main container
    mainContainer.appendChild(button);
});
