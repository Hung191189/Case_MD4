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
