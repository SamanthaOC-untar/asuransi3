const loginForm = document.getElementById('loginForm');
const userEmail=document.getElementById('userEmail');
const userPassword=document.getElementById('userPassword');
const errors=document.getElementById('errors');


loginForm.addEventListener("submit", function(e){
    e.preventDefault();

    let email = userEmail.value.trim();
    let password = userPassword.value.trim();

    //input validation
    let errs=[];

    if(!email) errs.push("Email is required.");
    if(!password) errs.push("Password is required.");
    if(errs.length>0){
        errors.innerHTML = errs.join("<br>");
        errors.innerHTML =`
            <ul>
            ${errs.map((e) => `<li>${e}</li>`).join("")}
            </ul>
        `;
        return;
    }
    else{
       alert("Login successful!");
       window.location.href = "index.html";
    }

});