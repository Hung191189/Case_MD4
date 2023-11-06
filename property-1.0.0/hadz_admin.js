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
function statusShowAdmin() {
    document.getElementById("abc").style.display = "none"
}
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
                        <h2 class="mb-0"><a style="cursor: pointer" onclick="showAdminDetail(${list[i].id})">${list[i].name}</a></h2>
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
    axios.get('http://localhost:8080/api/users' + '/' + id).then((res)=>{
        let list = res.data
        document.getElementById("abc").innerHTML = `<div class="section">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-lg-7">
            <div class="img-property-slide-wrap">
              <div class="img-property-slide">
                <img src="${list.image}" alt="Image" class="img-fluid" />
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <h2 class="heading text-primary">${list.name}</h2>
            <h2 class="heading text-primary">Age: ${list.age}</h2>

<!--            <div class="d-block agent-box p-5">-->
<!--              <div class="img mb-4">-->
<!--                <img-->
<!--                  src="images/person_2-min.jpg"-->
<!--                  alt="Image"-->
<!--                  class="img-fluid"-->
<!--                />-->
<!--              </div>-->
<!--              <div class="text">-->
<!--                <h3 class="mb-0">Alicia Huston</h3>-->
<!--                <div class="meta mb-3">Real Estate</div>-->
<!--                <p>-->
<!--                  Lorem ipsum dolor sit amet consectetur adipisicing elit.-->
<!--                  Ratione laborum quo quos omnis sed magnam id ducimus saepe-->
<!--                </p>-->
<!--                <ul class="list-unstyled social dark-hover d-flex">-->
<!--                  <li class="me-1">-->
<!--                    <a href="#"><span class="icon-instagram"></span></a>-->
<!--                  </li>-->
<!--                  <li class="me-1">-->
<!--                    <a href="#"><span class="icon-twitter"></span></a>-->
<!--                  </li>-->
<!--                  <li class="me-1">-->
<!--                    <a href="#"><span class="icon-facebook"></span></a>-->
<!--                  </li>-->
<!--                  <li class="me-1">-->
<!--                    <a href="#"><span class="icon-linkedin"></span></a>-->
<!--                  </li>-->
<!--                </ul>-->
<!--              </div>-->
<!--            </div>-->
          </div>
        </div>
      </div>
    </div>`

    })

}

