const signupForm = document.getElementById('signupForm');
const userEmail=document.getElementById('userEmail');
const userPassword=document.getElementById('userPassword');
const confirmPassword=document.getElementById('confirmPassword');
const userName=document.getElementById('fullName');
const phoneNumber=document.getElementById('phoneNumber');
const errors=document.getElementById('errors');


signupForm.addEventListener("submit", function(e){
    e.preventDefault();

    let email = userEmail.value.trim();
    let password = userPassword.value.trim();
    let confirm = confirmPassword.value.trim();
    let name = userName.value.trim();
    let phone = phoneNumber.value.trim();

    //input validation
    let errs=[];

    if(!email) errs.push("Email is required.");
    if(!/\S+@\S+\.\S+/.test(email)) errs.push("Email tidak sesuai format email.");
    if(!password) errs.push("Password is required.");
    if(password.length<8) errs.push("Password must be at least 8 characters long.");
    if(password !== confirm) errs.push("Password and Confirm Password do not match.");
    if(!name) errs.push("Name is required.");
    if(name.length<3) errs.push("Name must be at least 3 characters long.");
    if(name.length>32) errs.push("Name must be at most 32 characters long.");
    if(!/^[a-zA-Z\s]+$/.test(name)) errs.push("Name can only contain letters and spaces.");
    if(!phone) errs.push("Phone number is required.");
    if (!/^08\d{8,16}$/.test(phone)) errs.push("Phone number must start with 08 and be 10-15 digits long.");
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
       alert("Sign Up successful!");
        window.location.href = "login.html"; 
    }

});