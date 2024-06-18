const consentBox =  
    document.getElementById("consentBox"); 
const acceptBtn =  
    document.querySelector(".consentButton"); 
const rejectBtn =  
    document.querySelector(".rejectButton"); 
  
acceptBtn.onclick = () => { 
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
  
rejectBtn.onclick = () => { 
    alert( 
        "Cookies rejected. Some functionality may be limited."); 
    consentBox.classList.add("hide"); 
}; 
  
let checkCookie =  
    document.cookie.indexOf("CookieBy=GeeksForGeeks"); 
checkCookie !== -1 ? consentBox.classList.add("hide") : 
    consentBox.classList.remove("hide");