// ดึง form จาก DOM
const form = document.getElementById("signup-form");
const registerBtn = document.getElementById("register-btn");

  // ฟังก์ชันแสดง error
  function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}-error`); // ${input.id} คือการดึงค่า id ของ input มาใช้ แล้วเอามาต่อ string เพื่อหากล่อง error ที่ตรงกับ input นั้น
    input.setAttribute("aria-invalid", "true"); //  บอกว่าผู้ใช้กรอกผิดในช่อง input
    errorElement.textContent = message; // แสดงข้อความ error
  };

// ฟังก์ชันลบ error
function clearError(input) {
  const errorElement = document.getElementById(`${input.id}-error`);
  input.removeAttribute("aria-invalid"); // ลบออกเมื่อถูกต้อง
  errorElement.textContent = ""; // แสดงค่าว่าง
}

// ฟังก์ชันตรวจสอบฟอร์ม (ใช้ทั้งตอน input และ submit)
function checkFormValid() {
  let isValid = true; // ตัวแปรที่ใช้เก็บสถานะว่าข้อมูลถูกต้องหรือไม่ โดยเริ่มต้นให้เป็น “ถูกต้อง” ก่อน แล้วค่อยเปลี่ยนเป็น false ถ้ามีข้อผิดพลาดระหว่างตรวจสอบ

  // === จัดการแต่ละ form group ===
  // Username
  const username = document.getElementById("username");
  if (username.value.trim() === "") {
    showError(username, "Username is required.");
    isValid = false;
  } else {
    clearError(username);
  }

  // Email
  const email = document.getElementById("email");
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/; // Regex นี้บังคับว่า email ต้องมี username@domain.extension โดยไม่มีช่องว่าง และมีจุด (.) หลังโดเมนเสมอ
  if (!emailPattern.test(email.value)) {
    showError(email, "Please enter a valid email address.");
    isValid = false;
  } else {
    clearError(email);
  }

  // Password
  const password = document.getElementById("password");
  if (password.value.length < 8) {
    showError(password, "Password must be at least 8 characters.");
    isValid = false;
  } else {
    clearError(password);
  }

  // Confirm password
  const confirmPassword = document.getElementById("confirm-password");
  if (confirmPassword.value !== password.value) {
    showError(confirmPassword, "Passwords do not match.");
  } else {
    clearError(confirmPassword);
  }

  // Phone
  const phone = document.getElementById("phone");
  const phonePattern = /^[0-9]{9,10}$/; // ตัวอย่าง: เบอร์ไทย 9–10 หลักเท่านั้น
  if (!phonePattern.test(phone.value)) {
    showError(phone, "Please enter a valid phone number.");
    isValid = false;
  } else {
    clearError(phone);
  }

  // เปิด/ปิดปุ่ม register ตามผลลัพธ์
  registerBtn.disabled = !isValid;  // ถ้าฟอร์มผิด ปุ่มจะปิด
  return isValid;    // ส่งผลลัพธ์กลับไปใช้ต่อ เช่นใน submit
}

// ดัก event submit (จัดการตอนกด submit)
form.addEventListener("submit", (e) => {
  e.preventDefault(); // ป้องกันไม่ให้ reload หน้าเว็บ
  if(checkFormValid()){ // ตรวจแล้วว่าฟอร์มถูกต้อง → ทำงานในวงเล็บต่อไป
    alert("Form submitted successfully!");
    form.reset();  // เคลียร์ทุกค่าในช่อง input ให้กลับไปว่างเหมือนตอนเริ่มต้น
    registerBtn.disabled = true;  // ปิดปุ่ม Register อีกครั้งหลัง reset (ให้กลับไปเป็นสีเทา กดไม่ได้)
  }
});

// ตรวจสอบทุกครั้งที่กรอกข้อมูล
const inputs = form.querySelectorAll("input");  // ดึงทุกช่อง input ในฟอร์มมาเก็บไว้ในตัวแปร inputs
inputs.forEach(input => {
    input.addEventListener("input", checkFormValid);  
    // วนลูปทุกช่อง input แล้วบอกว่า ทุกครั้งที่ผู้ใช้พิมพ์ลงในช่องนั้น (input event) → ให้เรียกฟังก์ชัน checkFormValid() เพื่อตรวจสอบว่าฟอร์มถูกต้องหรือยัง
});

// ปิดปุ่มตอนเริ่มต้น
registerBtn.disabled = true;