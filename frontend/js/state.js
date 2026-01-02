export let orders = [];

export function setOrders(data) {
    // Veriyi kopyalayarak atamak (spread operator), referans hatalarını önler
    orders = [...data];
    
    // Veri değiştiğinde haber vermek için opsiyonel bir event tetiklenebilir
    // window.dispatchEvent(new Event("state:updated"));
}

// İleride filtreleme veya hesaplama mantığını buraya taşıyabilirsin
export function getOrderCounts() {
    return {
        total: orders.length,
        preparing: orders.filter(o => o.status === "Hazırlanıyor").length,
        completed: orders.filter(o => o.status === "Teslim Edildi").length
    };
}