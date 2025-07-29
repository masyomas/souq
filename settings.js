document.addEventListener('DOMContentLoaded', function() {
    if(!Auth.checkAuth()) {
        window.location.href = 'login.html';
        return;
    }

    // تحميل الإعدادات
    function loadSettings() {
        const settings = JSON.parse(localStorage.getItem('settings')) || {};
        document.querySelector('[name="storeName"]').value = settings.storeName || '';
        document.querySelector('[name="storeDescription"]').value = settings.storeDescription || '';
    }

    // حفظ الإعدادات
    document.getElementById('generalSettingsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const settings = {
            storeName: this.elements.storeName.value,
            storeDescription: this.elements.storeDescription.value,
            lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem('settings', JSON.stringify(settings));
        alert('تم حفظ الإعدادات بنجاح');
    });

    // التهيئة الأولية
    loadSettings();
});