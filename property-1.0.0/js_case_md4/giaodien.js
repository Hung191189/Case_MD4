let URL = "http://localhost:8080/api/"
let token = localStorage.getItem("token");
function showForm() {
document.getElementById("modal").style.display = "flex";
}
function home(){
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
    axios.post(URL+ "users/login", user, token).then((response) =>{
        alert("đng nhập thành công")
        console.log(response.data)
        console.log("role = "+ response.data.roles[0].authority)
        localStorage.setItem("token", response.data.accessToken);
        if (response.data.roles[0].authority === "ROLE_ADMIN"){
            console.log("admin")
        } else if (response.data.roles[0].authority === "ROLE_USER"){
            console.log("user")
        } else {
            console.log("chủ nhà")
        }
    })
    event.preventDefault()
}