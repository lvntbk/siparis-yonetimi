📦 Sipariş Yönetimi Sistemi (Full-Stack & Cloud-Native)
Bu proje; modern yazılım geliştirme prensipleri ile DevOps süreçlerini birleştiren, yüksek erişilebilirlik (high availability) odaklı bir sipariş yönetim backend sistemidir. .NET 9 teknolojisi kullanılarak geliştirilmiş ve Kubernetes (K8s) orkestrasyonu ile containerize edilmiştir.

🚀 Öne Çıkan Özellikler
Modern Backend: .NET 9 Web API ve Entity Framework Core.

Kalıcı Veri: PostgreSQL veritabanı ile ilişkisel veri yönetimi.

Konteynerizasyon: Docker ve Docker Desktop üzerinde optimize edilmiş imajlar.

Orkestrasyon (Kubernetes): * Self-Healing: Pod'ların çökmesi durumunda otomatik yeniden başlatma.

Scaling: replicas: 2 konfigürasyonu ile yük dengeleme.

Service Discovery: Mikroservislerin iç ağ üzerinden ismen haberleşmesi.

DevOps Pratikleri: Port mapping, NodePort servisleri ve geçici tünelleme (Port-Forwarding) ile veritabanı yönetimi.

🛠️ Teknoloji Yığını
Dil/Framework: C# .NET 9

Veritabanı: PostgreSQL

Altyapı: Kubernetes, Docker, Docker Desktop

Araçlar: EF Core, Kubectl, PowerShell

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
    ## Mimari

Bu proje, katmanlı ve konteyner tabanlı bir mimariyi takip etmektedir.

- **Frontend**, backend ile RESTful HTTP uç noktaları üzerinden iletişim kurar.
- **Backend**, ASP.NET Web API kullanılarak geliştirilmiştir ve veri erişimi için Entity Framework Core kullanır.
- **PostgreSQL**, ilişkisel veritabanı olarak tercih edilmiştir.
- API ve veritabanı, **Docker** kullanılarak konteyner haline getirilmiştir.
- Sistem, ölçeklenebilirlik ve orkestrasyon amacıyla **Kubernetes** ortamında çalışacak şekilde tasarlanmıştır.



📂 Proje Yapısı
Plaintext

siparis-yonetimi/
├── SiparisApi/             # .NET 9 Web API Kaynak Kodları
│   ├── Controllers/        # API Uç Noktaları
│   ├── Models/             # Veri Modelleri
│   ├── Dockerfile          # Multi-stage Docker Yapılandırması
├── k8s/                    # Kubernetes Konfigürasyon Dosyaları (YAML)
│   ├── postgres-k8s.yaml   # Veritabanı Deployment ve Servis
│   ├── api-k8s.yaml        # API Deployment (8080 portu) ve NodePort Servis

⚙️ Kurulum ve Çalıştırma
1. Docker İmajını Oluşturma
PowerShell

cd SiparisApi
docker build -t siparis-api:v1 .
2. Kubernetes Üzerinde Yayına Alma
PowerShell

cd ../k8s
kubectl apply -f postgres-k8s.yaml
kubectl apply -f api-k8s.yaml
3. Veritabanı Migrasyonu (Port-Forwarding ile)
Kubernetes içindeki veritabanını güncellemek için güvenli bir tünel açın:

PowerShell

# Veritabanı pod adını öğrenin
kubectl get pods
# Tüneli başlatın
kubectl port-forward pod/[POD_ADI] 5432:5432
# Başka bir terminalde migrasyonu çalıştırın
dotnet ef database update --connection "Host=localhost;Port=5432;Database=SiparisDb;Username=postgres;Password=mysecretpassword"
🌐 Erişim
Uygulama ayağa kalktığında aşağıdaki adres üzerinden erişilebilir: http://localhost:30001/api/orders

✍️ Geliştirici Hakkında
Levent Software Developer | C# .NET & Web Technologies | DevOps Enthusiast

Gazetecilik ve felsefe geçmişinden gelen analitik düşünme yeteneğini, yazılım geliştirme ve modern altyapı süreçlerine aktaran bir geliştirici. Şu an Anadolu Üniversitesi ve Frontend Okulu'ndaki eğitimi ile Full-Stack yetkinliklerini derinleştirmeye devam etmektedir.
