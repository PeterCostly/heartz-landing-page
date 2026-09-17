use std::fs;
use std::path::Path;

use resonance_scheduler::{ProtocolCompiler, ProtocolOfflineRenderer, ScheduleCompiler};
use resonance_session::{GuidedSessionCompiler, guided_preset_catalog};
use sha2::{Digest, Sha256};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("=== HEARTz Landing Demo Generator ===");
    let presets = guided_preset_catalog();
    let target_dir = Path::new("../../public/audio");
    fs::create_dir_all(target_dir)?;

    let selected_ids = ["deep-ground", "soft-focus", "quiet-meditation"];
    let rate = 48_000;
    let channels = 2;
    let duration_seconds = 10;

    let mut manifest = Vec::new();

    for id in selected_ids {
        let preset = presets.iter().find(|p| p.id == id).expect("preset found");
        println!("Compiling preview for: {} ({})", preset.name, preset.id);

        let mut draft = preset.draft.clone();
        draft.safety_acknowledgement = true;

        let compiled = GuidedSessionCompiler::compile_preview(&draft, duration_seconds)?;
        let plan = ProtocolCompiler::compile(&compiled.protocol)?;
        let prepared = ScheduleCompiler::compile(&plan, rate, channels)?;
        let render = ProtocolOfflineRenderer::render(prepared, 2048)?;

        let filename = format!("{}_10s.wav", id.replace('-', "_"));
        let out_path = target_dir.join(&filename);
        fs::write(&out_path, &render.wav_pcm24)?;

        let mut hasher = Sha256::new();
        hasher.update(&render.wav_pcm24);
        let hash = format!("{:x}", hasher.finalize());

        println!("Wrote: {} (size: {} bytes, sha256: {})", out_path.display(), render.wav_pcm24.len(), hash);

        manifest.push(serde_json::json!({
            "id": preset.id,
            "name": preset.name,
            "file": filename,
            "durationSeconds": duration_seconds,
            "sampleRate": rate,
            "channels": channels,
            "format": "WAV PCM24",
            "sha256": hash,
            "description": preset.description,
            "listeningAdvice": preset.listening_guidance,
            "backgroundGainDbfs": preset.draft.background_gain_dbfs,
            "resonanceGainDbfs": preset.draft.resonance_gain_dbfs,
        }));
    }

    // Also copy the authentic retuned converter preview from acceptance artifacts
    let converter_retuned_src = Path::new("../../../converter_preview_corrective_acceptance/03_retuned_preview.wav");
    if converter_retuned_src.exists() {
        let retuned_bytes = fs::read(converter_retuned_src)?;
        let converter_filename = "converter_432hz_retuned_preview.wav";
        let converter_out = target_dir.join(converter_filename);
        fs::write(&converter_out, &retuned_bytes)?;

        let mut hasher = Sha256::new();
        hasher.update(&retuned_bytes);
        let hash = format!("{:x}", hasher.finalize());

        println!("Copied Converter preview: {} (size: {} bytes)", converter_out.display(), retuned_bytes.len());

        manifest.push(serde_json::json!({
            "id": "converter-432",
            "name": "Konwerter: Przestrojenie 432 Hz",
            "file": converter_filename,
            "durationSeconds": 3.06,
            "sampleRate": 48000,
            "channels": 2,
            "format": "WAV IEEE_FLOAT32 (Natural Resample 440 -> 432)",
            "sha256": hash,
            "description": "Autentyczny fragment utworu przestrojony ze stroju 440 Hz do 432 Hz za pomocą Natural Resample w HEARTz.",
            "listeningAdvice": "Zwróć uwagę na subtelne obniżenie tonu i spowolnienie tempa utworu.",
        }));
    }

    let converter_orig_src = Path::new("../../../converter_preview_corrective_acceptance/01_original_preview.wav");
    if converter_orig_src.exists() {
        let orig_bytes = fs::read(converter_orig_src)?;
        let orig_filename = "converter_440hz_original_preview.wav";
        let orig_out = target_dir.join(orig_filename);
        fs::write(&orig_out, &orig_bytes)?;

        let mut hasher = Sha256::new();
        hasher.update(&orig_bytes);
        let hash = format!("{:x}", hasher.finalize());

        manifest.push(serde_json::json!({
            "id": "converter-440-orig",
            "name": "Konwerter: Oryginał 440 Hz",
            "file": orig_filename,
            "durationSeconds": 3.00,
            "sampleRate": 48000,
            "channels": 2,
            "format": "WAV IEEE_FLOAT32 (Original 440 Hz)",
            "sha256": hash,
            "description": "Oryginalny fragment utworu w standardowym stroju 440 Hz.",
            "listeningAdvice": "Punkt odniesienia do porównania ze strojem 432 Hz.",
        }));
    }

    let manifest_json = serde_json::to_string_pretty(&manifest)?;
    fs::write(target_dir.join("AUDIO_MANIFEST.json"), &manifest_json)?;
    println!("Manifest written to {}", target_dir.join("AUDIO_MANIFEST.json").display());

    Ok(())
}
