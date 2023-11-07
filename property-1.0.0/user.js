let idLogin = localStorage.getItem("idLogin");
let getToken = localStorage.getItem("token");
let nameLogin = localStorage.getItem("nameLogin");

const axiosConfig = {
    headers: {
        'Authorization': `Bearer` + getToken // Thiết lập header 'Authorization' với giá trị token Bearer
        // 'Content-Type': 'application/json', // Có thể thay đổi kiểu dữ liệu nếu cần thiết
    }
};
const API_URL_HOME = "http://localhost:8080/homes"
let API_IMAGE = "http://localhost:8080/images";
let API_USER = "http://localhost:8080/api/users";

function findByProvince() {
    let province =
        document.getElementById("province").value
    Promise.all([
        axios.get(API_URL_HOME + "/" + "findByProvince" + "/" + province, axiosConfig),
        axios.get(API_IMAGE, axiosConfig)
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
            document.getElementById("showAllHome").innerHTML = str;
        })
}

function showAllHome() {
    document.getElementById("showAllHome").innerHTML = ""
    Promise.all([
        axios.get(API_URL_HOME, axiosConfig),
        axios.get(API_IMAGE, axiosConfig)
    ])
        .then((res) => {
            let listHome = res[0].data;
            let listImg = res[1].data;
            let str = "";
            str += `<div class = "container">
                <div class = "row">`

            for (let i = 0; i < listHome.length; i++) {
                str += `
            <div class = "col-3">
            <div class="property-item" style="margin-top: 10px " >`
                for (let j = 0; j < listImg.length; j++) {
                    if (listImg[j].home.id === listHome[i].id) {
                        str += `
                    <a href="property-single.html" class="img"><img src="${listImg[j].url}" alt="Image" class="img-fluid" style="width: 100%; height: 200px " /></a>`;
                        break;
                    }
                }

                str += `
                <div class="property-content"  style="margin-top: 0px">
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
                            <a onclick="viewHomeDetail(${listHome[i].id})" class="btn btn-primary py-2 px-3">See details</a>
                        </div>
                    </div>
                </div>
                </div>
            `
            }
            str += `</div>`
            str += `</div>`
            document.getElementById("showAllHome").innerHTML = str;
        })
}

function loadUser() {
    axios.get(API_USER + "/" + idLogin).then((res) => {
        let curUser = res.data
        console.log(curUser)
        document.getElementById("a").innerHTML = `<span id="user" class="logo m-0 float-start" onclick="showAdminDetail(${curUser.id})">${curUser.name}</span>`;
        document.getElementById("b").innerHTML = `<img id="img" style="margin-left: 20px; width: 41px"
                            src=${curUser.image}
                            class="rounded-circle"
                            height="41"
                            alt="Black and White Portrait of a Man"
                            loading="lazy"
                />`;
    })
}

function showAdminDetail(id) {
    document.getElementById('id01').style.display = 'block'
    axios.get('http://localhost:8080/api/users' + '/' + id).then((res) => {
        let list = res.data
        let str = `<div class="section">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-lg-7">
            <div class="img-property-slide-wrap">
              <div class="img-property-slide" style="margin-right: 0">
                <img src="${list.image}" alt="Image" class="img-fluid" />
              </div>
            </div>
          </div>
          <div class="col-lg-4" style="margin-left: 0">
            <h2 class="heading text-primary"><b>${list.name}</b></h2>
            <h2 class="heading text-primary">Age: ${list.age}</h2>
            <h2 class="heading text-primary">Gender: ${list.sex}</h2>
            <h2 class="heading text-primary">Phone: ${list.phone}</h2>
            <h2 class="heading text-primary">Address: ${list.address}</h2>
          `
        if (id == idLogin) {
            str += `<button type="button" class="btn btn-primary" style="background-color: #0d6efd" onclick="showEditUser(${list.id})">Edit Profile</button>`
        }
        str += `</div>
        </div>
      </div>
    </div>`
        document.getElementById("showProfile").innerHTML = str

    })
}

loadUser();
// showAllHome();

