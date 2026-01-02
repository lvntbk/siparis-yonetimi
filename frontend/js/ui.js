import { orders } from "./state.js";
import { updateOrder, deleteOrder } from "./backend.js";

export function render(filter) {
    const list = document.getElementById("orderList");
    const total = document.getElementById("totalCount");
    const currentRole = document.getElementById("roleSelect").value;

    list.innerHTML = "";

    const filteredData = filter === "all" ? orders : orders.filter(o => o.status === filter);

    if (filteredData.length === 0) {
        list.innerHTML = `<li class="empty">Henüz sipariş bulunmuyor</li>`;
        total.textContent = "Toplam Sipariş: 0";
        return;
    }

    filteredData.forEach(o => {
        const li = document.createElement("li");
        li.className = `order-item ${o.status === 'Teslim Edildi' ? 'completed' : ''}`;
        
        li.innerHTML = `
            <div class="info">
                <strong>#${o.orderNo}</strong>
                <span>${o.product} (${o.quantity} Adet)</span>
                <small>${o.date} - ${o.time}</small>
                <span class="badge ${o.status === 'Hazırlanıyor' ? 'warning' : 'success'}">${o.status}</span>
            </div>
            <div class="actions"></div>
        `;

        const actionsContainer = li.querySelector(".actions");

        if (o.status === "Hazırlanıyor") {
            const completeBtn = document.createElement("button");
            completeBtn.textContent = "Tamamla";
            completeBtn.className = "complete";
            completeBtn.onclick = async () => {
                await updateOrder(o.id);
                showToast("Sipariş tamamlandı");
                window.dispatchEvent(new Event("orders:changed"));
            };
            actionsContainer.appendChild(completeBtn);
        }

        if (currentRole === "admin") {
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Sil";
            deleteBtn.className = "delete";
            deleteBtn.onclick = async () => {
                if (confirm("Siparişi silmek istediğinize emin misiniz?")) {
                    await deleteOrder(o.id);
                    showToast("Sipariş silindi", "error");
                    window.dispatchEvent(new Event("orders:changed"));
                }
            };
            actionsContainer.appendChild(deleteBtn);
        }

        list.appendChild(li);
    });

    total.textContent = `Toplam Sipariş: ${orders.length}`;
}

export function showToast(msg, type = "success") {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.className = `show ${type}`;
    setTimeout(() => t.classList.remove("show"), 2000);
}