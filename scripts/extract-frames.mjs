import { execSync } from "child_process";
import { createRequire } from "module";
import { existsSync, mkdirSync, readdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const ffmpegPath = require("ffmpeg-static");
const projectRoot = resolve(__dirname, "..");
const videoPath = resolve(projectRoot, "Kamera_ve_Hareket_Birinci_şah.mp4");
const outputDir = resolve(projectRoot, "public", "frames");

if (!existsSync(videoPath)) {
  console.error("Video dosyası bulunamadı:", videoPath);
  process.exit(1);
}

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

console.log("Video analiz ediliyor...");

// Get video info
const probeCmd = `"${ffmpegPath}" -i "${videoPath}" 2>&1 || true`;
const probeOutput = execSync(probeCmd, { encoding: "utf8", shell: true });

const durationMatch = probeOutput.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
const fpsMatch = probeOutput.match(/(\d+(?:\.\d+)?)\s+fps/);

if (!durationMatch) {
  console.error("Video süresi okunamadı.");
  console.log(probeOutput.slice(0, 500));
  process.exit(1);
}

const hours = parseInt(durationMatch[1]);
const minutes = parseInt(durationMatch[2]);
const seconds = parseFloat(durationMatch[3]);
const totalSeconds = hours * 3600 + minutes * 60 + seconds;
const originalFps = fpsMatch ? parseFloat(fpsMatch[1]) : 30;

console.log(`Süre: ${totalSeconds.toFixed(2)}s, FPS: ${originalFps}`);

// Target ~300 frames: calculate needed fps
const TARGET_FRAMES = 300;
const targetFps = Math.min(TARGET_FRAMES / totalSeconds, originalFps).toFixed(3);
const estimatedFrames = Math.ceil(totalSeconds * parseFloat(targetFps));

console.log(`Hedef FPS: ${targetFps} → Tahmini frame sayısı: ${estimatedFrames}`);
console.log("Frame'ler çıkarılıyor (WebP formatı)...");

const extractCmd = [
  `"${ffmpegPath}"`,
  `-i "${videoPath}"`,
  `-vf "fps=${targetFps},scale=1920:-1"`,
  `-c:v libwebp`,
  `-quality 82`,
  `-y`,
  `"${outputDir}/frame-%04d.webp"`,
].join(" ");

try {
  execSync(extractCmd, { shell: true, stdio: "inherit" });
} catch {
  // ffmpeg exits with error code but may still produce output
}

const frames = readdirSync(outputDir).filter((f) => f.endsWith(".webp"));
console.log(`\n✓ ${frames.length} frame çıkarıldı → public/frames/`);
console.log(`\nConstants dosyasını güncelleyin: TOTAL_FRAMES = ${frames.length}`);
