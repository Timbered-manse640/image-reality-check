// Standalone analyzer module v2.0
// Core analysis logic is embedded in content.js
// This file provides utility functions for advanced/external usage

const ImageAnalyzer = {
  ela(img, quality = 0.95, scale = 10) {
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const original = ctx.getImageData(0, 0, w, h);
    const jpegUrl = canvas.toDataURL('image/jpeg', quality);
    return new Promise(resolve => {
      const reImg = new Image();
      reImg.onload = () => {
        ctx.drawImage(reImg, 0, 0);
        const recomp = ctx.getImageData(0, 0, w, h);
        const diff = new ImageData(w, h);
        let total = 0;
        for (let i = 0; i < original.data.length; i += 4) {
          const d = (Math.abs(original.data[i] - recomp.data[i]) + Math.abs(original.data[i+1] - recomp.data[i+1]) + Math.abs(original.data[i+2] - recomp.data[i+2])) / 3;
          total += d;
          const s = Math.min(255, d * scale);
          diff.data[i] = s < 128 ? 0 : Math.min(255, (s-128)*2);
          diff.data[i+1] = s < 128 ? s*2 : 255 - (s-128)*2;
          diff.data[i+2] = s < 128 ? 255 - s*2 : 0;
          diff.data[i+3] = 255;
        }
        const heatCanvas = document.createElement('canvas');
        heatCanvas.width = w; heatCanvas.height = h;
        heatCanvas.getContext('2d').putImageData(diff, 0, 0);
        resolve({ heatmapCanvas: heatCanvas, avgDiff: total / (w * h) });
      };
      reImg.src = jpegUrl;
    });
  },

  skinAnalysis(img) {
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, w, h).data;
    let skinPixels = 0, lapSum = 0, lapCount = 0;
    for (let y = 1; y < h-1; y++) {
      for (let x = 1; x < w-1; x++) {
        const i = (y*w+x)*4;
        const r = data[i], g = data[i+1], b = data[i+2];
        if (r > 95 && g > 40 && b > 20 && r > g && r > b && (r-g) > 15) {
          skinPixels++;
          const gray = (px) => (data[px] + data[px+1] + data[px+2]) / 3;
          const ci = y*w+x;
          const lap = Math.abs(gray((ci-1)*4) + gray((ci+1)*4) + gray((ci-w)*4) + gray((ci+w)*4) - 4*gray(ci*4));
          lapSum += lap;
          lapCount++;
        }
      }
    }
    const avgLap = lapCount > 0 ? lapSum / lapCount : 10;
    return { skinRatio: skinPixels / (w*h), avgSmoothness: avgLap, isBeautyFiltered: avgLap < 4 };
  }
};

if (typeof module !== 'undefined') module.exports = ImageAnalyzer;
