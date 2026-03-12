# 图片打假 Image Reality Check

![Version](https://img.shields.io/badge/version-2.2.0-blue.svg)
![Manifest V3](https://img.shields.io/badge/manifest-v3-green.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)
![Privacy](https://img.shields.io/badge/privacy-100%25%20offline-brightgreen.svg)

**Chrome extension that automatically detects AI-generated images, beauty filters, and photo manipulation — all offline, all client-side.**

**自动检测 AI 生成图片、美颜滤镜和图片篡改的 Chrome 扩展，完全离线，完全本地。**

---

## Features 功能

- **AI 生成图片检测** — 6 维度分析（频谱、噪点、色彩、纹理、对称性、边缘），估算 AI 生成概率
- **ELA 误差分析** — 彩色热力图揭示篡改和编辑区域
- **人脸检测** — BlazeFace 驱动的人脸识别 + 皮肤平滑度分析
- **美颜滤镜检测** — 通过皮肤纹理方差检测磨皮滤镜
- **自动检测** — 打开任何网页自动扫描图片，带进度条指示
- **结果盖章** — 检测到问题图片直接在原图上盖章标记
- **设置开关** — 可随时开关自动检测
- **右键分析** — 右键任意图片手动深度分析

## Privacy 隐私

**所有分析均在浏览器本地完成。** 不上传图片，不发送任何数据，零网络请求。你的图片永远不会离开你的设备。

**All processing happens locally in your browser.** No images are uploaded. No data is sent to any server. Zero network requests.

## Installation 安装

### 开发者模式加载

1. 下载或 clone 本仓库
2. Chrome 打开 `chrome://extensions/`
3. 开启右上角 **开发者模式**
4. 点击 **加载已解压的扩展程序**，选择本目录

### Chrome Web Store

> Coming soon

## How It Works 原理

### ELA 误差级别分析

以已知质量重新压缩图片并对比差异。被编辑过的区域会显示更高的误差级别，以彩色热力图呈现。

### 皮肤平滑度检测

使用 BlazeFace 检测人脸，分析面部皮肤区域（额头、脸颊、下巴）的纹理方差。方差异常低 = 美颜滤镜。

### AI 生成检测

从 6 个维度评估图片：
- **频谱分析** — AI 图片高频成分衰减更陡
- **噪点均匀度** — AI 图片噪声分布异常均匀
- **色彩分布** — AI 图片直方图更平滑
- **纹理规律性** — AI 图片 LBP 纹理更规则
- **面部对称性** — AI 生成的脸更对称
- **边缘一致性** — 检测 AI 典型的边缘伪影

### 自动检测

Content Script 监控页面图片加载，自动运行轻量分析，在图片上显示进度条和结果标记。

## Tech Stack 技术栈

- **Manifest V3** — Chrome 扩展架构
- **TensorFlow.js** — 浏览器端 ML 推理
- **BlazeFace** — 实时人脸检测模型
- **Canvas API** — 图像像素操作与分析
- **Pure JavaScript** — 无构建步骤，无框架依赖

## Contributing 贡献

欢迎贡献！

1. Fork 本仓库
2. 创建功能分支 `git checkout -b feature/amazing-feature`
3. 提交更改 `git commit -m 'Add amazing feature'`
4. 推送分支 `git push origin feature/amazing-feature`
5. 发起 Pull Request

## License 许可

[MIT License](LICENSE) © 2026
