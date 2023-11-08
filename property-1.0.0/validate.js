function validateForm() {
    let regexName = /^[A-Za-z\s]+$/;
    let regexAge = /^(?:1[0-1]\d|1[0-9]|[1-9]|[1-9][0-9])$/;
    let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let regexSex = /^(Nam|Nữ)$/
    let regexPhone = /^0\d{9}$/;
    let name = document.getElementById("name_register").value;
    let age = document.getElementById("age_register").value;
    let sex = document.getElementById("sex_register").value;
    let email = document.getElementById("user_name_register").value;
    let phone = document.getElementById("phone_register").value;

    let isValid = true;
    if (!regexName.test(name)) {
        document.getElementById("nameError").textContent = "Tên không hợp lệ";
        isValid = false;
    }
    if (!regexEmail.test(email)) {
        document.getElementById("emailError").textContent = "Email không hợp lệ";
        isValid = false;
    }
    if (!regexAge.test(age)) {
        document.getElementById("ageError").textContent = "Nhập lại tuổi";
        isValid = false;
    }
    if (!regexPhone.test(phone)) {
        document.getElementById("phoneError").innerText = "Số điện thoại không hợp lệ";
        isValid = false;
    }
    if (!regexSex.test(sex)) {
        document.getElementById("sexError").innerText = "Nhập lại giới tính cẩn thận cái";
        isValid = false;
    }
    if (isValid) {
        register();
    }
}