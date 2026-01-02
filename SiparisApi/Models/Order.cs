namespace SiparisApi.Models;

public class Order
{
    public int Id { get; set; }
    public string OrderNo { get; set; } = string.Empty;
    public string Product { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public string Status { get; set; } = "Hazýrlanýyor";
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}
