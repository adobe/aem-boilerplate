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
//             alert("Thankyou for your response " + heading.textContent + " clicked!");
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

// function convertHeadingToButton(id) {
//     // Get the heading element by id
//     var heading = document.getElementById(id);
//     if (heading) {
//         // Create a new button element
//         var button = document.createElement("button");
//         // Set the button's text content to the heading's text content
//         button.textContent = heading.textContent;
//         // Add an ID to the class attribute of the button
//         button.classList.add(id);
//         // Replace the heading with the button
//         heading.parentNode.replaceChild(button, heading);
//         return button; // Return the button for further manipulation
//     }
// }

// // Function to handle accept cookies action
// function acceptCookies() {
//     alert("Cookies Accepted");
//     // Add further logic for accepting cookies here
// }

// // Function to handle decline cookies action
// function declineCookies() {
//     alert("Cookies Declined");
//     // Add further logic for declining cookies here
// }

// // List of heading ids to be converted
// var headingIds = ["accept", "decline"];

// // Loop through the list and convert each heading to a button
// headingIds.forEach(function(id) {
//     var button = convertHeadingToButton(id);
//     // Add event listeners for accept and decline actions
//     if (id === "accept") {
//         button.addEventListener("click", acceptCookies);
//     } else if (id === "decline") {
//         button.addEventListener("click", declineCookies);
//     }
// });