let URL = "http://localhost:8080/api/"
let token = localStorage.getItem("token");
let idLogin = localStorage.getItem("idLogin");
let nameLogin = localStorage.getItem("nameLogin");

function showForm() {
    document.getElementById("modal").style.display = "flex";
}

function showFormRegister() {
    document.getElementById("modal_register").style.display = "flex";
}

function home() {
    document.getElementById("modal").style.display = "none";
}

function login() {
    let userName = document.getElementById("user_name").value;
    let passWord = document.getElementById("pass_word").value;
    console.log("xxxxxxxxxx")
    let user = {
        userName: userName,
        password: passWord
    }
    axios.post(URL + "users/login", user).then((response) => {
        alert("đăng nhập thành công")

        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("idLogin", response.data.id);
        localStorage.setItem("nameLogin", response.data.username);

        if (response.data.roles[0].authority === "ROLE_ADMIN") {
            console.log("admin")
        } else if (response.data.roles[0].authority === "ROLE_USER") {
            console.log("user")
        } else {
            console.log("chủ nhà")
        }
    })
    event.preventDefault()
}

function register() {

}