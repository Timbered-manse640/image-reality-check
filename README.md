<![CDATA[# 🔍 图片打假 (Image Reality Check)

<p align="center">
  <img src="icon128.png" alt="图片打假 Logo" width="128" height="128">
</p>

<p align="center">
  <strong>Chrome extension that automatically detects AI-generated images, beauty filters, and photo manipulation</strong><br>
  <strong>自动检测 AI 生成图片、美颜滤镜和图片篡改的 Chrome 扩展</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.2.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/manifest-v3-green.svg" alt="Manifest V3">
  <img src="https://img.shields.io/badge/license-MIT-orange.svg" alt="License">
  <img src="https://img.shields.io/badge/privacy-100%25%20offline-brightgreen.svg" alt="Privacy">
</p>

---

## ✨ Features / 功能

- 🤖 **AI-Generated Image Detection** — Analyzes 6 dimensions to estimate probability of AI generation
- 🔬 **Error Level Analysis (ELA)** — Colored heatmap revealing tampered or edited regions
- 👤 **Face Detection** — BlazeFace-powered face counting and skin smoothness analysis
- 🧴 **Beauty Filter Detection** — Measures skin texture uniformity to detect smoothing filters
- 📊 **Frequency Spectrum Analysis** — DCT-based analysis detecting compression artifacts and cloning
- 🔄 **Auto-Detection** — Automatically scans images on any webpage with progress indicator
- ⚙️ **Settings Toggle** — Enable/disable auto-detection per your preference
- 🖱️ **Right-Click Analysis** — Analyze any image via context menu

## 🔐 Privacy / 隐私

**All processing happens locally in your browser.** No images are uploaded. No data is sent to any server. Zero network requests. Your images never leave your device.

**所有分析均在浏览器本地完成。** 不上传图片，不发送任何数据，零网络请求。

## 📸 Screenshots / 截图

> *Coming soon*

## 📦 Installation / 安装

### Load Unpacked (Developer Mode)

1. Download or clone this repository
2. Open `chrome://extensions/` in Chrome
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** and select this directory

### Chrome Web Store

> *Coming soon*

## 🔧 How It Works / 原理

| Method | Description |
|--------|-------------|
| **ELA (Error Level Analysis)** | Re-compresses the image at a known quality level and compares the difference. Edited regions show higher error levels, visualized as a colored heatmap. |
| **Skin Smoothness** | Detects faces using BlazeFace, then analyzes skin texture variance in detected face regions. Unnaturally low variance indicates beauty filter usage. |
| **AI Generation Detection** | Scores images across 6 dimensions: color distribution uniformity, frequency domain artifacts, texture repetition patterns, edge consistency, noise distribution, and symmetry analysis. |
| **Frequency Spectrum** | Applies DCT (Discrete Cosine Transform) to detect periodic patterns, compression artifacts, and copy-paste manipulation traces. |
| **Auto-Detection** | Content script monitors page images, runs lightweight analysis automatically, and displays a floating indicator with results. |

## 🛠 Tech Stack / 技术栈

- **Manifest V3** — Modern Chrome extension architecture
- **TensorFlow.js** — Client-side ML inference
- **BlazeFace** — Real-time face detection model
- **Canvas API** — Image pixel manipulation and analysis
- **Pure JavaScript** — No build step, no frameworks

## 🤝 Contributing / 贡献

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License / 许可

[MIT License](LICENSE) © 2026
]]>