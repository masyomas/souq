/**
 * ملف استعادة كلمة المرور
 * يتضمن وظائف إرسال رابط الاستعادة والتحقق من البريد الإلكتروني
 */

document.addEventListener('DOMContentLoaded', function() {
    const forgotForm = document.getElementById('forgotForm');
    const emailInput = document.getElementById('recoveryEmail');
    const resetForm = document.getElementById('resetForm');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // إذا كان هناك رمز استعادة في الرابط
    const urlParams = new URLSearchParams(window.location.search);
    const resetToken = urlParams.get('token');
    
    if(resetToken) {
        // عرض نموذج إعادة تعيين كلمة المرور
        document.querySelector('.forgot-section').style.display = 'none';
        document.querySelector('.reset-section').style.display = 'block';
    }
    
    // إرسال رابط الاستعادة
    forgotForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        if(!validateEmail(email)) {
            showAlert('danger', 'الرجاء إدخال بريد إلكتروني صحيح');
            return;
        }
        
        // في تطبيق حقيقي، هنا نرسل الطلب إلى الخادم
        simulateSendResetLink(email);
    });
    
    // إعادة تعيين كلمة المرور
    resetForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if(newPassword.length < 6) {
            showAlert('danger', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
            return;
        }
        
        if(newPassword !== confirmPassword) {
            showAlert('danger', 'كلمات المرور غير متطابقة');
            return;
        }
        
        // في تطبيق حقيقي، هنا نرسل كلمة المرور الجديدة إلى الخادم
        simulateResetPassword(newPassword);
    });
    
    // التحقق من صحة البريد الإلكتروني
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // محاكاة إرسال رابط الاستعادة (للتجربة فقط)
    function simulateSendResetLink(email) {
        // في تطبيق حقيقي، استخدم fetch أو axios لإرسال الطلب إلى الخادم
        setTimeout(() => {
            showAlert('success', `تم إرسال رابط استعادة كلمة المرور إلى ${email} (هذا محاكاة فقط)`);
            emailInput.value = '';
        }, 1000);
    }
    
    // محاكاة إعادة تعيين كلمة المرور (للتجربة فقط)
    function simulateResetPassword(newPassword) {
        // في تطبيق حقيقي، استخدم fetch أو axios لإرسال الطلب إلى الخادم
        setTimeout(() => {
            showAlert('success', 'تم تحديث كلمة المرور بنجاح (هذا محاكاة فقط)');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }, 1000);
    }
    
    // عرض تنبيه
    function showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        
        const container = document.querySelector('.container');
        container.prepend(alertDiv);
        
        setTimeout(() => alertDiv.remove(), 5000);
    }
});