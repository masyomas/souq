document.addEventListener('DOMContentLoaded', function() {
    if(!Auth.checkAuth()) {
        window.location.href = 'login.html';
        return;
    }

    // الحصول على معرّف العميل من URL
    const urlParams = new URLSearchParams(window.location.search);
    const customerId = urlParams.get('id');

    if(!customerId) {
        window.location.href = 'customers.html';
        return;
    }

    // تحميل بيانات العميل
    function loadCustomerData() {
        const customers = JSON.parse(localStorage.getItem('customers')) || [];
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        
        const customer = customers.find(c => c.id === customerId);
        
        if(!customer) {
            alert('العميل غير موجود');
            window.location.href = 'customers.html';
            return;
        }

        // عرض بيانات العميل
        document.getElementById('customerName').textContent = customer.name;
        document.getElementById('customerContact').textContent = `${customer.phone} | ${customer.email || 'لا يوجد بريد'}`;
        document.getElementById('customerAvatar').src = customer.avatar || 'https://via.placeholder.com/100';
        
        // حساب الإحصائيات
        const customerOrders = orders.filter(o => o.customerId === customerId);
        const totalSpent = customerOrders.reduce((sum, order) => sum + order.total, 0);
        const lastOrder = customerOrders.length > 0 
            ? new Date(customerOrders[customerOrders.length-1].date).toLocaleDateString('ar-EG') 
            : 'لا يوجد طلبات';
        
        // عرض الإحصائيات
        document.getElementById('totalOrders').textContent = customerOrders.length;
        document.getElementById('totalSpent').textContent = totalSpent + ' ج.م';
        document.getElementById('customerPoints').textContent = customer.points || 0;
        document.getElementById('lastOrder').textContent = lastOrder;
        
        // عرض الطلبات
        renderCustomerOrders(customerOrders);
        
        // عرض البيانات الشخصية
        document.getElementById('fullName').value = customer.name;
        document.getElementById('email').value = customer.email || '';
        document.getElementById('phone').value = customer.phone;
        document.getElementById('joinDate').value = new Date(customer.joinDate || new Date()).toLocaleDateString('ar-EG');
        
        // عرض العناوين
        renderAddresses(customer.addresses || []);
    }

    // عرض طلبات العميل
    function renderCustomerOrders(orders) {
        const table = document.getElementById('customerOrdersTable');
        
        table.innerHTML = orders.map(order => `
            <tr>
                <td>#${order.id}</td>
                <td>${new Date(order.date).toLocaleDateString('ar-EG')}</td>
                <td>${order.total} ج.م</td>
                <td><span class="badge ${getStatusClass(order.status)}">${order.status}</span></td>
                <td>
                    <button onclick="viewOrder('${order.id}')" class="btn btn-sm btn-primary">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // عرض عناوين العميل
    function renderAddresses(addresses) {
        const container = document.getElementById('addressesList');
        
        if(addresses.length === 0) {
            container.innerHTML = '<div class="col-12"><p class="text-muted">لا يوجد عناوين مسجلة</p></div>';
            return;
        }
        
        container.innerHTML = addresses.map((address, index) => `
            <div class="col-md-6 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">العنوان ${index + 1}</h5>
                        <p class="card-text">
                            ${address.street}<br>
                            ${address.city}, ${address.state}<br>
                            ${address.postalCode}
                        </p>
                        <div class="d-flex justify-content-between">
                            <span class="badge ${address.isDefault ? 'bg-success' : 'bg-secondary'}">
                                ${address.isDefault ? 'افتراضي' : 'إضافي'}
                            </span>
                            <div>
                                <button class="btn btn-sm btn-outline-primary" onclick="editAddress('${customerId}', ${index})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger" onclick="deleteAddress('${customerId}', ${index})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // حفظ بيانات العميل
    document.getElementById('customerDetailsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const customers = JSON.parse(localStorage.getItem('customers')) || [];
        const customerIndex = customers.findIndex(c => c.id === customerId);
        
        if(customerIndex !== -1) {
            customers[customerIndex] = {
                ...customers[customerIndex],
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value
            };
            
            localStorage.setItem('customers', JSON.stringify(customers));
            alert('تم تحديث بيانات العميل بنجاح');
            loadCustomerData();
        }
    });

    // وظائف العناوين
    window.showAddAddressForm = function() {
        const newAddress = {
            street: prompt('ادخل اسم الشارع:'),
            city: prompt('ادخل المدينة:'),
            state: prompt('ادخل المحافظة:'),
            postalCode: prompt('ادخل الرمز البريدي:'),
            isDefault: false
        };
        
        if(newAddress.street && newAddress.city) {
            const customers = JSON.parse(localStorage.getItem('customers')) || [];
            const customerIndex = customers.findIndex(c => c.id === customerId);
            
            if(customerIndex !== -1) {
                if(!customers[customerIndex].addresses) {
                    customers[customerIndex].addresses = [];
                }
                
                customers[customerIndex].addresses.push(newAddress);
                localStorage.setItem('customers', JSON.stringify(customers));
                renderAddresses(customers[customerIndex].addresses);
            }
        }
    };

    window.editAddress = function(customerId, addressIndex) {
        // يمكن تطوير هذه الوظيفة حسب الحاجة
        alert(`سيتم تعديل العنوان رقم ${addressIndex + 1}`);
    };

    window.deleteAddress = function(customerId, addressIndex) {
        if(confirm('هل أنت متأكد من حذف هذا العنوان؟')) {
            const customers = JSON.parse(localStorage.getItem('customers')) || [];
            const customerIndex = customers.findIndex(c => c.id === customerId);
            
            if(customerIndex !== -1 && customers[customerIndex].addresses) {
                customers[customerIndex].addresses.splice(addressIndex, 1);
                localStorage.setItem('customers', JSON.stringify(customers));
                renderAddresses(customers[customerIndex].addresses);
            }
        }
    };

    // مساعدات
    function getStatusClass(status) {
        const statusClasses = {
            'مكتمل': 'bg-success',
            'قيد التجهيز': 'bg-warning text-dark',
            'ملغي': 'bg-danger',
            'معلق': 'bg-secondary'
        };
        return statusClasses[status] || 'bg-info';
    }

    window.viewOrder = function(orderId) {
        window.location.href = `order-details.html?id=${orderId}`;
    };

    // التهيئة الأولية
    loadCustomerData();
});