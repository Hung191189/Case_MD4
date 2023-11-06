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
    document.getElementById("a").innerHTML = `<a href="scss/index.html" id="user" class="logo m-0 float-start">${nameUserLogin}</a>`;
    document.getElementById("b").innerHTML = `<img id="img"
                            src=${imageLogin}
                            class="rounded-circle"
                            height="41"
                            alt="Black and White Portrait of a Man"
                            loading="lazy"
                style="margin-left: 20px"/>`;
}
showAdmin()

function showAdmin() {
    document.getElementById('showOption').innerHTML= `<h1 class="heading" data-aos="fade-up">
                        Enter The Admin Name You Want To Find
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
                                placeholder="Name Admin..."
                        />
                        <button type="submit" class="btn btn-primary">Search</button>
                    </form>`

    axios.get('http://localhost:8080/api/users', axiosConfig).then((res)=>{
        let list = res.data;
        let str = ""
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
        document.getElementById('list_admin').innerHTML = str
    })
}
function showOwner(){
    document.getElementById('showOption').innerHTML= `<h1 class="heading" data-aos="fade-up">
                        Enter The Name Of The Homeowner You Want To Find
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
                                placeholder="Name Owner..."
                        />
                        <button type="submit" class="btn btn-primary">Search</button>
                    </form>`
}
function showUser(){
    document.getElementById('showOption').innerHTML= `<h1 class="heading" data-aos="fade-up">
                        Enter The Username You Want To Find
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
                                placeholder="Name User..."
                        />
                        <button type="submit" class="btn btn-primary">Search</button>
                    </form>`
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
            console.log(typeof id)
            console.log(typeof idLogin)
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
            <img src="${user.image}" alt="no image" style="width: 100px; height: 100px; border-radius: 50%; text-align: center">
            <input type="file">
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
        <button class="btn btn-primary" style="background-color: #0d6efd; margin-bottom: 40px" onclick="confirmEdit()">Save Profile</button>
                </div>
                `
        document.getElementById('modal_register').innerHTML = str
    })
}
function confirmEdit() {

}

