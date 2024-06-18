export default async function decorate(block) {
    var acceptLabel = block(data-accept-button-label);
    var rejectLabel = block(data-reject-button-label);

    createButton()
}

createAcceptButton(label) {
    // CREATE BUTTON with class name = ".accept"
}
createRejectButton(label) {
    // CREATE BUTTON with class name = ".reject"
}
.accept.click() {
    
}

.reject.click() {
    //
}

const samplebox = 
	document.getElementById("samplebox"); 
const acceptBtn = 
	document.querySelector(".acceptButton"); 
const rejectBtn = 
	document.querySelector(".rejectButton"); 

accept.onclick = () => { 
	document.cookie = "CookieBy=GeeksForGeeks; max-age="
		+ 60 * 60 * 24; 
	if (document.cookie) { 
		consentBox.classList.add("hide"); 
	} else { 
		alert 
			("Cookie can't be set! Please"+ 
			" unblock this site from the cookie"+ 
			" setting of your browser."); 
	} 
}; 

reject.onclick = () => { 
	alert( 
		"Cookies rejected. Some functionality may be limited."); 
	consentBox.classList.add("hide"); 
}; 

let checkCookie = 
	document.cookie.indexOf("CookieBy=GeeksForGeeks"); 
checkCookie !== -1 ? consentBox.classList.add("hide") : 
	samplebox.classList.remove("hide");
