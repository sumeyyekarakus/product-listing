# Ürün Listeleme Uygulaması · Product Listing App

React (Vite) + Node (Express) ile geliştirilen, **gerçek zamanlı altın gram fiyatına** göre **dinamik fiyat** hesaplayan ve verilen tasarıma uygun **carousel’li** ürün listeleme uygulaması.

## 🇹🇷 Genel Bakış

### Backend (Express)

* `products.json` dosyasını okur ve **`/api/products`** üzerinden servis eder.
* Fiyat formülü: **`Price = (popularityScore + 1) * weight * goldPrice`**
* `goldPrice` (USD/gram) **gerçek zamanlı API**’den alınır (GoldAPI / Metals API). İstek başarısız olursa **fallback** değer ve **cache** devreye girer.
* (İsteğe bağlı) **Filtreler**: `priceMin`, `priceMax`, `popMin`, `popMax`.

### Frontend (React + Vite + Swiper)

* Ürünleri backend’den çeker; kartlar **tasarıma yakın** şekilde gösterilir.
* **Carousel**: Masaüstünde **4 kart** görünür, **her tıklamada 1 kart** kayar; altta **sürüklenebilir scrollbar** bulunur.
* **Eşit aralıklar**: `spaceBetween = slidesOffsetBefore = slidesOffsetAfter`; kenarlarda **yarım kart görünmez** (`overflow: hidden`).
* **Özel ok tuşları**: Siyah, **görsel satırı** hizasında, **ekran kenarlarına yakın**.
* **Renk seçici**: Sıra **yellow → white → rose**; seçili renkte **beyaz + siyah halka**.
* **Popülarite**: **5’lik skala**, **1 ondalık** ile gösterilir.
* **Tipografi**: Başlık **Avenir Book 45**, ürün adı **Montserrat Medium 15**, fiyat **Montserrat Regular 15**.

---

## 🇬🇧 Overview

### Backend (Express)

* Reads `products.json` and serves it via **`/api/products`**.
* Pricing formula: **`Price = (popularityScore + 1) * weight * goldPrice`**
* `goldPrice` (USD per gram) is fetched from a **real-time API** (GoldAPI / Metals API). If the request fails, a **fallback** value and **cache** are used.
* (Optional) **Filters**: `priceMin`, `priceMax`, `popMin`, `popMax`.

### Frontend (React + Vite + Swiper)

* Fetches products from the backend and renders cards **matching the provided design**.
* **Carousel**: Shows **4 cards** on desktop, moves **1 card per click**, and includes a **draggable bottom scrollbar**.
* **Equal spacing**: `spaceBetween = slidesOffsetBefore = slidesOffsetAfter`; **no half slides** at the edges (`overflow: hidden`).
* **Custom navigation arrows**: Black, aligned with the **image row**, positioned **near the screen edges**.
* **Color picker**: Fixed order **yellow → white → rose**; active color shows **white + black rings**.
* **Popularity rating**: Displayed on a **5-point scale** with **1 decimal**.
* **Typography**: Heading **Avenir Book 45**, product name **Montserrat Medium 15**, price **Montserrat Regular 15**.


<img width="1916" height="936" alt="Ekran görüntüsü 2025-10-06 002044" src="https://github.com/user-attachments/assets/e9956cc8-a6d1-4612-9760-ec98f5b7beae" />
