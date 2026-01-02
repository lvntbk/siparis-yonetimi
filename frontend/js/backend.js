const API_BASE_URL = "http://localhost:5000/api/orders";

export async function fetchOrders() {
    const response = await fetch(API_BASE_URL);
    return await response.json();
}

export async function createOrder(order) {
    const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
    });
    return await response.json();
}