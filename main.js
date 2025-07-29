/**
 * الوظائف الرئيسية للوحة التحكم
 */

// تفعيل القائمة الجانبية على الأجهزة الصغيرة
function initMobileMenu() {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.style.cssText = `
        position: fixed;
        top: 15px;
        right: 15px;
        font-size: 1.5rem;
        color: white;
        cursor: pointer;
        z-index: 1100;
        display: none;
    `;
    
    document.body.appendChild(menuToggle);
    
    const sidebar = document.querySelector('.sidebar');
    
    function checkWindowSize() {
        if(window.innerWidth <= 992) {
            menuToggle.style.display = 'block';
            sidebar.classList.remove('active');
        } else {
            menuToggle.style.display = 'none';
            sidebar.classList.add('active');
        }
    }
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    window.addEventListener('resize', checkWindowSize);
    checkWindowSize();
}

// تهيئة الرسوم البيانية (يمكن استبدالها بمكتبة مثل Chart.js)
function initCharts() {
    // هنا يمكنك إضافة كود الرسوم البيانية
    console.log('سيتم تهيئة الرسوم البيانية هنا');
}

// تهيئة جميع الوظائف عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initCharts();
    
    // إضافة تأثير للبطاقات
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', function() {
            // يمكنك إضافة تفاعل عند النقر على البطاقة
        });
    });
    
    // تسجيل الخروج
    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if(confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                Auth.logout();
            }
        });
    }
});