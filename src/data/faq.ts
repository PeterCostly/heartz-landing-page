export interface FaqItem {
  q: string;
  a: string;
  plainText?: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What makes 432 Hz different from standard 440 Hz?",
    a: "A4 = 440 Hz is a common tuning reference. Retuning it to A4 = 432 Hz lowers pitch by about 31.8 cents. Listen to both and choose what you prefer."
  },
  {
    q: "Which audio files can I convert?",
    a: "HEARTz supports specified WAV and FLAC formats. MP3 is not supported. File-size and export limits depend on your browser and device."
  },
  {
    q: "Will converting 440 to 432 Hz change the tempo?",
    a: "Yes. Natural resampling lowers pitch and slows tempo slightly. With a 440-to-432 reference change, the result is about 1.85% longer."
  },
  {
    q: "Do I need headphones to use this?",
    a: "Speakers or headphones can play tones and retuned music. For <strong>binaural beats</strong>, use stereo headphones so each ear receives a different frequency.",
    plainText: "Speakers or headphones can play tones and retuned music. For binaural beats, use stereo headphones so each ear receives a different frequency."
  },
  {
    q: "Why do you recommend starting at low volume?",
    a: "Your device and headphones affect the actual sound level. Start low, raise it only to a comfortable level, and stop if listening feels uncomfortable."
  },
  {
    q: "Is HEARTz free and private?",
    a: "HEARTz is free to use. Sign in with email or Google. Audio files are processed in your browser; your account uses Firebase Authentication, while saved settings and library items stay in this browser."
  },
  {
    q: "Will my saved sounds appear on another device?",
    a: "Your library saves settings and recipes in this browser, not audio tracks. It does not sync across devices yet. Use the available settings backup to keep a copy."
  },
  {
    q: "Can I use HEARTz on my phone?",
    a: "Yes. HEARTz has a compact layout for mobile browsers. Samples and the main tools are available on a phone, but long audio conversions may be slower or limited by device memory. A desktop browser offers more room for detailed controls and larger files."
  },
  {
    q: "Why is there no sound on my phone?",
    a: "Tap Play or Start, check your media volume and output device, then try headphones. On iPhone, older browser versions may silence generated Web Audio when the Ring/Silent switch is on. HEARTz requests a playback audio session where the browser supports it; if sound is still missing, try switching Silent off and reopening the page."
  }
];
