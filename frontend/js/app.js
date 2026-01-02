import { fetchOrders, createOrder } from "./backend.js";
import { setOrders } from "./state.js";
import { render, showToast } from "./ui.js";

const elements = {
    product: document.getElementById("productInput"),
    quantity: document.getElementById("quantityInput"),
    addBtn: document.getElementById("addBtn"),
    filter: document.getElementById("statusFilter"),
    role: document.getElementById("roleSelect"),
    form: document.getElementById("orderForm"),
    spinner: document.getElementById("spinner")
};

function sanitizeHTML(str) {
    const p = document.createElement('p');
    p.textContent = str;
    return p.innerHTML;
}

const handleAddOrder = async () => {
    let productValue = elements.product.value.trim();
    const quantityValue = parseInt(elements.quantity.value);

    productValue = sanitizeHTML(productValue);

    if (!productValue || productValue.length < 2) {
        showToast("Ürün adı en az 2 karakter olmalıdır.", "error");
        return;
    }

    if (productValue.length > 50) {
        showToast("Ürün adı çok uzun.", "error");
        return;
    }

    if (isNaN(quantityValue) || quantityValue <= 0 || quantityValue > 100) {
        showToast("Lütfen 1-100 arası geçerli bir adet giriniz.", "error");
        return;
    }

    elements.addBtn.disabled = true;

    try {
        const now = new Date();
        const newOrder = {
            id: Date.now(),
            orderNo: Math.floor(100000 + Math.random() * 900000),
            product: productValue,
            quantity: quantityValue,
            status: "Hazırlanıyor",
            date: now.toLocaleDateString('tr-TR'),
            time: now.toLocaleTimeString('tr-TR')
        };

        await createOrder(newOrder);
        
        elements.product.value = "";
        elements.quantity.value = "";
        
        showToast("Sipariş başarıyla eklendi");
        await refresh(); 
    } catch (err) {
        showToast("Sipariş eklenirken bir hata oluştu", "error");
        console.error(err);
    } finally {
        elements.addBtn.disabled = false;
    }
};

async function refresh() {
    try {
        const data = await fetchOrders();
        setOrders(data);
        render(elements.filter.value);
    } catch (err) {
        showToast("Veriler güncellenemedi", "error");
    }
}

elements.addBtn.addEventListener("click", handleAddOrder);
elements.filter.addEventListener("change", () => render(elements.filter.value));
elements.role.addEventListener("change", () => {
    const isAdmin = elements.role.value === "admin";
    elements.form.style.display = isAdmin ? "flex" : "none";
});

window.addEventListener("orders:changed", refresh);
document.addEventListener("loading:start", () => elements.spinner.classList.remove("hidden"));
document.addEventListener("loading:end", () => elements.spinner.classList.add("hidden"));

const init = () => {
    refresh();
    elements.role.dispatchEvent(new Event('change'));
};

init();