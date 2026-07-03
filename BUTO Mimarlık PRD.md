# **BUTO MİMARLIK \- WEB PROJESİ GEREKSİNİM DÖKÜMANI (PRD)**

**Tarih:** 3 Temmuz 2026

**Proje Sürümü:** v1.0 (Aşama 1: Çekirdek Animasyon ve Kapı Deneyimi)

**Hazırlayan:** Kıdemli İş Analisti & Proje Yöneticisi

## **1\. Proje Özeti (Executive Summary)**

BUTO Mimarlık web sitesi, klasik bir kurumsal web sitesinden ziyade, ziyaretçisine interaktif bir deneyim sunmayı hedefleyen modern bir dijital üründür. Projenin merkezinde, kullanıcının kaydırma (scroll) hareketiyle birinci şahıs perspektifinden bir video/görsel dizisinde ilerlediği (video scrubbing) bir animasyon yer almaktadır. Arayüzde yer alan "illüzyonist" bir şifre ekranı ile kullanıcıda bir keşif ve ayrıcalık hissi uyandırılacak, ardından Next.js mimarisi üzerinde çalışan, performans odaklı bir "Hero" (Karşılama) ekranına geçiş yapılacaktır.

Proje, çevik (agile) mantıkla ele alınacak olup, bu döküman giriş animasyonu, kapı şifresi ve Hero bölümünü kapsayan *Faz 1* sürecine odaklanmaktadır.

## **2\. Hedef Kitle ve Kullanıcı Senaryosu (User Flow)**

**Hedef Kitle:** Yenilikçi tasarımlara ilgi duyan potansiyel müşteriler, mimari portfolyo incelemek isteyen paydaşlar.

**Adım Adım Kullanıcı Senaryosu:**

1. **Ziyaret ve Yükleme:** Kullanıcı siteye girer. Tüm animasyon kareleri (image sequence) arka planda yüklenirken, ekranda nefes alıp veren (pulse) BUTO logosu ve altında dolan bir yükleme çubuğu (Loading bar) belirir.  
2. **Kilitli Kapı ve Şifre:** Yükleme tamamlandığında ilk animasyon karesi ekrana gelir. Kullanıcının karşısında bir şifre giriş alanı vardır. Altında *"Herhangi bir şifre girebilirsiniz"* şeklinde yönlendirici bir mikro-metin (microcopy) bulunur.  
3. **Giriş ve Etkileşim:** Kullanıcı herhangi bir karakter dizisi girip onayladığında "Şifre Doğru" kabul edilir.  
4. **Scroll Etkileşimi:** Kullanıcı sayfa üzerinde aşağı kaydırma (scroll) veya dokunarak kaydırma (touch-swipe) işlemi yaptıkça, kapının açılması veya mekanda ilerleme animasyonu (kare kare) kullanıcının hızıyla senkronize olarak oynar.  
5. **Hero Ekranı:** Animasyonun son karesine gelindiğinde pürüzsüz bir geçişle "Hero" (Karşılama) bölümü ve ana BUTO logosu ekranda yerini alır.

## **3\. Fonksiyonel Gereksinimler**

* **Preloader (Yükleyici) Mantığı:** \* Sayfa açıldığında ana içerik gizli kalacak (display: none veya opacity: 0).  
  * Image Sequence dosyalarının (Örn: 200 adet .webp formatlı görsel) tamamı tarayıcı önbelleğine (cache) alınacak.  
  * Yüklenen dosya yüzdesi (0-100%) loading bar'ın genişliğine (width) eşitlenecek.  
* **Şifre (Fake Auth) Algoritması:**  
  * Herhangi bir backend veritabanı sorgusu **yapılmayacak.**  
  * Form submit edildiğinde (veya Enter'a basıldığında) input'un içi boş değilse (length \> 0\) direkt başarılı durum animasyonu tetiklenecek.  
* **Scroll-to-Sequence Algoritması:**  
  * GSAP ScrollTrigger, sayfanın belirli bir yüksekliğini (örn: 3000px) animasyon süresi (timeline) olarak kabul edecek.  
  * Kullanıcının bu 3000px içindeki mevcut scroll pozisyonu, 0 ile toplam görsel sayısı (örn: 200\) arasında bir değere map edilecek (matematiksel oranlama).  
  * Çıkan tam sayı (integer), HTML5 \<canvas\> üzerine çizilecek görselin index numarasını belirleyecek.

## **4\. Teknik Gereksinimler**

* **Frontend Framework:** React tabanlı **Next.js** (App Router veya Pages Router \- Geliştirici tercihine göre).  
* **Animasyon Motoru:** **GSAP** (GreenSock Animation Platform) ve **ScrollTrigger** eklentisi.  
* **Render Yöntemi:** \<video\> etiketi yerine, yüksek performans için **HTML5 \<canvas\>** kullanılacak (Image Sequence oynatımı için).  
* **Stil Dili:** Tailwind CSS veya CSS Modules (Animasyon dışı arayüz elemanları için).  
* **Hosting Ortamı:** Vercel (Next.js için en optimize ve native platform).  
* **SEO Yapılandırması:** SEO önemsenmediği için, sayfanın \<head\> kısmına \<meta name="robots" content="noindex, nofollow"\> etiketi eklenecek.

## **5\. Performans ve Optimizasyon Kriterleri**

* **Görsel Formatı:** Video kareleri, kayıpsız ve düşük boyutlu olan **.WebP** veya kalite gereksinimine göre sıkıştırılmış **.JPG** formatında dışa aktarılmalıdır. (Bölüm başına max 100-200 KB).  
* **Preloading Şartı:** Yükleme ekranı %100 olmadan kullanıcı şifre ekranına alınmamalıdır. Aksi takdirde scroll sırasında görseller yüklenmeye çalışırken ekran "titrer" veya siyah kalır.  
* **Canvas Temizliği:** Bellek sızıntılarını (memory leak) önlemek için Next.js useEffect hook'u içinde her render'dan önce canvas'ın temizlendiğinden (clearRect) emin olunmalıdır.

## **6\. UX/UI ve Mobil Uyumluluk Kriterleri**

* **Mobil Deneyim (Öncelikli Uyarılama):** Müşterinin talebi üzerine masaüstündeki "kaydırarak videoyu ilerletme" mantığı mobilde de korunmaya çalışılacaktır.  
* **Touch Action:** Mobilde sayfanın kendi varsayılan scroll davranışının animasyonla çakışmaması için CSS'te overscroll-behavior: none ve düzgün bir touch-action yapılandırması yapılmalıdır.  
* **UI Geri Bildirimleri:** Şifre ekranında buton hover durumları, imleç (cursor) değişiklikleri ve BUTO logosunun organik "nefes alma" (scale in/out ve blur varyasyonları) animasyonları yumuşak (ease-in-out) geçişlere sahip olmalıdır.

*Not: Bu PRD, projenin 1\. Fazını (Giriş, Şifre ve Hero) kapsamaktadır. Bu kısımların kodlanması ve tasarımının onaylanmasının ardından Hakkımızda, Projeler gibi diğer statik/CMS bağlantılı bölümler için PRD güncellenecektir.*