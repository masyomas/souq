/**
 * نظام إدارة المصادقة
 * يتضمن وظائف تسجيل الدخول، تسجيل الخروج، والتحقق من الجلسة
 */

const Auth = {
    // التحقق من حالة تسجيل الدخول
    checkAuth: function() {
        return localStorage.getItem('auth') === 'true';
    },
    
    // تسجيل الدخول
    login: function(email, password) {
        // في تطبيق حقيقي، هنا نتحقق من الخادم
        if(email === 'admin@souq.com' && password === '123456') {
            localStorage.setItem('auth', 'true');
            localStorage.setItem('user', JSON.stringify({
                name: 'محمود عادل',
                email: email,
                role: 'admin'
            }));
            return true;
        }
        return false;
    },
    
    // تسجيل الخروج
    logout: function() {
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    },
    
    // الحصول على بيانات المستخدم
    getUser: function() {
        return JSON.parse(localStorage.getItem('user'));
    }
};

// التحقق من المصادقة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    if(!Auth.checkAuth() && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }
    
    // عرض بيانات المستخدم في الشريط العلوي
    if(Auth.checkAuth()) {
        const user = Auth.getUser();
        if(user) {
            const userProfile = document.querySelector('.user-profile span');
            if(userProfile) {
                userProfile.textContent = user.name;
            }
        }
    }
});