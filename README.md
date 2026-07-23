# BUTO Mimarlık — Web Sitesi

BUTO Mimarlık için geliştirilmiş, sinematik tek sayfalık (one-page) kurumsal web sitesi. Next.js App Router üzerine kurulu, kaydırma ile yönetilen (scroll-driven) bir kare dizisi animasyonuyla açılan, portföy galerisi ve iletişim bölümleri içeren bir mimarlık ofisi tanıtım sitesi.

## Öne Çıkan Özellikler

- **Sinematik giriş sekansı** — `public/frames` altındaki kare dizisi, scroll pozisyonuna göre `<canvas>` üzerine çizilir; bir noktada dijital kapı kilidi (PIN) etkileşimiyle devam eder (`CanvasSequence.tsx`, `LockPad.tsx`).
- **Portföy galerisi** — firma/proje bazlı, yatay kaydırmalı görsel galerileri; fotoğraf ve video (native `<video>`) desteği (`Projects.tsx`).
- **Hizmetler bölümü** — daktilo efektiyle beliren açıklamalar ve hizmete özel WhatsApp yönlendirmesi (`Services.tsx`).
- **SEO** — sayfa genelinde `<h1>`, zengin `alt` metinleri, `sitemap.ts`, `robots.ts` ve JSON-LD (`LocalBusiness`) yapılandırması (`layout.tsx`).
- Özel imleç, mıknatıslı buton, parçacık efektleri gibi ince etkileşim detayları.

## Teknoloji Yığını

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [GSAP](https://gsap.com) (ScrollTrigger, ScrollToPlugin) — scroll-jacking ve animasyonlar
- [Framer Motion](https://www.framer.com/motion/)

## Başlarken

Bağımlılıkları kurup geliştirme sunucusunu başlatın:

```bash
npm install
npm run dev
```

Ardından [http://localhost:3000](http://localhost:3000) adresini tarayıcıda açın.

## Komutlar

| Komut           | Açıklama                              |
| --------------- | -------------------------------------- |
| `npm run dev`   | Geliştirme sunucusunu başlatır (Turbopack) |
| `npm run build` | Üretim derlemesi oluşturur              |
| `npm run start` | Üretim derlemesini çalıştırır           |
| `npm run lint`  | ESLint kontrolü çalıştırır              |

## Proje Yapısı

```
src/
  app/            # App Router giriş noktası, metadata, sitemap/robots
  components/     # Sayfa bölümleri (Hero, About, Services, Projects, Contact, ...)
  hooks/          # useImagePreloader — kare dizisini önden yükler
  lib/constants.ts# Kare dizisi ayarları (TOTAL_FRAMES, LOCK_FRAME, dosya öneki)
public/
  frames/         # Giriş sekansının kare görselleri (webp)
  images/projects/# Portföydeki firmalara ait görsel/video klasörleri
```

Kare dizisinin dosya adı öneki ve toplam kare sayısı gibi ayarlar `src/lib/constants.ts` içinde tanımlıdır; `public/frames` klasöründeki dosya adları değiştirilirse bu dosyanın da güncellenmesi gerekir.
