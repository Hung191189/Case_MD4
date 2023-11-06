let token = localStorage.getItem("token");
let idLogin = localStorage.getItem("idLogin");
let nameLogin = localStorage.getItem("nameLogin");
let imageLogin = localStorage.getItem("image");
let nameUserLogin = localStorage.getItem("name")


const axiosConfig = {
    headers: {
        'Authorization': `Bearer` + token, // Thiết lập header 'Authorization' với giá trị token Bearer
        'Content-Type': 'application/json', // Có thể thay đổi kiểu dữ liệu nếu cần thiết
    }
};


axios.get('http://localhost:8080/api/users' + "/" + idLogin, axiosConfig).then((res)=>{
    let data = res.data
    localStorage.setItem("image", data.image)
    localStorage.setItem("name", data.name)
})

showInfoLogin()
function showInfoLogin() {
    axios.get('http://localhost:8080/api/users/' + idLogin).then((res)=>{
        let user = res.data
        document.getElementById("a").innerHTML = `<a style="cursor: pointer" onclick="showAdminDetail(idLogin)" id="user" class="logo m-0 float-start">${user.name}</a>`;
        document.getElementById("b").innerHTML = `<img id="img"
                            src=${user.image}
                            class="rounded-circle"
                            height="41"
                            alt="Black and White Portrait of a Man"
                            loading="lazy"
                style="margin-left: 20px"/>`;
    })
}
showAdmin()

function showAdmin() {
    document.getElementById('showOption').innerHTML= `<h1 class="heading" data-aos="fade-up">
                        Enter The Admin Name You Want To Find
                    </h1>
                        <div style="display: flex">
                            <input
                                    type="text"
                                    class="form-control px-4"
                                    placeholder="Name Admin..."
                                    id="nameAdminSearch"
                                    style="border-radius: 30px"
                            />
                            <button type="submit" class="btn btn-primary" onclick="searchAdmin()">Search</button>
                        </div>
                    `

    axios.get('http://localhost:8080/api/users', axiosConfig).then((res)=>{
        let list = res.data;
        let str = `<div class="container">
        <div class="row justify-content-center text-center mb-5">
            <div class="col-lg-6 mb-5">
                <h2 class="font-weight-bold heading text-primary mb-4" style="margin-bottom: 20px">
                    List Admin
                </h2>
                <p class="text-black-50">
                    Hội mực lệch cân điêu.
                </p>
            </div>
        </div>
        <div class="row">`
        for (let i = 0; i<list.length; i++) {
            if (list[i].roles[0].name === "ROLE_ADMIN") {
                str += `<div class="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0" style="margin-top: 60px">
                <div class="h-100 person">
                    <img
                            src="${list[i].image}"
                            alt="Image"
                            class="img-fluid"
                    />

                    <div class="person-contents">
                        <h2 class="mb-0"><a style="cursor: pointer" data-target="#modal_profile" onclick="showAdminDetail(${list[i].id})"><b>${list[i].name}</b></a></h2>
                        <ul class="social list-unstyled list-inline dark-hover">
                            <div style="margin-top: 20px">
                                <li class="list-inline-item">
                                    <a href="https://www.facebook.com/zuck"><span class="icon-facebook"></span></a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="https://www.youtube.com/"><span class="icon-github"></span></a>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>`
            }
        }
        str += `</div>
    </div>`
        document.getElementById('abc').innerHTML = str
    })
}

function searchAdmin(){
    axios.get('http://localhost:8080/api/users', axiosConfig).then((res)=>{
        let list = res.data
        let listAdmin = []
        let name = document.getElementById("nameAdminSearch").value;
        if (name === ""){
            return
        } else {
            for (let i = 0; i<list.length; i++) {
                if (list[i].name.includes(name) && list[i].roles[0].name === "ROLE_ADMIN") {
                    listAdmin.push(list[i])
                }
            }
            console.log(listAdmin)
            if (listAdmin.length === 0) {
                document.getElementById("abc").innerHTML = "<h2 style='text-align: center'><b>Không có admin nào có tên bạn đang tìm</b></h2>"
                document.getElementById("nameAdminSearch").value = ""
            } else {
                let str = `<div class="container">
        <div class="row justify-content-center text-center mb-5">
            <div class="col-lg-6 mb-5">
                <h2 class="font-weight-bold heading text-primary mb-4" style="margin-bottom: 20px">
                    List Admin
                </h2>
                <p class="text-black-50">
                    Hội mực lệch cân điêu.
                </p>
            </div>
        </div>
        <div class="row">`
                for (let j = 0; j<listAdmin.length; j++) {
                    str += `<div class="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0" style="margin-top: 60px">
                    <div class="h-100 person">
                        <img
                                src="${listAdmin[j].image}"
                                alt="Image"
                                class="img-fluid"
                        />
    
                        <div class="person-contents">
                            <h2 class="mb-0"><a style="cursor: pointer" data-target="#modal_profile" onclick="showAdminDetail(${listAdmin[j].id})"><b>${listAdmin[j].name}</b></a></h2>
                            <ul class="social list-unstyled list-inline dark-hover">
                                <div style="margin-top: 20px">
                                    <li class="list-inline-item">
                                        <a href="https://www.facebook.com/zuck"><span class="icon-facebook"></span></a>
                                    </li>
                                    <li class="list-inline-item">
                                        <a href="https://www.youtube.com/"><span class="icon-github"></span></a>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>`
                }
                str += `</div>
    </div>`
                document.getElementById('abc').innerHTML = str
                document.getElementById("nameAdminSearch").value = ""
            }
        }


    });
}

