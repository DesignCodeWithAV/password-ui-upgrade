const password = document.getElementById("password");
const toggle = document.getElementById("togglePassword");
const progress = document.querySelector(".progress");
const strengthText = document.getElementById("strengthText");
const lengthRule = document.getElementById("rule-length");
const upperRule = document.getElementById("rule-upper");
const lowerRule = document.getElementById("rule-lower");
const numberRule = document.getElementById("rule-number");
const specialRule = document.getElementById("rule-special");
const inputBox = document.querySelector(".input-box");

toggle.addEventListener("click", () => {
    if(password.type === "password"){
        password.type = "text";
        toggle.classList.replace("fa-eye","fa-eye-slash");
    }else{
        password.type = "password";
        toggle.classList.replace("fa-eye-slash","fa-eye");
    }
});

password.addEventListener("input", () => {
    const value = password.value;
    const hasLength = value.length >= 8;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    updateRule(lengthRule, hasLength);
    updateRule(upperRule, hasUpper);
    updateRule(lowerRule, hasLower);
    updateRule(numberRule, hasNumber);
    updateRule(specialRule, hasSpecial);
    let score = 0;
    if(hasLength) score++;
    if(hasUpper) score++;
    if(hasLower) score++;
    if(hasNumber) score++;
    if(hasSpecial) score++;
    progress.className = "progress";
    if(score <= 2){
        progress.classList.add("weak");
        strengthText.innerHTML = "Weak";
        strengthText.style.color = "#ef4444";
        inputBox.classList.remove("success");
        inputBox.classList.remove("medium");
        inputBox.classList.add("error");
    }
    else if(score <= 4){
        progress.classList.add("medium");
        strengthText.innerHTML = "Medium";
        strengthText.style.color = "#f59e0b";
        inputBox.classList.remove("success");
        inputBox.classList.remove("error");
        inputBox.classList.add("medium");
    }
    else{
        progress.classList.add("strong");
        strengthText.innerHTML = "Strong";
        strengthText.style.color = "#22c55e";
        inputBox.classList.remove("error");
        inputBox.classList.remove("medium");
        inputBox.classList.add("success");
    }

    if(value.length === 0){
        progress.className = "progress";
        strengthText.innerHTML = "Weak";
        strengthText.style.color = "#ef4444";
        inputBox.classList.remove("success");
        inputBox.classList.remove("error");
        document.querySelectorAll(".rules li").forEach(item=>{
            item.classList.remove("valid");
            item.classList.remove("invalid");
            item.querySelector("i").className="fa-solid fa-circle";
        });
    }
});

function updateRule(rule, valid){
    const icon = rule.querySelector("i");
    if(valid){
        rule.classList.add("valid");
        rule.classList.remove("invalid");
        icon.className = "fa-solid fa-circle-check";
    }else{
        rule.classList.remove("valid");
        rule.classList.add("invalid");
        icon.className = "fa-regular fa-circle";
    }
}