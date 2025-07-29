document.addEventListener('DOMContentLoaded', function() {
    if(!Auth.checkAuth()) {
        window.location.href = 'login.html';
        return;
    }

    // تحميل بيانات الطلبات
    function loadOrders() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const customers = JSON.parse(localStorage.getItem('customers')) || [];
        
        const ordersTable = document.getElementById('ordersTable');
        ordersTable.innerHTML = orders.map(order => {
            const customer = customers.find(c => c.id === order.customerId) || { name: 'زائر' };
            const statusClass = getStatusClass(order.status);
            
            return `
                <tr>
                    <td>#${order.id}</td>
                    <td>${customer.name}</td>
                    <td>${new Date(order.date).toLocaleDateString('ar-EG')}</td>
                    <td>${order.total} ج.م</td>
                    <td><span class="badge ${statusClass}">${order.status}</span></td>
                    <td class="order-actions">
                        <button onclick="viewOrder('${order.id}')" class="btn btn-primary btn-sm">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="updateOrderStatus('${order.id}')" class="btn btn-warning btn-sm">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

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

    window.updateOrderStatus = function(orderId) {
        const newStatus = prompt('اختر الحالة الجديدة:\n1- مكتمل\n2- قيد التجهيز\n3- ملغي');
        if(newStatus) {
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders = orders.map(order => {
                if(order.id === orderId) {
                    return { ...order, status: getStatusText(newStatus) };
                }
                return order;
            });
            localStorage.setItem('orders', JSON.stringify(orders));
            loadOrders();
        }
    };

    function getStatusText(choice) {
        const statusMap = {
            '1': 'مكتمل',
            '2': 'قيد التجهيز',
            '3': 'ملغي'
        };
        return statusMap[choice] || 'معلق';
    }

    // التهيئة الأولية
    loadOrders();
});