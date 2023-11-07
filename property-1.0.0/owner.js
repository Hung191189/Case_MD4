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
let API_USER = "http://localhost:8080/api/users"
let API_HOME = "http://localhost:8080/homes"
let API_IMAGE = "http://localhost:8080/images"
let API_HISTORY_BILL = "http://localhost:8080/historybills"
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
    showAllHouse()
    loadUser()
})

function loadUser() {
    let curUser = JSON.parse(localStorage.getItem("currentUser"))
    document.getElementById("a").innerHTML = `<a href="scss/index.html" id="user" class="logo m-0 float-start">${curUser.name}</a>`;
    document.getElementById("b").innerHTML = `<img id="img" style="margin-left: 20px; width: 41px"
                            src=${curUser.image}
                            class="rounded-circle"
                            height="41"
                            alt="Black and White Portrait of a Man"
                            loading="lazy"
                />`;
}

function showAllHouse() {
    document.getElementById("house-slider").innerHTML = "Danh sách này rỗng!!!";
    Promise.all([
        axios.get(API_HOME,axiosConfig),
        axios.get(API_IMAGE,axiosConfig)
    ])
    .then((res) => {
        let listHome = res[0].data;
        let listImg = res[1].data;
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
                <input type="hidden" value="${listHome[i].id}"> 
                    <div class="price mb-2"><span id="name-home">${listHome[i].name}</span></div>
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
                            <a class="btn btn-primary py-2 px-3" onclick="showHomeDetail(${listHome[i].id})">See details</a>
                        </div>
                    </div>
                </div>
            `
        }
        document.getElementById("house-slider").innerHTML = str;
    })
}
function saveNewImage(nameHome) {
    const fileInput = document.getElementById("house-img");
    const files = Array.from(fileInput.files);

    // Tạo một mảng chứa các Promise của việc tải lên các ảnh
    const uploadPromises = files.map((file) => {
        // Tạo tham chiếu đến nơi bạn muốn lưu trữ ảnh trong Storage
        const storageRef = storage.ref("images/" + file.name);

        // Tải file lên Firebase Storage và trả về Promise của việc lấy URL
        return storageRef.put(file).then((snapshot) => {
            console.log("Uploaded a file: " + file.name);
            // Lấy URL của ảnh sau khi đã tải lên
            return storageRef.getDownloadURL();
        });
    });

    // Sử dụng Promise.all để đợi tất cả các Promise hoàn thành
    Promise.all(uploadPromises)
        .then((urls) => {
            // urls chứa một mảng các URL của các ảnh đã tải lên
            axios.get(API_HOME).then((res) => {
                let listHome = res.data
                for (let i = 0; i < listHome.length; i++) {
                    if (listHome[i].name === nameHome) {
                        for (let j = 0; j <urls.length; j++) {
                            let data = {
                                url: urls[j],
                                home:{
                                    id: listHome[i].id
                                }
                            }
                            axios.post(API_IMAGE,data,axiosConfig).then(() => {
                                console.log("save " + urls[j])
                            })
                        }
                    }
                }
            })
        })
        .catch((error) => {
            console.error("Error uploading files: ", error);
        });
}
function createNewHome() {
    let data = {}
    if (document.getElementById("house-id").value !==  null) {
        data = {
            id: document.getElementById("house-id").value,
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
    } else {
        data = {
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
    }
    axios.post(API_HISTORY_BILL, {
        price: document.getElementById("price").value,
        home: {
            id: document.getElementById("house-id").value
        }
    }).then(() => {
        console.log("Đã thay đổi giá nhà!")
    })
    axios.post(API_HOME,data,axiosConfig).then(() => {
        console.log("OK")
    })
}
function createNewHomeAndImg() {
    let nameHouse = document.getElementById("house-name").value
    createNewHome()
    setTimeout(saveNewImage(nameHouse),0)
}
function showHomeDetail(idHome) {
    document.getElementById("content2").innerHTML = ""
    document.getElementById("content1").innerHTML = `
                <div class="col-lg-6">
                    <h2 class="font-weight-bold text-primary heading" >Home Detail</h2>
                </div>
`
    let listImgOfHome = [];
    Promise.all([
        axios.get(API_HOME + "/" + idHome, axiosConfig),
        axios.get(API_IMAGE, axiosConfig)
    ])
.then((res) => {
        let home = res[0].data;
        let listImg = res[1].data;

    for (let i = 0; i < listImg.length; i++) {
        if (home.id === listImg[i].home.id) {
            console.log(listImg[i])
            listImgOfHome.push(listImg[i])
            // Hàm so sánh
            const compareById = (a, b) => {
                return b.id - a.id;
            };

            // Sắp xếp mảng
            listImgOfHome.sort(compareById);
        }
    }
    console.log(listImgOfHome[0])
    console.log(listImgOfHome[1])
    console.log(listImgOfHome[2])
    console.log(listImgOfHome[3])
    console.log(listImgOfHome[4])
    document.getElementById("content2").innerHTML = `
<div id="demo" class="carousel slide col-6" data-ride="carousel">

  <!-- Indicators -->
  <ul class="carousel-indicators">
    <li data-target="#demo" data-slide-to="0" class="active"></li>
    <li data-target="#demo" data-slide-to="1"></li>
    <li data-target="#demo" data-slide-to="2"></li>
    <li data-target="#demo" data-slide-to="3"></li>
    <li data-target="#demo" data-slide-to="4"></li>
  </ul>
  
  <!-- The slideshow -->
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src=${listImgOfHome[0].url} alt="Los Angeles" width="500" height="500">
    </div>
    <div class="carousel-item">
      <img src=${listImgOfHome[1].url} alt="Chicago" width="500" height="500">
    </div>
        <div class="carousel-item">
      <img src=${listImgOfHome[2].url} alt="Chicago" width="500" height="500">
    </div>
        <div class="carousel-item">
      <img src=${listImgOfHome[3].url} alt="Chicago" width="500" height="500">
    </div>
    <div class="carousel-item">
      <img src=${listImgOfHome[4].url} alt="New York" width="500" height="500">
    </div>
  </div>
  
  
  <!-- Left and right controls -->
  <a class="carousel-control-prev" href="#demo" data-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </a>
  <a class="carousel-control-next" href="#demo" data-slide="next">
    <span class="carousel-control-next-icon"></span>
  </a>
</div>
<div class="col-6 round3">
    <div class="row">
        <input type="hidden" id="home-id" value="${home.id}">
    </div>
    <div class="row">
        <div class="col-4 h4">House name:</div>
        <div class="col-8 h4">${home.name}</div>
    </div>
    <div class="row">
        <div class="col-4 h4">Number of bedroom:</div>
        <div class="col-8 h4">${home.bedroom}</div>
    </div>
    <div class="row">
        <div class="col-4 h4">Number of bathroom:</div>
        <div class="col-8 h4">${home.bathroom}</div>
    </div>
    <div class="row">
        <div class="col-4 h4">Address:</div>
        <div class="col-8 h4">${home.address}, ${home.ward}, ${home.district}, ${home.province}</div>
    </div>
    <div class="row">
        <div class="col-4 h4">Description</div>
        <div class="col-8 h4">${home.description}</div>
    </div>
    <div class="row">
        <div class="col-4 h4">Price:</div>
        <div class="col-8 h4">${home.price} $</div>
    </div>
    <div class="row">
        <div class="col-4 h4">Trạng thái:</div>
        <div class="col-8 h4">${(home.status === 1) ? 'Đang trống' : (home.status === 2) ? 'Đang được thuê' : 'Đang ngừng cho thuê'}</div>
    </div>
    <div class="row justify-content-lg-center">
        <div class="col-3 btn btn-primary h4" data-toggle="modal" data-target="#myModal" onclick="showFormEditHome(${home.id})">Edit</div>
<!--        <div class="col-3 btn btn-primary h4" data-toggle="modal" data-target="#editHome">Edit</div>-->
        <div class="col-3 btn btn-primary h4"  onclick="changeStatus3(${home.id})">Delete</div>
    </div>
</div>
    `
    })
}
function changeStatus3(idHome) {
    axios.delete(API_HOME + "/" + idHome,axiosConfig).then(() => {
    alert("Đã xóa!!!")
        location.reload()
    })
}
function showFormEditHome(idHome) {
    axios.get(API_HOME + "/" + idHome, axiosConfig).then((res) => {
        let home = res.data
        document.querySelector("#house-name").value = home.name
        document.querySelector("#beds").value = home.bedroom
        document.querySelector("#baths").value = home.bathroom
        document.querySelector("#house-address").value = home.address
        document.querySelector("#description").value = home.description
        document.querySelector("#price").value = home.price
        document.querySelector("#house-id").value = home.id
    })
}
function logOut() {
    localStorage.clear()
    window.location.href = 'giao_dien_home.html'
}
