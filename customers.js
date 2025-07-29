document.addEventListener('DOMContentLoaded', function() {
    if(!Auth.checkAuth()) {
        window.location.href = 'login.html';
        return;
    }

    // تحميل بيانات العملاء
    function loadCustomers() {
        const customers = JSON.parse(localStorage.getItem('customers')) || [];
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        
        const customersTable = document.getElementById('customersTable');
        customersTable.innerHTML = customers.map((customer, index) => {
            const customerOrders = orders.filter(o => o.customerId === customer.id);
            
            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${customer.name}</td>
                    <td>${customer.email || '---'}</td>
                    <td>${customer.phone}</td>
                    <td>${customerOrders.length}</td>
                    <td>${customer.points || 0}</td>
                    <td>
                        <button onclick="viewCustomer('${customer.id}')" class="btn btn-sm btn-primary">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="editCustomer('${customer.id}')" class="btn btn-sm btn-warning">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    window.viewCustomer = function(customerId) {
        window.location.href = `customer-profile.html?id=${customerId}`;
    };

    window.editCustomer = function(customerId) {
        alert(`سيتم فتح نموذج تعديل العميل ${customerId}`);
        // يمكنك استبدال هذا بفتح نموذج تعديل
    };

    window.showAddCustomerForm = function() {
        alert('سيتم فتح نموذج إضافة عميل جديد');
        // يمكنك استبدال هذا بفتح نموذج إضافة
    };

    // التهيئة الأولية
    loadCustomers();
});