function searchOwner() {
    axios.get('http://localhost:8080/api/users', axiosConfig).then((res)=>{
        let list = res.data
        let listOwner = []
        let name = document.getElementById("nameOwnerSearch").value;
        if (name === ""){
            return
        } else {
            for (let i = 0; i<list.length; i++) {
                if (list[i].name.includes(name) && list[i].roles[0].name === "ROLE_OWNER") {
                    listOwner.push(list[i])
                }
            }
            if (listOwner.length === 0) {
                document.getElementById("abc").innerHTML = "<h2 style='text-align: center'><b>Không có Owner nào có tên bạn đang tìm</b></h2>"
                document.getElementById("nameOwnerSearch").value = ""
            } else {
                let str = `<div class="container">
        <div class="row justify-content-center text-center mb-5">
            <div class="col-lg-6 mb-5">
                <h2 class="font-weight-bold heading text-primary mb-4" style="margin-bottom: 20px">
                    List Owner
                </h2>
                <p class="text-black-50">
                </p>
            </div>
        </div>
        <div class="row">`
                for (let j = 0; j<listOwner.length; j++) {
                    str += `<div class="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0" style="margin-top: 60px">
                    <div class="h-100 person">
                        <img
                                src="${listOwner[j].image}"
                                alt="Image"
                                class="img-fluid"
                        />
    
                        <div class="person-contents">
                            <h2 class="mb-0"><a style="cursor: pointer" data-target="#modal_profile" onclick="showOwnerDetail(${listOwner[j].id})"><b>${listOwner[j].name}</b></a></h2>
                            <ul class="social list-unstyled list-inline dark-hover">
                                <div style="margin-top: 20px">
                                    <li class="list-inline-item">
                                        <a href="https://www.facebook.com/zuck"><span class="icon-facebook"></span></a>
                                    </li>
                                    <li class="list-inline-item">
                                        <a href="https://www.youtube.com/"><span class="icon-github"></span></a>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>`
                }
                str += `</div>
    </div>`
                document.getElementById('abc').innerHTML = str
                document.getElementById("nameOwnerSearch").value = ""
                document.getElementById("xyz").value = ""
            }
        }
    });
}
function showOwner(){
    document.getElementById('showOption').innerHTML= `<h1 class="heading" data-aos="fade-up">
                        Enter The Owner Name You Want To Find
                    </h1>
                        <div style="display: flex">
                            <input
                                    type="text"
                                    class="form-control px-4"
                                    placeholder="Name Owner..."
                                    id="nameOwnerSearch"
                                    style="border-radius: 30px"
                            />
                            <button type="submit" class="btn btn-primary" onclick="searchOwner()">Search</button>
                        </div>
                    `
    axios.get('http://localhost:8080/api/users', axiosConfig).then((res)=>{
        let list = res.data;
        let str = `<div class="container">
        <div class="row justify-content-center text-center mb-5">
            <div class="col-lg-6 mb-5">
                <h2 class="font-weight-bold heading text-primary mb-4" style="margin-bottom: 20px">
                    List Owner Valid
                </h2>
                <p class="text-black-50">
                
                </p>
            </div>
        </div>
        <div class="row">`
        let str2 = `<div class="container">
        <div class="row justify-content-center text-center mb-5">
            <div class="col-lg-6 mb-5">
                <h2 class="font-weight-bold heading text-primary mb-4" style="margin-bottom: 20px">
                    List Owner Illegal
                </h2>
                <p class="text-black-50">
                
                </p>
            </div>
        </div>
        <div class="row">`
        for (let i = 0; i<list.length; i++) {
            if (list[i].roles[0].name === "ROLE_OWNER") {
                if (list[i].enabled === true) {
                    str += `<div class="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0" style="margin-top: 60px">
                <div class="h-100 person">
                    <img
                            src="${list[i].image}"
                            alt="Image"
                            class="img-fluid"
                    />

                    <div class="person-contents">
                        <h2 class="mb-0"><a style="cursor: pointer" data-target="#modal_profile" onclick="showOwnerDetail(${list[i].id})"><b>${list[i].name}</b></a></h2>
                        <ul class="social list-unstyled list-inline dark-hover">
                            <div style="margin-top: 20px">
                                <li class="list-inline-item">
                                    <a href="https://www.facebook.com/zuck"><span class="icon-facebook"></span></a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="https://www.youtube.com/"><span class="icon-github"></span></a>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>`
                } else {
                    str2 += `<div class="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0" style="margin-top: 60px">
                <div class="h-100 person">
                    <img
                            src="${list[i].image}"
                            alt="Image"
                            class="img-fluid"
                    />

                    <div class="person-contents">
                        <h2 class="mb-0"><a style="cursor: pointer" data-target="#modal_profile" onclick="showOwnerDetail(${list[i].id})"><b>${list[i].name}</b></a></h2>
                        <ul class="social list-unstyled list-inline dark-hover">
                            <div style="margin-top: 20px">
                                <li class="list-inline-item">
                                    <a href="https://www.facebook.com/zuck"><span class="icon-facebook"></span></a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="https://www.youtube.com/"><span class="icon-github"></span></a>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>`
                }
            }
        }
        str += `</div>
    </div>`
        str2 += `</div>
    </div>`
        document.getElementById('abc').innerHTML = str
        document.getElementById('xyz').innerHTML = str2
    })

}
function showOwnerDetail(id) {
    document.getElementById('id01').style.display='block'
    axios.get('http://localhost:8080/api/users' + '/' + id).then((res)=>{
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
        if (list.enabled === true) {
            str += `<button class="btn btn-primary" style="background-color: #0d6efd" onclick="deleteUser(${list.id})">Delete Owner</button>`
        } else {
            str += `<button class="btn btn-primary" style="background-color: #0d6efd" onclick="restoreUser(${list.id})">Restore Owner</button>`
        }
        str += `</div>
        </div>
      </div>
    </div>`
        document.getElementById("showProfile").innerHTML = str

    })
}
function deleteUser(id) {

}
function restoreUser(id) {

}

