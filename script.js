// ดึง form จาก DOM
const form = document.getElementById("signup-form");

// ฟังก์ชันแสดง error
function showError(input, message){
    const errorElement = document.getElementById(`${input.id}-error`); // ${input.id} คือการดึงค่า id ของ input มาใช้ แล้วเอามาต่อ string เพื่อหากล่อง error ที่ตรงกับ input นั้น
    input.setAttribute("aria-invalid", "true");  //  บอกว่าผู้ใช้กรอกผิดในช่อง input
    errorElement.textContent = message; // แสดงข้อความ error
}

// ฟังก์ชันลบ error
function clearError(input){
    const errorElement = document.getElementById(`${input.id}-error`);
    input.removeAttribute("aria-invalid");  // ลบออกเมื่อถูกต้อง
    errorElement.textContent = ""; // แสดงค่าว่าง
}

// ดัก event submit
form.addEventListener("submit", (e)=>{
    e.preventDefault(); // ป้องกันไม่ให้ reload หน้าเว็บ

    let isValid = true; // ตัวแปรที่ใช้เก็บสถานะว่าข้อมูลถูกต้องหรือไม่ โดยเริ่มต้นให้เป็น “ถูกต้อง” ก่อน แล้วค่อยเปลี่ยนเป็น false ถ้ามีข้อผิดพลาดระหว่างตรวจสอบ

    
// === จัดการแต่ละ form group ===

// Username
const username = document.getElementById("username");
if(username.value.trim() === ""){
    showError(username, "Username is required.");
    isValid = false;
} else{
    clearError(username);
}

// Email
const email = document.getElementById("email");
const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/; // Regex นี้บังคับว่า email ต้องมี username@domain.extension โดยไม่มีช่องว่าง และมีจุด (.) หลังโดเมนเสมอ
if(!emailPattern.test(email.value)){
    showError(email, "Please enter a valid email address.");
    isValid = false;
}else{
    clearError(email);
}

// Password
const password = document.getElementById("password");
if(password.value.length < 8){
    showError(password, "Password must be at least 8 characters.");
    isValid = false;
}else{
    clearError(password);
}

// Confirm password
const confirmPassword = document.getElementById("confirm-password");
if(confirmPassword.value !== password.value){
    showError(confirmPassword, "Passwords do not match.");
}else{
    clearError(confirmPassword);
}

// Phone
const phone = document.getElementById("phone");
const phonePattern = /^[0-9]{9,10}$/; // ตัวอย่าง: เบอร์ไทย 9–10 หลักเท่านั้น
if(!phonePattern.test(phone.value)){
    showError(phone, "Please enter a valid phone number.");
    isValid = false;
}else{
    clearError(phone);
}

// === ถ้าทุกอย่าง valid ===
if(isValid){
    alert("Form submitted successfully!");
    form.reset();
}
});