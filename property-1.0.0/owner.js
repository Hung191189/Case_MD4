//Cấu hình firebase
const firebaseConfig = {
    apiKey: "AIzaSyBhmULDIPWa_gvIGuZFLmAzIG4_BXXeYgY",
    authDomain: "blog-bb78f.firebaseapp.com",
    projectId: "blog-bb78f",
    storageBucket: "blog-bb78f.appspot.com",
    messagingSenderId: "769600865870",
    appId: "1:769600865870:web:7c322e5ebe6adfc242a51f",
}
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
// ----------
let API_USER = "http://localhost:8080/api/users";
let API_HOME = "http://localhost:8080/homes";
let API_IMAGE = "http://localhost:8080/images";
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
        'Authorization': `Bearer` + getToken() // Thiết lập header 'Authorization' với giá trị token Bearer
        // 'Content-Type': 'application/json', // Có thể thay đổi kiểu dữ liệu nếu cần thiết
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
showAllHouse()
function showAllHouse() {
    document.getElementById("house-slider").innerHTML = "Danh sách này rỗng!!!";
    Promise.all([
        axios.get(API_HOME,axiosConfig),
        axios.get(API_IMAGE,axiosConfig)
    ])
    .then((res) => {
        let listHome = res[0].data;
        let listImg = res[1].data;
        let listImgOfHome;
        let str = "";
        for (let i = 0; i < listHome.length; i++) {
            str += `
            <div class="property-item">`
            for (let j = 0; j < listImg.length; j++) {
                if (listImg[j].home.id === listHome[i].id) {
                    str += `
                    <a href="property-single.html" class="img"><img src="${listImg[j].url}" alt="Image" class="img-fluid" /></a>`;
                    break;
                }
            }
            str += `
                <div class="property-content">
                    <div class="price mb-2"><span>${listHome[i].name}</span></div>
                        <div>
                            <span class="d-block mb-2 text-black-50" style="height: 30px">${listHome[i].address}</span>
                            <span class="city d-block mb-3">${listHome[i].province}</span>
                            <div class="specs d-flex mb-4">
                                <span class="d-block d-flex align-items-center me-3">
                                    <span class="icon-bed me-2"> ${listHome[i].bedroom} Beds</span>
                                    <span class="caption"></span>
                                </span>
                                <span class="d-block d-flex align-items-center">
                                    <span class="icon-bath me-2"> ${listHome[i].bathroom} Baths</span>
                                    <span class="caption"></span>
                                </span>
                            </div>
                            <a href="property-single.html" class="btn btn-primary py-2 px-3">See details</a>
                        </div>
                    </div>
                </div>
            `
        }
        document.getElementById("house-slider").innerHTML = str;
    })
}

function createNewHome() {
    let data = {
        name: document.getElementById("house-name").value,
        bathroom: document.getElementById("baths").value,
        bedroom: document.getElementById("beds").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        province: document.getElementById("city").value,
        district: document.getElementById("district").value,
        ward: document.getElementById("ward").value,
        address: document.getElementById("house-address").value,
        user:
            {
                id: localStorage.getItem("idLogin")
            }
    }
    axios.post(API_HOME,data,axiosConfig).then(() => {
        console.log("Tạo mới home")
    })
}