function searchUser(){

}

function showUserDetail(id) {
    document.getElementById('id01').style.display='block'
    axios.get('http://localhost:8080/api/users' + '/' + id).then((res)=>{
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
        if (list.enabled === true) {
            str += `<button class="btn btn-primary" style="background-color: #0d6efd" onclick="deleteUser(${list.id})">Delete User</button>`
        } else {
            str += `<button class="btn btn-primary" style="background-color: #0d6efd" onclick="restoreUser(${list.id})">Restore User</button>`
        }
        str += `</div>
        </div>
      </div>
    </div>`
        document.getElementById("showProfile").innerHTML = str

    })
}
function showUser(){
    document.getElementById('showOption').innerHTML= `<h1 class="heading" data-aos="fade-up">
                        Enter The UserName You Want To Find
                    </h1>
                        <div style="display: flex">
                            <input
                                    type="text"
                                    class="form-control px-4"
                                    placeholder="Name User..."
                                    id="nameUserSearch"
                                    style="border-radius: 30px"
                            />
                            <button type="submit" class="btn btn-primary" onclick="searchUser()">Search</button>
                        </div>
                    `
    axios.get('http://localhost:8080/api/users', axiosConfig).then((res)=>{
        let list = res.data;
        let str = `<div class="container">
        <div class="row justify-content-center text-center mb-5">
            <div class="col-lg-6 mb-5">
                <h2 class="font-weight-bold heading text-primary mb-4" style="margin-bottom: 20px">
                    List User Valid
                </h2>
                <p class="text-black-50">
                
                </p>
            </div>
        </div>
        <div class="row">`
        let str2 = `<div class="container">
        <div class="row justify-content-center text-center mb-5">
            <div class="col-lg-6 mb-5">
                <h2 class="font-weight-bold heading text-primary mb-4" style="margin-bottom: 20px">
                    List User Illegal
                </h2>
                <p class="text-black-50">
                
                </p>
            </div>
        </div>
        <div class="row">`
        for (let i = 0; i<list.length; i++) {
            if (list[i].roles[0].name === "ROLE_USER") {
                if (list[i].enabled === true) {
                    str += `<div class="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0" style="margin-top: 60px">
                <div class="h-100 person">
                    <img
                            src="${list[i].image}"
                            alt="Image"
                            class="img-fluid"
                    />

                    <div class="person-contents">
                        <h2 class="mb-0"><a style="cursor: pointer" data-target="#modal_profile" onclick="showUserDetail(${list[i].id})"><b>${list[i].name}</b></a></h2>
                        <ul class="social list-unstyled list-inline dark-hover">
                            <div style="margin-top: 20px">
                                <li class="list-inline-item">
                                    <a href="https://www.facebook.com/zuck"><span class="icon-facebook"></span></a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="https://www.youtube.com/"><span class="icon-github"></span></a>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>`
                } else {
                    str2 += `<div class="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0" style="margin-top: 60px">
                <div class="h-100 person">
                    <img
                            src="${list[i].image}"
                            alt="Image"
                            class="img-fluid"
                    />

                    <div class="person-contents">
                        <h2 class="mb-0"><a style="cursor: pointer" data-target="#modal_profile" onclick="showUserDetail(${list[i].id})"><b>${list[i].name}</b></a></h2>
                        <ul class="social list-unstyled list-inline dark-hover">
                            <div style="margin-top: 20px">
                                <li class="list-inline-item">
                                    <a href="https://www.facebook.com/zuck"><span class="icon-facebook"></span></a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="https://www.youtube.com/"><span class="icon-github"></span></a>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>`
                }
            }
        }
        str += `</div>
    </div>`
        str2 += `</div>
    </div>`
        document.getElementById('abc').innerHTML = str
        document.getElementById('xyz').innerHTML = str2
    })

}
function showHouse(){
    document.getElementById('showOption').innerHTML= `<h1 class="heading" data-aos="fade-up">
                        Enter the name of the province you want to search
                    </h1>
                    <form
                            action="#"
                            class="narrow-w form-search d-flex align-items-stretch mb-3"
                            data-aos="fade-up"
                            data-aos-delay="200"
                    >
                        <input
                                type="text"
                                class="form-control px-4"
                                placeholder="Name Province..."
                        />
                        <button type="submit" class="btn btn-primary">Search</button>
                    </form>`
}
function showAdminDetail(id) {
    document.getElementById('id01').style.display='block'
    axios.get('http://localhost:8080/api/users' + '/' + id).then((res)=>{
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
            str += `<button class="btn btn-primary" style="background-color: #0d6efd" onclick="showEditAdmin(${list.id})">Edit Profile</button>`
        }
        str += `</div>
        </div>
      </div>
    </div>`
        document.getElementById("showProfile").innerHTML = str

    })
}
function showEditAdmin(id){
    document.getElementById('id01').style.display='none'
    document.getElementById('id02').style.display='block'
    axios.get('http://localhost:8080/api/users' + '/' + id).then((res)=>{
        let user = res.data
        let str = ""
        str += `<div class="modal_overlay" style="text-align: center">
                    <div class="image_editImage" style="text-align: center; margin-bottom: 20px">
            <img src="${user.image}" alt="no image" style="width: 100px; height: 100px; border-radius: 50%; text-align: center" id="oldImage">
            <input value="${user.image}" type="file" id="newImage">
        </div>
        <div class="info_edit" style="margin-bottom: 20px; margin-top: 20px; text-align: center; display: flex">
            <h3 style="margin-left: 20px">Name <input type="text" id="nameEdit" value="${user.name}" style="width: 300px; height: 40px; margin-right: 20px"></h3>
            <h3 style="margin-left: 40px">Age <input type="number" id="ageEdit" value="${user.age}" style="width: 300px; height: 40px;"></h3>
        </div>
        <div class="info_edit" style="margin-bottom: 20px; margin-top: 20px; text-align: center; display: flex">
            <h3 style="margin-left: 20px">Phone <input type="number" id="phoneEdit" value="${user.phone}" style="width: 300px; height: 40px; margin-right: 20px"></h3>
            <h3>Gender <input type="text" id="genderEdit" value="${user.sex}" style="width: 300px; height: 40px;"></h3>
        </div>
        <div class="info_edit" style="margin-bottom: 20px; margin-top: 20px; text-align: center; display: flex">
            <h3>Address <input type="text" id="addressEdit" value="${user.address}" style="width: 707px; height: 40px; margin-right: 20px"></h3>
        </div>
        <div class="info_edit" style="margin-bottom: 20px; margin-top: 20px; text-align: center; display: flex;">
            <h3>New Password &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="password" id="passwordEdit" style="width: 300px; height: 40px; margin-right: 50px"></h3>
        </div>
        <div class="info_edit" style="margin-bottom: 20px; margin-top: 20px; text-align: center; display: flex;">
            <h3>Confirm Password <input type="password" id="confirmPasswordEdit" style="width: 300px; height: 40px; margin-right: 20px"></h3>
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

const firebaseConfig = {
    apiKey: "AIzaSyAuBODAbx1pgiDbJiz2uPZkrL7hFC6rByw",
    authDomain: "test1-80dfc.firebaseapp.com",
    projectId: "test1-80dfc",
    storageBucket: "test1-80dfc.appspot.com",
    messagingSenderId: "528601700988",
    appId: "1:528601700988:web:7c1232ade7277d79e047f9",
    measurementId: "G-38560WPBYY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

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
            axios.get('http://localhost:8080/api/users/' + idLogin).then((res)=>{
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
                    window.location.href = 'hadz_admin.html'
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

