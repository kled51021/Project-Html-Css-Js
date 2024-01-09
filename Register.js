var username = document.querySelector("#username");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var confirm_password = document.querySelector("#confirm-password");
var form = document.querySelector("form");

function showError(input, message) {
    let parentEl = input.parentElement;
    let smallCard = parentEl.querySelector("small");
    parentEl.classList.add("error");
    smallCard.innerText = message;
}

function showSuccess(input) {
    let parentEl = input.parentElement;
    let smallCard = parentEl.querySelector("small");
    parentEl.classList.remove("error");
    smallCard.innerText = "";
}

function checkEmptyError(listInput) {
    let isEmptyError = false;
    listInput.forEach((input) => {
        input.value = input.value.trim();
        if (!input.value) {
            isEmptyError = true;
            showError(input, "Không được để trống");
        } else {
            showSuccess(input);
        }
    });
    return isEmptyError;
}

function checkEmailError(input) {
    let regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    input.value = input.value.trim();
    let isEmailError = false;
    if (regexEmail.test(input.value)) {
        showSuccess(input);
    } else {
        if (!input.value) {
            showError(input, "Không được để trống");
        } else {
            showError(input, "Email Không hợp lệ");
            isEmailError = true;
        }
    }
    return isEmailError;
}

function CheckLengthError(input, min, max) {
    input.value = input.value.trim();
    if (!input.value) {
        showError(input, "Không được để trống");
        return true;
    } else {
        if (input.value.length < min) {
            showError(input, `Phải có ít nhất ${min} kí tự`);
            return true;
        }
        if (input.value.length > max) {
            showError(input, `Không được quá ${max} kí tự`);
            return true;
        }
        showSuccess(input);
        return false;
    }
}

function CheckPasswordError(input) {
    let regexPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,12}$/;
    if (regexPassword.test(input.value)) {
        showSuccess(input);
    } else {
        if (!input.value) {
            showError(input, "Không được để trống");
        } else {
            showError(
                input,
                "Mật khẩu phải có độ dài từ 5 đến 12 kí tự có chữ thường in hoa số và kí tự đặc biệt"
            );
        }
    }
}

function CheckmatchPasswordError(passwordInput, ConfirmpasswordInput) {
    if (passwordInput.value !== ConfirmpasswordInput.value) {
        showError(ConfirmpasswordInput, "Mật khẩu không trùng khớp");
        return true;
    }
    return false;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isEmptyError = checkEmptyError([username, email, password, confirm_password]);
    let isEmailError = checkEmailError(email);
    let IsUsernameLengthError = CheckLengthError(username, 5, 10);
    let isPasswordError = CheckPasswordError(password);
    let ismatchPasswordError = CheckmatchPasswordError(password, confirm_password);

    if (isEmptyError || isEmailError || IsUsernameLengthError || isPasswordError || ismatchPasswordError) {
        return; // Don't proceed with submission if there are errors
    }

    // Retrieve existing user data from localStorage or initialize an empty array
    let users = JSON.parse(localStorage.getItem("Users")) || [];

    // Add the new user data
    users.push({
        Username: username.value,
        Email: email.value,
        Password: password.value
    });

    // Save the updated user data back to localStorage
    localStorage.setItem("Users", JSON.stringify(users));
    window.location.href = "Login.html"
});
