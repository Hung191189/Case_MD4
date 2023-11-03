let API_USER = "http://localhost:8080/api/users";
// localStorage.setItem("nameLogin", "dat2")
// localStorage.setItem("idLogin", "2")
// localStorage.setItem("token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXQyIiwiaWF0IjoxNjk4OTc1OTc2LCJleHAiOjg4MDk4OTc1OTc2fQ.03fZhgd6VMh5zgHqlOpGhAJRWzEsg7mVi9uNOMXbNA6kiFUBcRcQHs7ywyIQfStZ2Ic12bU5Mv12llmXz4YC4g")
function getToken() {
    return localStorage.getItem("token")
}
function getIdLogin() {
    return localStorage.getItem("idLogin")
}
const axiosConfig = {
    headers: {
        'Authorization': `Bearer` + getToken(), // Thiết lập header 'Authorization' với giá trị token Bearer
        'Content-Type': 'application/json', // Có thể thay đổi kiểu dữ liệu nếu cần thiết
    }
};
let currentUser = localStorage.getItem("currentUser");
axios.get(API_USER + "/" + getIdLogin(),axiosConfig).then((res) => {
    localStorage.setItem("currentUser",JSON.stringify(res.data));
})
let curUser = JSON.parse(localStorage.getItem("currentUser"))
console.log(curUser)

function loadUser() {
    document.getElementById("a").innerHTML = `<a href="scss/index.html" id="user" class="logo m-0 float-start">${curUser.name}</a>`;
    document.getElementById("b").innerHTML = `<img id="img" style="margin-left: 20px; width: 41px"
                            src=${curUser.image}
                            class="rounded-circle"
                            height="41"
                            alt="Black and White Portrait of a Man"
                            loading="lazy"
                />`;
}
loadUser()