const Username = document.querySelector("#username");
const Password = document.querySelector("#password");
const form = document.querySelector("form");
const btn_login = document.querySelector(".btn_Login");
const errorlogin = document.querySelector(".erorrlogin");

function showError(input, message) {
    let parent = input.parentElement;
    let small = parent.querySelector("small");
    parent.classList.add("error");
    small.innerText = message;
}

function showSuccess(input) {
    let parent = input.parentElement;
    let small = parent.querySelector("small");
    parent.classList.remove("error");
    small.innerText = "";
}

function checkEmptyError(listInput) {
    let isValid = true;

    listInput.forEach(input => {
        input.value = input.value.trim();
        if (!input.value) {
            showError(input, "Không được để trống");
            isValid = false;
        } else {
            showSuccess(input);
        }
    });

    return isValid;
}

function getUserdatafromLocalStorage() {
    let Users;
    // truy xua du lieu
    var storedUserData = localStorage.getItem("Users");

    if (storedUserData) {
        Users = JSON.parse(storedUserData);
    } else {
        Users = [];
    }

    return Users;
}

function CheckUsernamePassword(username, password) {
    let Users = getUserdatafromLocalStorage();
    let userFound = Users.find(user => user.Username === username && user.Password === password);

    if (userFound) {
        alert("ĐĂNG NHẬP THÀNH CÔNG");
        window.location.href = "https://www.facebook.com/profile.php?id=61554746022232";
    } else {
        if (username && password) {
            errorlogin.innerText = "Tài khoản hoặc mật khẩu không chính xác";
        } else {
            errorlogin.innerText = "";
        }
    }
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (checkEmptyError([Username, Password])) {
        CheckUsernamePassword(Username.value, Password.value);
    }
});
