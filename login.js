document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // تحقق بسيط (في تطبيق حقيقي يجب التحقق من الخادم)
    if(email === 'admin@souq.com' && password === '123456') {
        localStorage.setItem('auth', 'true');
        window.location.href = 'index.html';
    } else {
        alert('بيانات الدخول غير صحيحة!');
    }
});

// التحقق من حالة تسجيل الدخول
if(localStorage.getItem('auth') === 'true') {
    window.location.href = 'index.html';
}