function showEditUser(id) {

    document.getElementById('id01').style.display = 'none'
    document.getElementById('id02').style.display = 'block'
    axios.get('http://localhost:8080/api/users' + '/' + id).then((res) => {
        let user = res.data;
        let str = '';
        console.log(user);
        str += `<div class="modal_overlay" style="text-align: center">
                    <div class="image_editImage" style="text-align: center; margin-bottom: 10px">
            <img src="${user.image}" alt="no image" style="width: 100px; height: 100px; border-radius: 50%; text-align: center" id="oldImage">
            <input value="${user.image}" type="file" id="newImage">
        </div>
        <div class="info_edit" style="margin-bottom: 10px; margin-top: 10px; text-align: center; display: flex">
            <h3 style="margin-left: 20px">Name <input type="text" id="nameEdit" value="${user.name}" style="width: 300px; height: 30px; margin-right: 20px"></h3>
            <h3 style="margin-left: 40px">Age <input type="number" id="ageEdit" value="${user.age}" style="width: 300px; height: 30px;"></h3>
        </div>
        <div class="info_edit" style="margin-bottom: 10px; margin-top: 10px; text-align: center; display: flex">
            <h3 style="margin-left: 20px">Phone <input type="number" id="phoneEdit" value="${user.phone}" style="width: 300px; height: 30px; margin-right: 20px"></h3>
            <h3>Gender <input type="text" id="genderEdit" value="${user.sex}" style="width: 300px; height: 30px;"></h3>
        </div>
        <div class="info_edit" style="margin-bottom: 10px; margin-top: 10px; text-align: center; display: flex">
            <h3>Address <input type="text" id="addressEdit" value="${user.address}" style="width: 707px; height: 30px; margin-right: 20px"></h3>
        </div>
        <div class="info_edit" style="margin-bottom: 10px; margin-top: 10px; text-align: center; display: flex;">
            <h3>New Password &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="password" id="passwordEdit" style="width: 300px; height: 30px; margin-right: 50px"></h3>
        </div>
        <div class="info_edit" style="margin-bottom: 10px; margin-top: 10px; text-align: center; display: flex;">
            <h3>Confirm Password <input type="password" id="confirmPasswordEdit" style="width: 300px; height: 30px; margin-right: 20px"></h3>
        </div>
        <button class="btn btn-primary" style="background-color: #0d6efd; margin-bottom: 40px" onclick="confirmEdit(${user.id})">Save Profile</button>
                </div>
                `
        document.getElementById('modal_register').innerHTML = str

        const fileInput = document.getElementById("newImage");
        const previewImage = document.getElementById("oldImage");
        fileInput.addEventListener("change", function () {
            const selectedFile = fileInput.files[0];

            if (selectedFile) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    previewImage.src = e.target.result;
                };
                reader.readAsDataURL(selectedFile);
            } else {
                previewImage.src = "${user.image}";
            }
        });
    })
}


function confirmEdit(id) {
    let password = document.getElementById("passwordEdit").value;
    let confirm_pass_word = document.getElementById("confirmPasswordEdit").value;
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    if (password == confirm_pass_word) {
        let newImage = document.getElementById("newImage").value;
        if (newImage === "") {
            axios.get('http://localhost:8080/api/users/' + idLogin, config).then((res) => {
                let user = res.data
                newImage = user.image
                let user1 = {
                    id: id,
                    name: document.getElementById("nameEdit").value,
                    age: document.getElementById("ageEdit").value,
                    sex: document.getElementById("genderEdit").value,
                    phone: document.getElementById("phoneEdit").value,
                    address: document.getElementById("addressEdit").value,
                    userName: nameLogin,
                    image: newImage,
                    password: password,
                    advertisementSet: [
                        {
                            id: 1
                        }
                    ],
                    confirmPassword: confirm_pass_word,
                    enabled: true
                }
                axios.put("http://localhost:8080/api/" + "users", user1).then((response) => {
                    alert("update thành công")
                    window.location.href = 'user.html'
                })
            });
        } else {

            const fileInput = document.getElementById("newImage");
            // const imageURL = document.getElementById("imageURL");
            // Lấy file hình ảnh từ input
            const file = fileInput.files[0];
            // Tạo tham chiếu đến nơi bạn muốn lưu trữ ảnh trong Storage
            const storageRef = storage.ref("images/" + file.name);
            // Tải file lên Firebase Storage
            storageRef.put(file).then((snapshot) => {
                // console.log("Uploaded a file!");
                // Lấy URL của ảnh sau khi đã tải lên
                storageRef.getDownloadURL().then((url) => {
                    let user = {
                        id: id,
                        name: document.getElementById("nameEdit").value,
                        age: document.getElementById("ageEdit").value,
                        sex: document.getElementById("genderEdit").value,
                        phone: document.getElementById("phoneEdit").value,
                        address: document.getElementById("addressEdit").value,
                        userName: nameLogin,
                        image: url,
                        password: password,
                        advertisementSet: [
                            {
                                id: 1
                            }
                        ],
                        confirmPassword: confirm_pass_word,
                        enabled: true
                    }
                    axios.put("http://localhost:8080/api/" + "users", user).then((response) => {
                        alert("update thành công")
                        window.location.href = 'hadz_admin.html'
                    })

                });
            });
        }

    } else {
        alert("Xác nhận mật khẩu chưa đúng")
    }
}

