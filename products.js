/**
 * ملف إدارة المنتجات
 * يتضمن وظائف عرض، إضافة، تعديل وحذف المنتجات
 */

document.addEventListener('DOMContentLoaded', function() {
    // التحقق من المصادقة
    if(!Auth.checkAuth()) {
        window.location.href = 'login.html';
        return;
    }

    // عناصر DOM
    const productsTable = document.getElementById('productsTable');
    const addProductBtn = document.getElementById('addProductBtn');
    const productForm = document.getElementById('productForm');
    const productModal = new bootstrap.Modal('#productModal');
    const modalTitle = document.getElementById('modalTitle');
    
    // عرض جميع المنتجات
    function loadProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        
        productsTable.innerHTML = products.map(product => `
            <tr>
                <td><img src="${product.image || 'https://via.placeholder.com/50'}" alt="${product.name}" class="product-thumbnail"></td>
                <td>${product.name}</td>
                <td>${product.price} ج.م</td>
                <td>${product.stock}</td>
                <td>
                    <button onclick="editProduct('${product.id}')" class="btn btn-sm btn-primary">تعديل</button>
                    <button onclick="deleteProduct('${product.id}')" class="btn btn-sm btn-danger">حذف</button>
                </td>
            </tr>
        `).join('');
    }

    // عرض نموذج إضافة منتج
    window.showAddForm = function() {
        modalTitle.textContent = 'إضافة منتج جديد';
        productForm.reset();
        productForm.dataset.id = '';
        productModal.show();
    }

    // عرض نموذج تعديل منتج
    window.editProduct = function(id) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const product = products.find(p => p.id === id);
        
        if(product) {
            modalTitle.textContent = 'تعديل المنتج';
            document.getElementById('productName').value = product.name;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productStock').value = product.stock;
            document.getElementById('productImage').value = product.image || '';
            productForm.dataset.id = id;
            productModal.show();
        }
    }

    // حذف منتج
    window.deleteProduct = function(id) {
        if(confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
            let products = JSON.parse(localStorage.getItem('products')) || [];
            products = products.filter(p => p.id !== id);
            localStorage.setItem('products', JSON.stringify(products));
            loadProducts();
            showAlert('success', 'تم حذف المنتج بنجاح');
        }
    }

    // حفظ المنتج (إضافة/تعديل)
    productForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const productId = this.dataset.id || generateId();
        const productName = document.getElementById('productName').value;
        const productPrice = parseFloat(document.getElementById('productPrice').value);
        const productStock = parseInt(document.getElementById('productStock').value);
        const productImage = document.getElementById('productImage').value;
        
        if(!productName || isNaN(productPrice) || isNaN(productStock)) {
            showAlert('danger', 'الرجاء إدخال بيانات صحيحة');
            return;
        }
        
        let products = JSON.parse(localStorage.getItem('products')) || [];
        
        if(this.dataset.id) {
            // تعديل منتج موجود
            products = products.map(p => 
                p.id === productId ? { ...p, name: productName, price: productPrice, stock: productStock, image: productImage } : p
            );
        } else {
            // إضافة منتج جديد
            products.push({
                id: productId,
                name: productName,
                price: productPrice,
                stock: productStock,
                image: productImage,
                createdAt: new Date().toISOString()
            });
        }
        
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
        productModal.hide();
        showAlert('success', `تم ${this.dataset.id ? 'تعديل' : 'إضافة'} المنتج بنجاح`);
    });

    // توليد معرف فريد للمنتج
    function generateId() {
        return 'prod_' + Math.random().toString(36).substr(2, 9);
    }

    // عرض تنبيه
    function showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const container = document.querySelector('.container');
        container.prepend(alertDiv);
        
        setTimeout(() => alertDiv.remove(), 5000);
    }

    // التهيئة الأولية
    loadProducts();
});