// ดึง form จาก DOM
const form = document.getElementById("signup-form");

// ดัก event submit
form.addEventListener("submit", (e)=>{
    // ป้องกันไม่ให้ reload หน้าเว็บ
    e.preventDefault();

    console.log("Form submitted");
});