# HEARTz — Oficjalny Landing Page (Astro Edition)

Nowoczesna, ultra-lekka strona produktowa aplikacji **HEARTz**, zbudowana na **Astro (`astro.build`)** i zaprojektowana w estetyce luksusowego minimalizmu inspirowanego ElevenLabs oraz Nordic Audio Tech.

Zawiera w pełni funkcjonalną, interaktywną konsolę odsłuchową z autentycznymi próbkami dźwiękowymi wygenerowanymi bezpośrednio przez silnik HEARTz (bez konieczności posiadania konta i bez mockowanego syntezatora w JS).

---

## 1. Uruchomienie lokalne

Projekt oparty jest na **Astro v5 / v7** oraz TypeScript:

```bash
# Instalacja zależności
npm install

# Tryb deweloperski
npm run dev
# Dostępny pod: http://localhost:4321/

# Zbudowanie zoptymalizowanej wersji statycznej (SSG)
npm run build

# Uruchomienie lokalnego podglądu produkcyjnego
npm run preview
# Dostępny pod: http://localhost:4321/
```

---

## 2. Architektura i Konfiguracja

### A. Adres aplikacji (`APP_URL`)
Główny adres docelowy przycisków CTA („Otwórz HEARTz”):
* Aktywny adres: `https://heartz.pk-1ca.workers.dev/`
* Kontakt: `contact@aitificer.com` (autor: `@aitificer`, `https://aitificer.com/`)

### B. Design System i Tokeny (`src/styles/global.css`)
Estetyka Obsidian Cypress & Nordic Jade:
* Głęboka czerń cyprysowa: `#040705`
* Matowe szkło świerkowe: `#09120D` (powierzchnie kart `#0D1912`)
* Akcenty światła i fali: `#10B981` (Emerald), `#34D399` (Mint)
* Typografia: Inter + JetBrains Mono (kontrast 18.2:1, WCAG AAA)

### C. Próbki demonstracyjne (Audio)
Wszystkie pliki znajdują się w `public/audio/` i są generowane przez oficjalny silnik Rust `resonance-session`:
1. `deep_ground_10s.wav` (Preset: Deep Ground — 432 Hz + szum brązowy)
2. `soft_focus_10s.wav` (Preset: Soft Focus — 528 Hz AM + szum różowy)
3. `quiet_meditation_10s.wav` (Preset: Quiet Meditation — Różnica binauralna 7,83 Hz)
4. `converter_432hz_retuned_preview.wav` (Natural Resample 440 → 432 Hz)
5. `converter_440hz_original_preview.wav` (Oryginał 440 Hz do porównania A/B)

---

## 3. Kluczowe zalety i optymalizacje

* **Struktura Astro**: 100% czystego, statycznego HTML ze zminimalizowanym JavaScriptem (tzw. Island Architecture).
* **Interaktywna konsola odsłuchowa**:
  * Płynne rampy `GainNode` zapobiegające trzaskom przy start/stop.
  * Czas rzeczywisty oscyloskopu na elemencie HTML5 Canvas.
  * Bezpieczeństwo słuchu: domyślna głośność 30%, automatyczne wstrzymanie przy przełączeniu karty w przeglądarce (`visibilitychange`).
  * Pełne wsparcie dla czytników ekranu (`aria-live`, `aria-label`).
* **SEO & GEO**:
  * Pełne znaczniki Open Graph, Schema.org `WebApplication` JSON-LD.
  * Zgodnie ze specyfikacją roboczą strona zawiera `noindex, nofollow` do momentu ostatecznej publikacji produkcyjnej.
