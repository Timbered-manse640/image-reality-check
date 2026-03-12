# Image Reality Check

![Version](https://img.shields.io/badge/version-2.2.0-blue.svg)
![Manifest V3](https://img.shields.io/badge/manifest-v3-green.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)
![Privacy](https://img.shields.io/badge/privacy-100%25%20offline-brightgreen.svg)

**Chrome extension that automatically detects AI-generated images, beauty filters, and photo manipulation — all offline, all client-side.**

[🇨🇳 中文文档](README_CN.md)

---

## Features

- **AI-Generated Image Detection** — 6-dimension analysis (frequency spectrum, noise, color, texture, symmetry, edges)
- **Error Level Analysis (ELA)** — Colored heatmap revealing tampered or edited regions
- **Face Detection** — BlazeFace-powered face detection + skin smoothness analysis
- **Beauty Filter Detection** — Detects skin smoothing filters via texture variance
- **Screenshot Detection** — Automatically skips screenshots and non-photo images
- **Auto-Detection** — Scans all images on any webpage with progress indicator
- **Stamp Results** — Marks suspicious images directly on the page (AI / Beauty Filter / Edited)
- **Face-Only Mode** — Only analyze images containing faces (default ON)
- **Right-Click Analysis** — Deep analysis of any image via context menu
- **Settings Toggle** — Enable/disable auto-detection and face-only mode

## Privacy

**All processing happens locally in your browser.** No images are uploaded. No data is sent to any server. Zero network requests. Your images never leave your device.

## Installation

### Developer Mode

1. Download the [latest release](https://github.com/xbanboo/image-reality-check/releases/latest) and unzip
2. Open `chrome://extensions/` in Chrome
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** and select the unzipped directory

### Chrome Web Store

> Coming soon

## How It Works

### ELA (Error Level Analysis)

Re-compresses the image at a known quality level and compares the difference. Edited regions show higher error levels, visualized as a colored heatmap.

### Skin Smoothness Detection

Uses BlazeFace to detect faces, then analyzes skin texture variance in face regions (forehead, cheeks, chin). Unnaturally low variance indicates beauty filter usage.

### AI Generation Detection

Scores images across 6 dimensions:
- **Frequency Spectrum** — AI images have steeper high-frequency falloff
- **Noise Uniformity** — AI images have unnaturally uniform noise distribution
- **Color Distribution** — AI images have smoother color histograms
- **Texture Regularity** — AI images have more regular LBP texture patterns
- **Facial Symmetry** — AI-generated faces tend to be more symmetrical
- **Edge Coherence** — Detects AI-typical edge artifacts

### Screenshot Detection

Identifies screenshots via flat color block ratio, color diversity, and noise level. Screenshots are automatically skipped in auto-detection mode.

## Tech Stack

- **Manifest V3** — Modern Chrome extension architecture
- **TensorFlow.js** — Client-side ML inference
- **BlazeFace** — Real-time face detection model
- **Canvas API** — Image pixel manipulation and analysis
- **Pure JavaScript** — No build step, no frameworks

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT License](LICENSE) © 2026