function showCarousel() {
    Promise.all([axios.get(API_URL_HOME, axiosConfig),
        axios.get(API_IMAGE, axiosConfig)]).then((res) => {
        let list_home = res[0].data;
        let list_img = res[1].data;

        let str = "";
        for (let i = 0; i < listHome.length; i++) {
            str += "<div class=\"property-item\">\n" +
                "                                <a class=\"img\">\n" +
                "                                    <img style=\"width: 412px; height: 412px\" src=\"images/img_5.jpg\" id=\"img_" + list_home[i].id +"\" alt=\"Image\" class=\"img-fluid\"/>\n" +
                "                                </a>\n" +
                "\n" +
                "                                <div class=\"property-content\">\n" +
                "                                    <div class=\"price mb-2\"><span>" + "$" +list_home[i].price +"</span></div>\n" +
                "                                    <div>\n" +
                "                      <span class=\"d-block mb-2 text-black-50\"\n" +
                "                      >" + list_home[i].province + ", " +list_home[i].district + ", " + list_home[i].ward +"</span\n" +
                "                      >\n" +
                "                                        <span class=\"city d-block mb-3\">" + list_home[i].address +"</span>\n" +
                "\n" +
                "                                        <div class=\"specs d-flex mb-4\">\n" +
                "                        <span class=\"d-block d-flex align-items-center me-3\">\n" +
                "                          <span class=\"icon-bed me-2\"></span>\n" +
                "                          <span class=\"caption\">" + list_home[i].bathroom +"</span>\n" +
                "                        </span>\n" +
                "                                            <span class=\"d-block d-flex align-items-center\">\n" +
                "                          <span class=\"icon-bath me-2\"></span>\n" +
                "                          <span class=\"caption\">" + list_home[i].bedroom +"</span>\n" +
                "                        </span>\n" +
                "                                        </div>\n" +
                "\n" +
                "                                        <a onclick=\"\" class=\"btn btn-primary py-2 px-3\">See Home</a>\n" +
                "                                    </div>\n" +
                "                                </div>\n" +
                "                            </div>"

    }
        for (let j = 0; j < list_img.length; j++) {
            if (list_img[j].url == null){
                list_img[j].url = "images/img_5.jpg";
            }
            console.log("nháy = " + list_img[j].home.id)
            document.getElementById("img_" + list_img[j].home.id).src = list_img[j].url;
        }
        document.getElementById("showCarousel").innerHTML = str;
})
}
showCarousel();

function logOut() {
    localStorage.clear();
    window.location.href = "giao_dien_home.html";
}

function viewHomeDetail(idHome) {
    document.getElementById("content2").innerHTML = ""
    document.getElementById("showAllHome").innerHTML = `
                <div class="col-lg-6">
                    <h2 class="font-weight-bold text-primary heading" >Home Detail</h2>
                </div>
`
    let listImgOfHome = [];
    Promise.all([
        axios.get(API_URL_HOME + "/" + idHome, axiosConfig),
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
        <div class="col-3 btn btn-primary h4"  onclick="changeStatus3(home)">Delete</div>
    </div>
</div>
    `
        })
}
function showAllHomeByStatus(){
    document.getElementById("showAllHome").innerHTML = ""
    Promise.all([
        axios.get(API_URL_HOME + "/" + "findValid", axiosConfig),
        axios.get(API_IMAGE, axiosConfig)
    ])
        .then((res) => {
            let listHome = res[0].data;
            let listImg = res[1].data;
            let str = "";
            str += `<div class = "container">
                <div class = "row">`

            for (let i = 0; i < listHome.length; i++) {
                str += `
            <div class = "col-3">
            <div class="property-item" style="margin-top: 10px " >`
                for (let j = 0; j < listImg.length; j++) {
                    if (listImg[j].home.id === listHome[i].id) {
                        str += `
                    <a href="property-single.html" class="img"><img src="${listImg[j].url}" alt="Image" class="img-fluid" style="width: 100%; height: 200px " /></a>`;
                        break;
                    }
                }

                str += `
                <div class="property-content"  style="margin-top: 0px">
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
                            <a onclick="viewHomeDetail(${listHome[i].id})" class="btn btn-primary py-2 px-3">See details</a>
                        </div>
                    </div>
                </div>
                </div>
            `
            }
            str += `</div>`
            str += `</div>`
            document.getElementById("showAllHome").innerHTML = str;
        })
}
showAllHomeByStatus();