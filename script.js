// ดึง form จาก DOM
const form = document.getElementById("signup-form");

// ดึงปุ่ม register จาก DOM
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
  if (username.value.trim() === "") {  // ถ้า username เป็นค่าว่าง
    showError(username, "Username is required.");  // แสดงข้อความ error ที่ username
    isValid = false;  // สถานะไม่ valid
  } else {
    clearError(username);  // นอกจากนี้ให้เอา error ออก
  }

  // Email
  const email = document.getElementById("email");
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/; // Regex นี้บังคับว่า email ต้องมี username@domain.extension โดยไม่มีช่องว่าง และมีจุด (.) หลังโดเมนเสมอ
  if (!emailPattern.test(email.value)) {  // ถ้า emailPattern ไม่ถูกต้อง
    showError(email, "Please enter a valid email address.");  // แสดงข้อความ error ที่ email
    isValid = false;  // สถานะไม่ valid
  } else {
    clearError(email);  // นอกจากนี้ให้เอา error ออก
  }

  // Password
  const password = document.getElementById("password");
  if (password.value.length < 8) {  // ถ้า password มีความยาวน้อยกว่า 8
    showError(password, "Password must be at least 8 characters.");  // แสดงข้อความ error ที่ password
    isValid = false;  // สถานะไม่ valid
  } else {
    clearError(password);  // นอกจากนี้ให้เอา error ออก
  }

  // Confirm password
  const confirmPassword = document.getElementById("confirm-password");
  if (confirmPassword.value !== password.value) {  // ถ้า confirmPassword มีค่าไม่ตรงกับ password
    showError(confirmPassword, "Passwords do not match.");  // แสดงข้อความ error ที่ confirmPassword
  } else {
    clearError(confirmPassword);  // นอกจากนี้ให้เอา error ออก
  }

  // Phone
  const phone = document.getElementById("phone");
  const phonePattern = /^[0-9]{9,10}$/; // ตัวอย่าง: เบอร์ไทย 9–10 หลักเท่านั้น
  if (!phonePattern.test(phone.value)) {  // ถ้า phonePattern มีค่าไม่ตรงตามนี้
    showError(phone, "Please enter a valid phone number.");  // แสดงข้อความ error ที่ phone
    isValid = false;  // สถานะไม่ valid
  } else {
    clearError(phone);  // นอกจากนี้ให้เอา error ออก
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

// === Password strength meter ===
const passwordInput = document.getElementById("password");      // ดึงช่องกรอกรหัสผ่านจาก DOM
const strengthBar = document.getElementById("strength-bar");    // ดึง progress bar ที่จะยาวขึ้นตามความแข็งแรง
const strengthText = document.getElementById("strength-text");  // ดึงข้อความที่จะแสดงว่า Weak / Medium / Strong

passwordInput.addEventListener("input", ()=>{   // ทุกครั้งที่ผู้ใช้พิมพ์รหัสผ่าน จะตรวจสอบความแข็งแรง 
    const value = passwordInput.value;  // เก็บค่า password ที่กรอกไว้ใน value
    let strength = 0;  // เริ่มต้นให้ strength เป็น 0

    if(value.length >= 8) strength++;              // ยาว ≥ 8 ตัวอักษร → +1
    if(/[A-Z]/.test(value)) strength++;            // มีตัวอักษรใหญ่ (A–Z) → +1
    if(/[0-9]/.test(value)) strength++;            // มีตัวเลข → +1
    if(/[^A-Za-z0-9]/.test(value)) strength++;     // มีสัญลักษณ์พิเศษ → +1

    strengthBar.className = "";     // รีเซ็ต class ของ bar → เคลียร์สีเดิมก่อน

    if(strength === 0){     	
        strengthBar.style.width = "0%";
        strengthText.textContent = "";      // ไม่มีข้อความ
    }else if(strength <= 2){
        strengthBar.style.width = "40%";
        strengthBar.classList.add("weak");  // สีแดง เพราะ .classList.add("weak")
        strengthText.textContent = "weak";  // ข้อความ "weak"
    }else if(strength === 3){
        strengthBar.style.width = "70%";
        strengthBar.classList.add("medium");  // สีส้ม เพราะ .classList.add("medium")
        strengthText.textContent = "medium";  // ข้อความ "medium"
    }else{
        strengthBar.style.width = "100%";
        strengthBar.classList.add("strong");  // สีเขียว เพราะ .classList.add("strong")
        strengthText.textContent = "strong";  // ข้อความ "strong"
    }
});

// ปิดปุ่มตอนเริ่มต้น
registerBtn.disabled = true;