# 📦 Sipariş Yönetimi Sistemi (Full-Stack & Cloud-Native)

Bu proje; modern yazılım geliştirme prensipleri ile DevOps süreçlerini birleştiren,  
**yüksek erişilebilirlik (High Availability)** odaklı bir sipariş yönetim **backend** sistemidir.

.NET 9 teknolojisi kullanılarak geliştirilmiş, Docker ile konteynerize edilmiş ve  
**Kubernetes (K8s)** orkestrasyonu ile çalışacak şekilde tasarlanmıştır.

---

## 🚀 Öne Çıkan Özellikler

- **Modern Backend:** ASP.NET Web API (.NET 9) ve Entity Framework Core
- **Kalıcı Veri:** PostgreSQL ile ilişkisel veri yönetimi
- **Konteynerizasyon:** Docker ve multi-stage build yapısı
- **Kubernetes Orkestrasyonu:**
  - **Self-Healing:** Pod çökmesi durumunda otomatik yeniden başlatma
  - **Scaling:** `replicas: 2` ile yük dengeleme
  - **Service Discovery:** Servislerin cluster içi haberleşmesi
- **DevOps Pratikleri:**
  - NodePort servisleri
  - Port-Forwarding ile veritabanı erişimi
  - Ortamdan bağımsız deploy süreci

---

## 🛠️ Teknoloji Yığını

- **Dil / Framework:** C# – .NET 9
- **Veritabanı:** PostgreSQL
- **Altyapı:** Docker, Kubernetes, Docker Desktop
- **Araçlar:** Entity Framework Core, kubectl, PowerShell

---

## 🏗️ Mimari

Bu proje, **katmanlı ve konteyner tabanlı** bir mimariyi takip etmektedir.

- **Frontend**, backend ile RESTful HTTP uç noktaları üzerinden iletişim kurar.
- **Backend**, ASP.NET Web API kullanılarak geliştirilmiştir ve veri erişimi için Entity Framework Core kullanır.
- **PostgreSQL**, ilişkisel veritabanı olarak kullanılır.
- API ve veritabanı **Docker** ile konteynerize edilmiştir.
- Sistem, ölçeklenebilirlik ve orkestrasyon için **Kubernetes** ortamında çalışacak şekilde tasarlanmıştır.

### Mimari Diyagram

```mermaid
flowchart LR
    User[👤 User / Browser]
    FE[🌐 Frontend<br/>HTML + CSS + JS]
    API[⚙️ .NET Web API]
    DB[(🗄️ PostgreSQL)]
    Docker[🐳 Docker]
    K8s[☸️ Kubernetes]

    User --> FE
    FE -->|HTTP / JSON| API
    API -->|EF Core| DB

    API --> Docker
    DB --> Docker

    Docker --> K8s

📂 Proje Yapısı
siparis-yonetimi/
├── SiparisApi/
│   ├── Controllers/        # API uç noktaları
│   ├── Models/             # Veri modelleri
│   ├── Dockerfile          # Multi-stage Docker yapılandırması
│
├── k8s/
│   ├── postgres-k8s.yaml   # PostgreSQL Deployment & Service
│   ├── api-k8s.yaml        # API Deployment & NodePort Service

⚙️ Kurulum ve Çalıştırma
1️⃣ Docker İmajını Oluşturma
cd SiparisApi
docker build -t siparis-api:v1 .

2️⃣ Kubernetes Üzerinde Yayına Alma
cd ../k8s
kubectl apply -f postgres-k8s.yaml
kubectl apply -f api-k8s.yaml
3️⃣ Veritabanı Migrasyonu (Port-Forwarding)
kubectl get pods
kubectl port-forward pod/[POD_ADI] 5432:5432


Ardından başka bir terminalde:
dotnet ef database update --connection "Host=localhost;Port=5432;Database=SiparisDb;Username=postgres;Password=mysecretpassword"
> ⚠️ Bu bağlantı bilgileri yalnızca **lokal geliştirme ve demo amaçlıdır**.  
> Üretim ortamlarında şifreler **Environment Variables** veya  
> **Kubernetes Secrets** kullanılarak yönetilmelidir.

🌐 Erişim

Uygulama çalıştığında API aşağıdaki adres üzerinden erişilebilir:

http://localhost:30001/api/orders

✍️ Geliştirici Hakkında

Levent İnce
Software Developer | C# .NET & Web Technologies | DevOps Enthusiast

Gazetecilik ve felsefe geçmişinden gelen analitik düşünme yeteneğini,
yazılım geliştirme ve modern altyapı süreçleriyle birleştiren bir geliştirici.

Şu anda Anadolu Üniversitesi ve Frontend Okulu bünyesinde eğitimine devam ederek
Full-Stack ve Cloud-Native yetkinliklerini derinleştirmektedir.
