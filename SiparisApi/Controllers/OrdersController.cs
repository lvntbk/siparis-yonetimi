using Microsoft.AspNetCore.Mvc;
using SiparisApi.Models;

namespace SiparisApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    // Geçici veritabanı simülasyonu
    private static List<Order> _orders = new List<Order>();

    [HttpGet]
    public IActionResult GetOrders()
    {
        return Ok(_orders);
    }

    [HttpPost]
    public IActionResult CreateOrder([FromBody] Order order)
    {
        order.Id = _orders.Count + 1;
        order.CreatedAt = DateTime.Now;
        _orders.Add(order);
        return CreatedAtAction(nameof(GetOrders), new { id = order.Id }, order);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateStatus(int id)
    {
        var order = _orders.FirstOrDefault(o => o.Id == id);
        if (order == null) return NotFound();

        order.Status = "Teslim Edildi";
        return Ok(order);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteOrder(int id)
    {
        var order = _orders.FirstOrDefault(o => o.Id == id);
        if (order == null) return NotFound();

        _orders.Remove(order);
        return NoContent();
    }
}