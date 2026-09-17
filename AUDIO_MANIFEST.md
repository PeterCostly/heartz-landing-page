# Manifest Pochodzenia Próbek Audio (HEARTz Demo)

Wszystkie pliki dźwiękowe wykorzystane w module odsłuchowym na landing page’u są w 100% autentycznymi materiałami wygenerowanymi przez oficjalny silnik DSP i kompilator sesji HEARTz (`resonance-session` / `resonance-scheduler`). 

Nie zastosowano żadnej muzyki stockowej ani zewnętrznych generatorów JavaScript.

---

## Tabela Próbek

| ID | Nazwa | Plik | Czas | Sample Rate | Format | SHA-256 Checksum |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `deep-ground` | Deep Ground | `deep_ground_10s.wav` | 10.0 s | 48 000 Hz, Stereo | WAV PCM24 | `06db1593f7611fc3c921526afb88bcd032c52792ccec1cbd028545f518e3ddbe` |
| `soft-focus` | Soft Focus | `soft_focus_10s.wav` | 10.0 s | 48 000 Hz, Stereo | WAV PCM24 | `5435a7bf462847dd26128e9ad8848f524cf37a1942a287f3d1e91f5df8ff60e1` |
| `quiet-meditation` | Quiet Meditation | `quiet_meditation_10s.wav` | 10.0 s | 48 000 Hz, Stereo | WAV PCM24 | `df76d5ba67fdef538c1bfa1712234eb1d28997ad52f774300a11bc160900609a` |
| `converter-432` | Konwerter 432 Hz | `converter_432hz_retuned_preview.wav` | 3.06 s | 48 000 Hz, Stereo | WAV Float32 | `71f6853df00c80e86b1068f58c8b85effa113c6973d1215c62ef8b397e1582a5` |
| `converter-440-orig` | Konwerter 440 Hz (Orig) | `converter_440hz_original_preview.wav` | 3.00 s | 48 000 Hz, Stereo | WAV Float32 | `dde394358712307773d41dfddfe7292bf0d140094ad8dabf378d5701b96e33df` |

---

## Parametry i Źródła

### 1. `deep-ground` (Sesja Prowadzona)
* **Kompilator:** `GuidedSessionCompiler::compile_preview(&draft, 10)`
* **Składniki:** 
  * Rezonans: czysty ton 432 Hz (`-24 dBFS`)
  * Podkład: proceduralny szum brązowy z filtrem dolnoprzepustowym (`-24 dBFS`) + niski pad harmoniczny 96 Hz (`-9 dBFS`).
* **Zalecenie odsłuchowe:** Głośniki lub słuchawki przy niskiej głośności.

### 2. `soft-focus` (Frequency Lab / AM)
* **Kompilator:** `GuidedSessionCompiler::compile_preview(&draft, 10)`
* **Składniki:**
  * Rezonans: ton 528 Hz z modulacją amplitudy AM (`-27 dBFS`)
  * Podkład: szum różowy z filtrem dolnoprzepustowym 4200 Hz (`-25 dBFS`) + pad trójkątny 264 Hz.
* **Zalecenie odsłuchowe:** Do pracy w skupieniu.

### 3. `quiet-meditation` (Rytmy Binauralne)
* **Kompilator:** `GuidedSessionCompiler::compile_preview(&draft, 10)`
* **Składniki:**
  * Rezonans: częstotliwość bazowa 432 Hz z różnicą binauralną 7,83 Hz (częstotliwość rezonansu Schumanna) rozdzielona na kanał lewy i prawy.
  * Podkład: proceduralny szum oceaniczny z modulacją unipolar AM (`-28 dBFS`).
* **Zalecenie odsłuchowe:** **Wymagane słuchawki stereo** do percepcji efektu dudnień binauralnych.

### 4. `converter-432` i `converter-440-orig` (Konwerter)
* **Źródło:** Pakiet akceptacyjny konwertera HEARTz (`converter_preview_corrective_acceptance`).
* **Metoda:** Natural Resample w Rust/WASM przestraja cały sygnał o współczynnik `432 / 440 = 0.981818...`, proporcjonalnie obniżając wysokość i tempo utworu.
