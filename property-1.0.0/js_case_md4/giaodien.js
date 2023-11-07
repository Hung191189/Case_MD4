let URL = "http://localhost:8080/api/"

let token = localStorage.getItem("token");
let idLogin = localStorage.getItem("idLogin");
let nameLogin = localStorage.getItem("nameLogin");
let user = localStorage.getItem("user");

const firebaseConfig = {
    apiKey: "AIzaSyDrJQm_-LOCMPveh22hr7LcKaTB9-tomUw",
    authDomain: "homestay-2faa5.firebaseapp.com",
    projectId: "homestay-2faa5",
    storageBucket: "homestay-2faa5.appspot.com",
    messagingSenderId: "521483411744",
    appId: "1:521483411744:web:51425e97987e338c807745",
    measurementId: "G-X0NQEH9RSF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();



function showForm() {
    document.getElementById("modal").style.display = "flex";
}

function showFormRegister() {
    document.getElementById("modal_register").style.display = "flex";
}

function home() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("modal_register").style.display = "none";
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
            // showOneUser();
            console.log("admin")
            window.location.href="hadz_admin.html"
        } else if (response.data.roles[0].authority === "ROLE_USER") {
            // showOneUser();
            console.log("user")
            window.location.href="user.html"
        } else {
            showOneUser();
            console.log("chủ nhà")
            window.location.href="owner.html"
        }
        document.getElementById("modal").style.display = "none";
    })
    event.preventDefault()
}

function showOneUser() {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    axios.get(URL + idLogin, config).then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
    })
}

function register() {
    let password = document.getElementById("pass_word_register").value;
    let confirm_pass_word = document.getElementById("confirm_password_register").value;
    console.log(password)
    console.log(confirm_pass_word)
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    if (password === confirm_pass_word) {

        const fileInput = document.getElementById("img_register");
        // const imageURL = document.getElementById("imageURL");
        // Lấy file hình ảnh từ input
        const file = fileInput.files[0];
        // Tạo tham chiếu đến nơi bạn muốn lưu trữ ảnh trong Storage
        const storageRef = storage.ref("images/" + file.name);
        console.log("9999999")
        // Tải file lên Firebase Storage
        storageRef.put(file).then((snapshot) => {
            // console.log("Uploaded a file!");
            // Lấy URL của ảnh sau khi đã tải lên
            storageRef.getDownloadURL().then((url) => {
                let user = {
                    name: document.getElementById("name_register").value,
                    age: document.getElementById("age_register").value,
                    sex: document.getElementById("sex_register").value,
                    phone: document.getElementById("phone_register").value,
                    address: document.getElementById("address_register").value,
                    userName: document.getElementById("user_name_register").value,
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
                axios.post(URL + "users/register", user, config).then((response) => {
                    alert("update thành công")
                })
                event.preventDefault();
            });
        });
    } else {
        alert("Xác nhận mật khẩu chưa đúng")
    }
}
showHome_GD();
function showHome_GD() {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    axios.get("http://localhost:8080/homes", config).then((response)=>{
        let list_home = response.data;
        let content = "";
        for (let i = 0; i < list_home.length; i++) {

            content += "<div class=\"property-item\">\n" +
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
        document.getElementById("property_list").innerHTML = content;
    })
    axios.get("http://localhost:8080/images", config).then((response) =>{
        let list_img = response.data;
        for (let i = 0; i < list_img.length; i++) {
          if (list_img[i].url == null){
              list_img[i].url = "images/img_5.jpg";
          }
          console.log("nháy = " + list_img[i].home.id)
            document.getElementById("img_" + list_img[i].home.id).src = list_img[i].url;
        }
    })
}


showOneHome()
function showOneHome() {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    axios.get("http://localhost:8080/homes",config).then((response) =>{
        let list_home = response.data;
        let content = " <div class=\"row justify-content-center text-center mb-5\">\n" +
                "                <div class=\"col-lg-5\">\n" +
                "                    <h2 class=\"font-weight-bold heading text-primary mb-4\">\n" +
                "                        <!--              Let's find home that's perfect for you-->\n" +
                "                        Phòng nổi bật\n" +
                "                    </h2>\n" +
                "                    <p class=\"text-black-50\">Căn phòng nổi bật với nhiều tiện nghi," +
                "                  ghế tình yêu, phòng phòng tắm, phòng xông hơi, giường ngủ 2 người nằm ôm nhau phê tận nóc</p>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "            <div class=\"row justify-content-between mb-5\">\n" +
                "                <div class=\"col-lg-7 mb-5 mb-lg-0 order-lg-2\">\n" +
                "                    <div class=\"img-about dots\" id=\"anh2\">\n" +
                "                        <img style=\"width: 746px; height: 546px\" src=\"images/hero_bg_3.jpg\" id=\"img-1\" alt=\"Image\" class=\"img-fluid\"/>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "                <div class=\"col-lg-4\">\n" +
                "                    <div class=\"d-flex feature-h\">\n" +
                "              <span class=\"wrap-icon me-3\">\n" +
                "                <span class=\"icon-bed\"></span>\n" +
                "              </span>\n" +
                "                        <div class=\"feature-text\">\n" +
                "                            <h3 class=\"heading\">Description</h3>\n" +
                "                            <p class=\"text-black-50\">" + list_home[0].description +"</p>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "\n" +
                "                    <div class=\"d-flex feature-h\">\n" +
                "              <span class=\"wrap-icon me-3\">\n" +
                "                <span class=\"icon-bath\"></span>\n" +
                "              </span>\n" +
                "                        <div class=\"feature-text\">\n" +
                "                            <h3 class=\"heading\">Batroom</h3>\n" +
                "                            <p class=\"text-black-50\">Phòng có " + list_home[0].bathroom +" phòng tắm </p>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "\n" +
                "                    <div class=\"d-flex feature-h\">\n" +
                "              <span class=\"wrap-icon me-3\">\n" +
                "                <span class=\"icon-security\"></span>\n" +
                "              </span>\n" +
                "                        <div class=\"feature-text\">\n" +
                "                            <h3 class=\"heading\">BetRoom</h3>\n" +
                "                            <p class=\"text-black-50\">Phòng có " + list_home[0].bedroom+" phòng ngủ </p>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "            </div>";
        document.getElementById("home_number_one").innerHTML = content;
    })
    axios.post("http://localhost:8080/images/img/" + 1, config).then((response)=>{
        let data = response.data.url
        // let img = `<img src="${data}" alt="Image" class="img-fluid"/>`
        document.getElementById("img-1").src = response.data.url;
    })
}