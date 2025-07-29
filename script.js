function login(){
  let type = document.getElementById('adminType').value;
  let pass = document.getElementById('adminPass').value;
  let correct = false;

  if(type === "super" && pass === "790707071"){ // ← هنا الباسورد الأساسي للسوبر أدمين
    localStorage.setItem('isSuperAdmin','true');
    correct = true;
  }
  else if(type.startsWith("admin")){
    let savedPass = localStorage.getItem(type+"_pass") || "1234"; // ← الباسورد الافتراضي للمدير العادي
    if(pass === savedPass){
      localStorage.setItem('isAdmin','true');
      correct = true;
    }
  }

  if(correct){
    document.getElementById('loginForm').style.display = "none";
    document.getElementById('adminContent').style.display = "block";
    showContent();
  } else {
    alert("❌ كلمة المرور غير صحيحة");
  }
}

function logout(){
  localStorage.removeItem('isSuperAdmin');
  localStorage.removeItem('isAdmin');
  document.getElementById('adminContent').style.display = "none";
  document.getElementById('loginForm').style.display = "block";
}

function showContent(){
  let email = localStorage.getItem('targetEmail') || "mahmoudadelsaleh@gmail.com";
  document.getElementById('currentEmail').innerText = "📧 البريد الحالي لتلقي الإشعارات: " + email;

  let isSuper = localStorage.getItem('isSuperAdmin')==="true";

  // عرض أو إخفاء أقسام
  document.getElementById('changeEmailBtn').style.display = isSuper ? "inline-block":"none";
  document.getElementById('bonusSection').style.display = isSuper ? "block":"none";
  document.getElementById('managersSection').style.display = isSuper ? "block":"none";

  // توليد قائمة المدراء للسوبر فقط
  if(isSuper){
    let list = "";
    for(let i=1; i<=5; i++){
      let adminId = "admin"+i;
      let savedPass = localStorage.getItem(adminId+"_pass") || "1234";
      list += `
        <div>
          ${adminId}: <input type="text" id="${adminId}_newpass" value="${savedPass}">
          <button onclick="updateAdminPass('${adminId}')">تحديث</button>
        </div>`;
    }
    document.getElementById('managersList').innerHTML = list;
  }
}

function changeTargetEmail(){
  let newEmail = prompt("أدخل البريد الجديد لتلقي الإشعارات:");
  if(newEmail){
    localStorage.setItem('targetEmail', newEmail);
    alert('✅ تم تحديث البريد إلى: ' + newEmail);
    showContent();
  }
}

function updateBonus(){
  let bonus = document.getElementById('bonusInput').value;
  if(bonus){
    localStorage.setItem('bonusPercent', bonus);
    alert("✅ تم تحديث نسبة البونص إلى: "+bonus+"%");
  }
}

function updateAdminPass(adminId){
  let newPass = document.getElementById(adminId+"_newpass").value;
  if(newPass){
    localStorage.setItem(adminId+"_pass", newPass);
    alert("✅ تم تحديث كلمة المرور لـ "+adminId);
  }
}

// عند فتح الصفحة: لو المدير مسجل دخول بالفعل
if(localStorage.getItem('isSuperAdmin') === "true" || localStorage.getItem('isAdmin') === "true"){
  document.getElementById('loginForm').style.display = "none";
  document.getElementById('adminContent').style.display = "block";
  showContent();
}