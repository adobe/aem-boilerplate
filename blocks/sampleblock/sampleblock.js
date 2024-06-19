document.addEventListener("DOMContentLoaded", function() {
    // Create a div container for the button
    var container = document.createElement("div");
    container.id = "button-container";

    // Create a button element
    var button = document.createElement("button");
    button.innerHTML = "Accept Cookies";

    // Add an event listener to handle the click event
    button.addEventListener("click", function() {
        // Set data-cookieStatus attribute to true
        button.setAttribute("data-cookieStatus", "true");
        // Add the class "accept" to the button
        button.classList.add("accept");
    });

    // Append the button to the container
    container.appendChild(button);

    // Append the container to the body
    document.body.appendChild(container);
});
