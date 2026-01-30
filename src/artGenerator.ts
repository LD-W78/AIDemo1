/*
 * Title: Art Generator - AI艺术生成器
 * filepath: /src/artGenerator.ts
 * description: 根据用户草图生成不同风格的艺术作品，以用户绘画内容为主体
 */

import type { ArtStyle, ArtStyleConfig } from './types';

export { type ArtStyle };

export const artStyles: ArtStyleConfig[] = [
  // 经典艺术
  { id: 'watercolor', name: '水彩', icon: '🎨', description: '柔和透明的水彩晕染效果', category: 'classic' },
  { id: 'oil', name: '油画', icon: '🖼️', description: '厚重质感的油画风格', category: 'classic' },
  { id: 'impressionist', name: '印象派', icon: '🌸', description: '莫奈印象派光影效果', category: 'classic' },
  { id: 'vangogh', name: '梵高', icon: '🌻', description: '梵高星空旋涡笔触', category: 'classic' },
  { id: 'sketch', name: '素描', icon: '✏️', description: '精细铅笔素描线条', category: 'classic' },
  { id: 'pastel', name: '粉彩', icon: '🌈', description: '柔和粉彩蜡笔效果', category: 'classic' },
  
  // 现代风格
  { id: 'pixel', name: '像素艺术', icon: '👾', description: '复古8-bit像素风格', category: 'modern' },
  { id: 'cyberpunk', name: '赛博朋克', icon: '⚡', description: '霓虹灯未来都市风格', category: 'modern' },
  { id: 'neon', name: '霓虹', icon: '🌃', description: '发光霓虹灯效果', category: 'modern' },
  { id: 'abstract', name: '抽象艺术', icon: '🌀', description: '几何抽象构图', category: 'modern' },
  { id: 'cubism', name: '立体派', icon: '🔷', description: '毕加索多视角立体主义', category: 'modern' },
  { id: 'popart', name: '波普艺术', icon: '💥', description: '安迪沃霍尔波普风格', category: 'modern' },
  { id: 'graffiti', name: '涂鸦', icon: '🎭', description: '街头涂鸦艺术', category: 'modern' },
  
  // 动漫风格
  { id: 'miyazaki', name: '宫崎骏', icon: '🏯', description: '吉卜力动画风格', category: 'anime' },
  { id: 'manga', name: '漫画', icon: '💢', description: '日式黑白漫画风格', category: 'anime' },
  { id: 'lineart', name: '线稿', icon: '✒️', description: '精细动漫线稿', category: 'anime' },
  
  // 传统艺术
  { id: 'ink', name: '水墨画', icon: '🎋', description: '中国传统水墨意境', category: 'traditional' },
  { id: 'ukiyoe', name: '浮世绘', icon: '🗻', description: '日本浮世绘风格', category: 'traditional' },
  
  // 3D效果
  { id: '3drender', name: '3D渲染', icon: '🎲', description: '真实3D渲染效果', category: '3d' },
  { id: 'lowpoly', name: '低多边形', icon: '🔺', description: 'Low Poly几何风格', category: '3d' },
  { id: 'origami', name: '折纸', icon: '📄', description: '日式折纸艺术', category: '3d' },
  
  // 奇幻风格
  { id: 'steampunk', name: '蒸汽朋克', icon: '⚙️', description: '维多利亚蒸汽机械风', category: 'fantasy' },
  
  // 极简风格
  { id: 'chalk', name: '黑板粉笔', icon: '🖍️', description: '黑板粉笔手绘效果', category: 'minimal' },
  { id: 'papercut', name: '剪纸', icon: '✂️', description: '中国传统剪纸艺术', category: 'minimal' },
];

// Generate art from sketch based on selected style
export async function generateArtFromSketch(
  canvas: HTMLCanvasElement | null,
  style: ArtStyle
): Promise<string> {
  if (!canvas) {
    throw new Error('Canvas not found');
  }

  // Get the sketch data
  const sketchDataUrl = canvas.toDataURL('image/png');
  
  // Create a new canvas for the generated art with higher resolution
  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = 1024;
  outputCanvas.height = 1024;
  const ctx = outputCanvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  // Load the sketch
  const img = new Image();
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = sketchDataUrl;
  });

  // Fill white background first
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);

  // Apply style-specific transformations
  switch (style) {
    case 'watercolor':
      await applyWatercolorEffect(ctx, img, outputCanvas);
      break;
    case 'oil':
      await applyOilPaintingEffect(ctx, img, outputCanvas);
      break;
    case 'pixel':
      await applyPixelArtEffect(ctx, img, outputCanvas);
      break;
    case 'cyberpunk':
      await applyCyberpunkEffect(ctx, img, outputCanvas);
      break;
    case 'sketch':
      await applySketchEffect(ctx, img, outputCanvas);
      break;
    case 'abstract':
      await applyAbstractEffect(ctx, img, outputCanvas);
      break;
    case 'vangogh':
      await applyVanGoghEffect(ctx, img, outputCanvas);
      break;
    case 'miyazaki':
      await applyMiyazakiEffect(ctx, img, outputCanvas);
      break;
    case 'ink':
      await applyInkEffect(ctx, img, outputCanvas);
      break;
    case 'manga':
      await applyMangaEffect(ctx, img, outputCanvas);
      break;
    case 'neon':
      await applyNeonEffect(ctx, img, outputCanvas);
      break;
    case 'impressionist':
      await applyImpressionistEffect(ctx, img, outputCanvas);
      break;
    case 'cubism':
      await applyCubismEffect(ctx, img, outputCanvas);
      break;
    case 'popart':
      await applyPopArtEffect(ctx, img, outputCanvas);
      break;
    case 'ukiyoe':
      await applyUkiyoeEffect(ctx, img, outputCanvas);
      break;
    case 'steampunk':
      await applySteampunkEffect(ctx, img, outputCanvas);
      break;
    case 'lineart':
      await applyLineArtEffect(ctx, img, outputCanvas);
      break;
    case '3drender':
      await apply3DRenderEffect(ctx, img, outputCanvas);
      break;
    case 'origami':
      await applyOrigamiEffect(ctx, img, outputCanvas);
      break;
    case 'lowpoly':
      await applyLowPolyEffect(ctx, img, outputCanvas);
      break;
    case 'chalk':
      await applyChalkEffect(ctx, img, outputCanvas);
      break;
    case 'pastel':
      await applyPastelEffect(ctx, img, outputCanvas);
      break;
    case 'graffiti':
      await applyGraffitiEffect(ctx, img, outputCanvas);
      break;
    case 'papercut':
      await applyPapercutEffect(ctx, img, outputCanvas);
      break;
    default:
      ctx.drawImage(img, 0, 0, outputCanvas.width, outputCanvas.height);
  }

  return outputCanvas.toDataURL('image/png');
}

// ============================================
// 水彩效果 - 柔和透明的水彩晕染
// ============================================
async function applyWatercolorEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // White textured paper background
  ctx.fillStyle = '#fafafa';
  ctx.fillRect(0, 0, width, height);
  addPaperTexture(ctx, width, height, 0.03);
  
  // Multi-layer watercolor effect
  const layers = [
    { color: { r: 255, g: 107, b: 107, alpha: 0.25 }, blur: 8, offset: 15 },
    { color: { r: 78, g: 205, b: 196, alpha: 0.2 }, blur: 10, offset: -10 },
    { color: { r: 255, g: 230, b: 109, alpha: 0.15 }, blur: 12, offset: 20 },
    { color: { r: 199, g: 125, b: 255, alpha: 0.2 }, blur: 9, offset: -15 },
    { color: { r: 150, g: 206, b: 180, alpha: 0.25 }, blur: 11, offset: 8 },
  ];
  
  layers.forEach((layer) => {
    ctx.save();
    ctx.globalAlpha = layer.color.alpha;
    ctx.globalCompositeOperation = 'multiply';
    ctx.filter = `blur(${layer.blur}px)`;
    
    const offsetX = (Math.random() - 0.5) * layer.offset;
    const offsetY = (Math.random() - 0.5) * layer.offset;
    ctx.drawImage(img, offsetX, offsetY, width, height);
    
    // Color tint
    ctx.fillStyle = `rgba(${layer.color.r}, ${layer.color.g}, ${layer.color.b}, 0.5)`;
    ctx.globalCompositeOperation = 'color';
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  });
  
  // Watercolor splatters
  addWatercolorSplatters(ctx, width, height, 25);
  
  // Final soft blend
  ctx.save();
  ctx.filter = 'blur(1px)';
  ctx.globalAlpha = 0.15;
  ctx.globalCompositeOperation = 'overlay';
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
}

// ============================================
// 油画效果 - 厚重质感的油画
// ============================================
async function applyOilPaintingEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Warm canvas background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f5f0e8');
  gradient.addColorStop(0.5, '#ebe5d9');
  gradient.addColorStop(1, '#f0ebe0');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  addCanvasTexture(ctx, width, height);
  
  // Impasto effect with multiple layers
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.globalAlpha = 0.35 - i * 0.05;
    ctx.filter = `blur(${i * 0.3}px) contrast(1.3) saturate(1.2)`;
    const offsetX = (Math.random() - 0.5) * 8;
    const offsetY = (Math.random() - 0.5) * 8;
    ctx.drawImage(img, offsetX, offsetY, width, height);
    ctx.restore();
  }
  
  // Rich oil colors overlay
  const oilColors = [
    { r: 139, g: 69, b: 19, alpha: 0.12 },
    { r: 218, g: 165, b: 32, alpha: 0.08 },
    { r: 70, g: 130, b: 180, alpha: 0.1 },
    { r: 205, g: 92, b: 92, alpha: 0.08 },
    { r: 100, g: 50, b: 50, alpha: 0.06 },
  ];
  
  oilColors.forEach((color) => {
    ctx.save();
    ctx.globalAlpha = color.alpha;
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  });
  
  // Brush stroke texture
  addBrushStrokeTexture(ctx, width, height, 150);
  
  // Varnish sheen
  ctx.save();
  ctx.globalAlpha = 0.1;
  ctx.globalCompositeOperation = 'overlay';
  const sheenGradient = ctx.createLinearGradient(0, 0, width, height);
  sheenGradient.addColorStop(0, 'rgba(255,255,255,0.3)');
  sheenGradient.addColorStop(0.5, 'rgba(255,255,255,0)');
  sheenGradient.addColorStop(1, 'rgba(255,255,255,0.2)');
  ctx.fillStyle = sheenGradient;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

// ============================================
// 像素艺术效果 - 复古8-bit风格
// ============================================
async function applyPixelArtEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const pixelSize = 12;
  const width = canvas.width;
  const height = canvas.height;
  
  // Dark retro background
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, width, height);
  
  // Draw pixelated version
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) return;
  
  tempCanvas.width = Math.floor(width / pixelSize);
  tempCanvas.height = Math.floor(height / pixelSize);
  tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
  
  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const data = imageData.data;
  
  // Draw enlarged pixels with dithering
  for (let y = 0; y < tempCanvas.height; y++) {
    for (let x = 0; x < tempCanvas.width; x++) {
      const i = (y * tempCanvas.width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const alpha = data[i + 3];
      
      if (alpha > 30) {
        const quantizedColor = quantizePixel(r, g, b);
        
        ctx.fillStyle = quantizedColor;
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize - 1, pixelSize - 1);
        
        // Pixel highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize - 1, 2);
        
        // Pixel shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize - 3, pixelSize - 1, 2);
      }
    }
  }
  
  addScanlines(ctx, width, height, pixelSize);
  addCRTEffect(ctx, width, height);
}

// ============================================
// 赛博朋克效果 - 霓虹未来都市
// ============================================
async function applyCyberpunkEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Futuristic dark background
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#0a0a12');
  gradient.addColorStop(0.5, '#0d0d1a');
  gradient.addColorStop(1, '#0a0a0f');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Draw sketch with high contrast
  ctx.save();
  ctx.filter = 'contrast(2.5) brightness(0.7) saturate(2)';
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
  
  // Multiple neon glow layers
  const neonColors = [
    { color: '#00ffff', offset: -8, blur: 60, alpha: 0.4 },
    { color: '#ff00ff', offset: 8, blur: 50, alpha: 0.35 },
    { color: '#00ff00', offset: -4, blur: 40, alpha: 0.25 },
    { color: '#ffff00', offset: 4, blur: 35, alpha: 0.2 },
  ];
  
  neonColors.forEach((neon) => {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.shadowColor = neon.color;
    ctx.shadowBlur = neon.blur;
    ctx.globalAlpha = neon.alpha;
    ctx.drawImage(img, neon.offset, neon.offset, width, height);
    ctx.restore();
  });
  
  // Cyberpunk grid
  addCyberpunkGrid(ctx, width, height);
  addChromaticAberration(ctx, img, width, height, 5);
  
  // Rain effect
  addRainEffect(ctx, width, height);
}

// ============================================
// 素描效果 - 精细铅笔线条
// ============================================
async function applySketchEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Paper background
  ctx.fillStyle = '#f5f5f0';
  ctx.fillRect(0, 0, width, height);
  addPaperTexture(ctx, width, height, 0.025);
  
  // Crosshatching layers
  for (let angle = 0; angle < 180; angle += 30) {
    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.translate(width / 2, height / 2);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.translate(-width / 2, -height / 2);
    ctx.filter = 'contrast(1.8) grayscale(1) brightness(1.1)';
    ctx.drawImage(img, 0, 0, width, height);
    ctx.restore();
  }
  
  // Main sketch layer
  ctx.save();
  ctx.globalAlpha = 0.75;
  ctx.filter = 'contrast(2.2) grayscale(1) brightness(1.15)';
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
  
  // Pencil smudge effect
  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.filter = 'blur(3px)';
  ctx.drawImage(img, 3, 3, width, height);
  ctx.restore();
  
  addVignette(ctx, width, height, 0.15);
}

// ============================================
// 抽象艺术效果 - 几何形状与大胆色彩
// ============================================
async function applyAbstractEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Bold black background
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, width, height);
  
  // Sample image at low resolution
  const sampleSize = 32;
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) return;
  
  tempCanvas.width = sampleSize;
  tempCanvas.height = sampleSize;
  tempCtx.drawImage(img, 0, 0, sampleSize, sampleSize);
  const imageData = tempCtx.getImageData(0, 0, sampleSize, sampleSize);
  const data = imageData.data;
  
  // Generate shapes based on image
  const shapes: { x: number; y: number; size: number; color: string; type: 'circle' | 'rect' | 'triangle' }[] = [];
  
  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha > 50 && Math.random() > 0.6) {
      const pixelIndex = i / 4;
      const x = ((pixelIndex % sampleSize) / sampleSize) * width;
      const y = (Math.floor(pixelIndex / sampleSize) / sampleSize) * height;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      shapes.push({
        x: x + (Math.random() - 0.5) * 50,
        y: y + (Math.random() - 0.5) * 50,
        size: Math.random() * 100 + 30,
        color: `rgb(${r}, ${g}, ${b})`,
        type: ['circle', 'rect', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'rect' | 'triangle'
      });
    }
  }
  
  // Draw shapes with blend modes
  shapes.forEach((shape) => {
    ctx.save();
    ctx.globalAlpha = 0.6;
    ctx.globalCompositeOperation = Math.random() > 0.5 ? 'screen' : 'overlay';
    
    if (shape.type === 'circle') {
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
      ctx.fillStyle = shape.color;
      ctx.fill();
    } else if (shape.type === 'rect') {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(Math.random() * Math.PI);
      ctx.fillStyle = shape.color;
      ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
      ctx.restore();
    } else {
      ctx.beginPath();
      ctx.moveTo(shape.x, shape.y - shape.size / 2);
      ctx.lineTo(shape.x + shape.size / 2, shape.y + shape.size / 2);
      ctx.lineTo(shape.x - shape.size / 2, shape.y + shape.size / 2);
      ctx.closePath();
      ctx.fillStyle = shape.color;
      ctx.fill();
    }
    ctx.restore();
  });
  
  // Connecting lines
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  for (let i = 0; i < shapes.length; i++) {
    for (let j = i + 1; j < shapes.length; j++) {
      const dist = Math.hypot(shapes[i].x - shapes[j].x, shapes[i].y - shapes[j].y);
      if (dist < 250) {
        ctx.globalAlpha = 0.4 * (1 - dist / 250);
        ctx.beginPath();
        ctx.moveTo(shapes[i].x, shapes[i].y);
        ctx.lineTo(shapes[j].x, shapes[j].y);
        ctx.stroke();
      }
    }
  }
  ctx.restore();
}

// ============================================
// 梵高效果 - 星空旋涡笔触
// ============================================
async function applyVanGoghEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Starry night inspired background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1a237e');
  gradient.addColorStop(0.3, '#283593');
  gradient.addColorStop(0.6, '#3949ab');
  gradient.addColorStop(1, '#1a237e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add stars
  addStars(ctx, width, height, 150);
  
  // Draw sketch with swirling effect
  ctx.save();
  ctx.globalAlpha = 0.7;
  ctx.filter = 'saturate(1.8) contrast(1.3)';
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
  
  // Swirling brush strokes overlay
  addSwirlingStrokes(ctx, width, height, img);
  
  // Van Gogh color palette overlay
  const vgColors = [
    { r: 255, g: 215, b: 0, alpha: 0.15 },    // Gold
    { r: 0, g: 150, b: 136, alpha: 0.12 },    // Teal
    { r: 63, g: 81, b: 181, alpha: 0.1 },     // Indigo
  ];
  
  vgColors.forEach((color) => {
    ctx.save();
    ctx.globalAlpha = color.alpha;
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  });
}

// ============================================
// 宫崎骏效果 - 吉卜力动画风格
// ============================================
async function applyMiyazakiEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Soft nature-inspired background
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#e8f5e9');
  gradient.addColorStop(0.5, '#c8e6c9');
  gradient.addColorStop(1, '#a5d6a7');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Soft clouds
  addClouds(ctx, width, height, 8);
  
  // Draw sketch with soft anime style
  ctx.save();
  ctx.filter = 'saturate(1.3) contrast(0.9) brightness(1.1)';
  ctx.globalAlpha = 0.8;
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
  
  // Soft watercolor overlay
  const miyazakiColors = [
    { r: 144, g: 202, b: 249, alpha: 0.15 },  // Sky blue
    { r: 255, g: 245, b: 157, alpha: 0.12 },  // Soft yellow
    { r: 200, g: 230, b: 201, alpha: 0.18 },  // Soft green
  ];
  
  miyazakiColors.forEach((color, index) => {
    ctx.save();
    ctx.globalAlpha = color.alpha;
    ctx.globalCompositeOperation = 'overlay';
    ctx.filter = `blur(${20 + index * 10}px)`;
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  });
}

// ============================================
// 水墨画效果 - 中国传统水墨
// ============================================
async function applyInkEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Rice paper background
  ctx.fillStyle = '#f9f6f0';
  ctx.fillRect(0, 0, width, height);
  addPaperTexture(ctx, width, height, 0.02);
  
  // Draw with ink wash effect
  ctx.save();
  ctx.filter = 'grayscale(1) contrast(1.5) brightness(1.2)';
  ctx.globalAlpha = 0.9;
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
  
  // Multiple ink layers
  const inkLayers = [
    { alpha: 0.3, blur: 15, offset: 20 },
    { alpha: 0.2, blur: 25, offset: -15 },
    { alpha: 0.15, blur: 35, offset: 30 },
  ];
  
  inkLayers.forEach((layer) => {
    ctx.save();
    ctx.globalAlpha = layer.alpha;
    ctx.globalCompositeOperation = 'multiply';
    ctx.filter = `blur(${layer.blur}px)`;
    const offsetX = (Math.random() - 0.5) * layer.offset;
    const offsetY = (Math.random() - 0.5) * layer.offset;
    ctx.drawImage(img, offsetX, offsetY, width, height);
    ctx.restore();
  });
  
  // Ink bleeding effect
  addInkBleeding(ctx, width, height);
  
  // Red seal stamp
  addSealStamp(ctx, width - 100, height - 100, 60);
}

// ============================================
// 漫画效果 - 日式黑白漫画
// ============================================
async function applyMangaEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // White manga paper
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  
  // Screen tone background
  addScreenTone(ctx, width, height, 8);
  
  // Main drawing with high contrast
  ctx.save();
  ctx.filter = 'contrast(3) grayscale(1) brightness(1.1)';
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
  
  // Speed lines effect
  addSpeedLines(ctx, width, height);
  
  // Ink outlines enhancement
  ctx.save();
  ctx.globalCompositeOperation = 'multiply';
  ctx.filter = 'contrast(4) brightness(0.9)';
  ctx.globalAlpha = 0.6;
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
}

// ============================================
// 霓虹效果 - 发光霓虹灯
// ============================================
async function applyNeonEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Dark night background
  ctx.fillStyle = '#050508';
  ctx.fillRect(0, 0, width, height);
  
  // Multiple neon color passes
  const neonColors = ['#ff006e', '#00f5ff', '#ffea00', '#00ff88', '#ff00ff'];
  
  neonColors.forEach((color, index) => {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.shadowColor = color;
    ctx.shadowBlur = 40;
    ctx.globalAlpha = 0.35;
    ctx.filter = `hue-rotate(${index * 72}deg) saturate(3) contrast(1.5)`;
    const offset = (index - 2) * 5;
    ctx.drawImage(img, offset, offset, width, height);
    ctx.restore();
  });
  
  // Glow enhancement
  ctx.save();
  ctx.globalCompositeOperation = 'overlay';
  ctx.filter = 'blur(20px) brightness(1.5)';
  ctx.globalAlpha = 0.4;
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
}

// ============================================
// 印象派效果 - 莫奈风格
// ============================================
async function applyImpressionistEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Light canvas
  ctx.fillStyle = '#f8f6f3';
  ctx.fillRect(0, 0, width, height);
  addCanvasTexture(ctx, width, height);
  
  // Dabbed brush stroke effect
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.filter = `blur(${2 + i}px) saturate(1.5)`;
    const offset = (Math.random() - 0.5) * 10;
    ctx.drawImage(img, offset, offset, width, height);
    ctx.restore();
  }
  
  // Color patches
  const colors = [
    { r: 255, g: 200, b: 150, alpha: 0.1 },
    { r: 150, g: 220, b: 255, alpha: 0.08 },
    { r: 200, g: 255, b: 200, alpha: 0.1 },
    { r: 255, g: 180, b: 200, alpha: 0.08 },
  ];
  
  colors.forEach((color) => {
    ctx.save();
    ctx.globalAlpha = color.alpha;
    ctx.globalCompositeOperation = 'overlay';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 100 + 50;
      ctx.filter = 'blur(30px)';
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });
}

// ============================================
// 立体派效果 - 毕加索风格
// ============================================
async function applyCubismEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Earth tone background
  ctx.fillStyle = '#d4c4b0';
  ctx.fillRect(0, 0, width, height);
  
  // Draw original image
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.filter = 'saturate(0.8)';
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
  
  // Fragment into geometric shapes
  const fragments = 40;
  for (let i = 0; i < fragments; i++) {
    ctx.save();
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 150 + 50;
    const rotation = Math.random() * Math.PI;
    
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = 0.4;
    
    // Clip to geometric shape
    ctx.beginPath();
    if (i % 3 === 0) {
      // Triangle
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.lineTo(-size / 2, size / 2);
    } else if (i % 3 === 1) {
      // Rectangle
      ctx.rect(-size / 2, -size / 2, size, size);
    } else {
      // Circle
      ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
    }
    ctx.closePath();
    ctx.clip();
    
    ctx.drawImage(img, -x, -y, width, height);
    ctx.restore();
  }
  
  // Add lines between fragments
  ctx.save();
  ctx.strokeStyle = 'rgba(60, 40, 20, 0.3)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 30; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * width, Math.random() * height);
    ctx.lineTo(Math.random() * width, Math.random() * height);
    ctx.stroke();
  }
  ctx.restore();
}

// ============================================
// 波普艺术效果 - 安迪沃霍尔风格
// ============================================
async function applyPopArtEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Bright background
  ctx.fillStyle = '#ffeb3b';
  ctx.fillRect(0, 0, width, height);
  
  // Comic book dots pattern
  addBenDayDots(ctx, width, height, 6);
  
  // Four panels with different color schemes
  const panels = [
    { x: 0, y: 0, hue: 0 },
    { x: width / 2, y: 0, hue: 90 },
    { x: 0, y: height / 2, hue: 180 },
    { x: width / 2, y: height / 2, hue: 270 },
  ];
  
  panels.forEach((panel) => {
    ctx.save();
    ctx.beginPath();
    ctx.rect(panel.x, panel.y, width / 2, height / 2);
    ctx.clip();
    ctx.filter = `hue-rotate(${panel.hue}deg) saturate(2.5) contrast(1.8)`;
    ctx.drawImage(img, panel.x - (panel.x > 0 ? width / 2 : 0), panel.y - (panel.y > 0 ? height / 2 : 0), width / 2, height / 2);
    ctx.restore();
  });
  
  // Bold black outlines
  ctx.save();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();
  ctx.restore();
}

// ============================================
// 浮世绘效果 - 日本传统版画
// ============================================
async function applyUkiyoeEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Washi paper background
  ctx.fillStyle = '#f5f0e6';
  ctx.fillRect(0, 0, width, height);
  addPaperTexture(ctx, width, height, 0.03);
  
  // Bold outlines style
  ctx.save();
  ctx.filter = 'contrast(1.6) saturate(1.4)';
  ctx.globalAlpha = 0.85;
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
  
  // Flat color areas
  const ukiyoeColors = [
    { r: 200, g: 50, b: 50, alpha: 0.2 },   // Red
    { r: 50, g: 100, b: 150, alpha: 0.15 }, // Blue
    { r: 200, g: 180, b: 100, alpha: 0.18 }, // Yellow
    { r: 100, g: 150, b: 100, alpha: 0.15 }, // Green
  ];
  
  ukiyoeColors.forEach((color) => {
    ctx.save();
    ctx.globalAlpha = color.alpha;
    ctx.globalCompositeOperation = 'multiply';
    ctx.filter = 'blur(40px)';
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  });
  
  // Wood grain texture
  addWoodGrain(ctx, width, height);
}

// ============================================
// 蒸汽朋克效果 - 维多利亚机械风
// ============================================
async function applySteampunkEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Brass and copper tones
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#3d2914');
  gradient.addColorStop(0.5, '#5c3d1e');
  gradient.addColorStop(1, '#3d2914');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Gears pattern overlay
  addGearsPattern(ctx, width, height);
  
  // Draw sketch with sepia tone
  ctx.save();
  ctx.filter = 'sepia(0.8) contrast(1.3) saturate(0.6)';
  ctx.globalAlpha = 0.8;
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
  
  // Copper highlights
  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.globalCompositeOperation = 'overlay';
  const copperGradient = ctx.createLinearGradient(0, 0, width, height);
  copperGradient.addColorStop(0, 'rgba(255, 140, 0, 0.5)');
  copperGradient.addColorStop(0.5, 'rgba(184, 115, 51, 0.3)');
  copperGradient.addColorStop(1, 'rgba(255, 140, 0, 0.5)');
  ctx.fillStyle = copperGradient;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

// ============================================
// 线稿效果 - 精细动漫线稿
// ============================================
async function applyLineArtEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Clean white background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  
  // Edge detection effect
  ctx.save();
  ctx.filter = 'contrast(3) grayscale(1)';
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
  
  // Enhance lines
  ctx.save();
  ctx.globalCompositeOperation = 'multiply';
  ctx.filter = 'brightness(0) contrast(5)';
  ctx.globalAlpha = 0.7;
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
  
  // Clean line overlay
  ctx.save();
  ctx.strokeStyle = '#1a1a2e';
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.9;
  ctx.filter = 'contrast(4) brightness(0.8)';
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
}

// ============================================
// 3D渲染效果 - 真实3D质感
// ============================================
async function apply3DRenderEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Studio background
  const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
  gradient.addColorStop(0, '#e0e0e0');
  gradient.addColorStop(0.7, '#c0c0c0');
  gradient.addColorStop(1, '#a0a0a0');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Draw with 3D lighting effect
  ctx.save();
  ctx.filter = 'contrast(1.2) saturate(1.1)';
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
  
  // Add specular highlights
  ctx.save();
  ctx.globalAlpha = 0.3;
  ctx.globalCompositeOperation = 'overlay';
  const highlightGradient = ctx.createRadialGradient(width * 0.3, height * 0.3, 0, width * 0.3, height * 0.3, width * 0.5);
  highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
  highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = highlightGradient;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
  
  // Shadow
  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.filter = 'blur(30px)';
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.ellipse(width / 2, height * 0.85, width * 0.3, height * 0.1, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// ============================================
// 折纸效果 - 日式折纸艺术
// ============================================
async function applyOrigamiEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Paper texture background
  ctx.fillStyle = '#f5f5f0';
  ctx.fillRect(0, 0, width, height);
  addPaperTexture(ctx, width, height, 0.02);
  
  // Draw image
  ctx.save();
  ctx.filter = 'contrast(1.1) saturate(0.9)';
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
  
  // Add fold lines
  const folds = 12;
  for (let i = 0; i < folds; i++) {
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (i % 2 === 0) {
      const y = (height / folds) * i;
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    } else {
      const x = (width / folds) * i;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    ctx.stroke();
    ctx.restore();
  }
  
  // Paper shadow effects at folds
  ctx.save();
  ctx.globalAlpha = 0.1;
  for (let i = 1; i < folds; i++) {
    const gradient = ctx.createLinearGradient(0, (height / folds) * i, 0, (height / folds) * i + 20);
    gradient.addColorStop(0, 'rgba(0,0,0,0.3)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, (height / folds) * i, width, 20);
  }
  ctx.restore();
}

// ============================================
// 低多边形效果 - Low Poly风格
// ============================================
async function applyLowPolyEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Dark background
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, width, height);
  
  // Sample colors from image
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) return;
  
  tempCanvas.width = 16;
  tempCanvas.height = 16;
  tempCtx.drawImage(img, 0, 0, 16, 16);
  const imageData = tempCtx.getImageData(0, 0, 16, 16);
  
  // Create triangle mesh
  const triangles = 80;
  for (let i = 0; i < triangles; i++) {
    const x1 = Math.random() * width;
    const y1 = Math.random() * height;
    const x2 = x1 + (Math.random() - 0.5) * 150;
    const y2 = y1 + (Math.random() - 0.5) * 150;
    const x3 = x1 + (Math.random() - 0.5) * 150;
    const y3 = y1 + (Math.random() - 0.5) * 150;
    
    // Sample color from position
    const sampleX = Math.floor((x1 / width) * 16);
    const sampleY = Math.floor((y1 / height) * 16);
    const idx = (sampleY * 16 + sampleX) * 4;
    const r = imageData.data[idx] || 100;
    const g = imageData.data[idx + 1] || 100;
    const b = imageData.data[idx + 2] || 100;
    
    ctx.save();
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

// ============================================
// 黑板粉笔效果
// ============================================
async function applyChalkEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Blackboard background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1a237e');
  gradient.addColorStop(0.5, '#0d47a1');
  gradient.addColorStop(1, '#1a237e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Chalk dust texture
  addChalkTexture(ctx, width, height);
  
  // Draw with chalk effect
  const chalkColors = ['#ffffff', '#ffeb3b', '#ff9800', '#4caf50', '#2196f3'];
  
  chalkColors.forEach((_color, index) => {
    ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.filter = 'blur(1px) contrast(1.2)';
    ctx.globalCompositeOperation = 'screen';
    const offset = (index - 2) * 3;
    ctx.drawImage(img, offset, offset, width, height);
    ctx.restore();
  });
  
  // Chalk smudges
  ctx.save();
  ctx.globalAlpha = 0.1;
  ctx.filter = 'blur(10px)';
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 50 + 20, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// ============================================
// 粉彩效果 - 柔和蜡笔
// ============================================
async function applyPastelEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Soft paper
  ctx.fillStyle = '#fff9f0';
  ctx.fillRect(0, 0, width, height);
  addPaperTexture(ctx, width, height, 0.03);
  
  // Pastel color layers
  const pastelColors = [
    { r: 255, g: 182, b: 193, alpha: 0.25 },
    { r: 173, g: 216, b: 230, alpha: 0.2 },
    { r: 255, g: 255, b: 224, alpha: 0.25 },
    { r: 221, g: 160, b: 221, alpha: 0.2 },
    { r: 152, g: 251, b: 152, alpha: 0.2 },
  ];
  
  pastelColors.forEach((color) => {
    ctx.save();
    ctx.globalAlpha = color.alpha;
    ctx.filter = 'blur(8px)';
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  });
  
  // Main drawing
  ctx.save();
  ctx.filter = 'saturate(1.3) contrast(0.9) brightness(1.05)';
  ctx.globalAlpha = 0.85;
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
}

// ============================================
// 涂鸦效果 - 街头艺术
// ============================================
async function applyGraffitiEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Brick wall background
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(0, 0, width, height);
  addBrickTexture(ctx, width, height);
  
  // Spray paint layers
  const sprayColors = ['#ff006e', '#00f5ff', '#ffea00', '#8338ec', '#06ffa5'];
  
  sprayColors.forEach(() => {
    ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.globalCompositeOperation = 'screen';
    ctx.filter = 'blur(3px) contrast(1.4)';
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    ctx.drawImage(img, offsetX, offsetY, width, height);
    ctx.restore();
  });
  
  // Drips effect
  addPaintDrips(ctx, width, height);
}

// ============================================
// 剪纸效果 - 中国传统剪纸
// ============================================
async function applyPapercutEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const width = canvas.width;
  const height = canvas.height;
  
  // Red paper background
  ctx.fillStyle = '#b71c1c';
  ctx.fillRect(0, 0, width, height);
  
  // Paper texture
  addPaperTexture(ctx, width, height, 0.04);
  
  // Cut-out effect - white silhouette
  ctx.save();
  ctx.filter = 'contrast(3) brightness(1.5) grayscale(1)';
  ctx.globalCompositeOperation = 'destination-out';
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
  
  // Re-draw with red on top
  ctx.save();
  ctx.globalAlpha = 0.9;
  ctx.filter = 'contrast(2) saturate(1.5)';
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
  
  // Intricate patterns
  addPaperPatterns(ctx, width, height);
}

// ============================================
// 辅助函数
// ============================================

function addPaperTexture(ctx: CanvasRenderingContext2D, width: number, height: number, intensity: number) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * intensity * 255;
    data[i] = Math.max(0, Math.min(255, data[i] + noise));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
  }
  
  ctx.putImageData(imageData, 0, 0);
}

function addCanvasTexture(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.globalAlpha = 0.04;
  
  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 2;
    ctx.fillStyle = Math.random() > 0.5 ? '#000' : '#fff';
    ctx.fillRect(x, y, size, size);
  }
  
  ctx.restore();
}

function addWatercolorSplatters(ctx: CanvasRenderingContext2D, width: number, height: number, count: number) {
  const colors = [
    'rgba(255, 107, 107, 0.2)',
    'rgba(78, 205, 196, 0.2)',
    'rgba(255, 230, 109, 0.15)',
    'rgba(199, 125, 255, 0.2)',
    'rgba(150, 206, 180, 0.25)'
  ];
  
  for (let i = 0; i < count; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 60 + 20;
    
    ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.filter = 'blur(25px)';
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function addBrushStrokeTexture(ctx: CanvasRenderingContext2D, width: number, height: number, count: number) {
  ctx.save();
  ctx.globalAlpha = 0.03;
  
  for (let i = 0; i < count; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const length = Math.random() * 120 + 40;
    const angle = Math.random() * Math.PI * 2;
    
    ctx.strokeStyle = '#000';
    ctx.lineWidth = Math.random() * 4 + 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    ctx.stroke();
  }
  
  ctx.restore();
}

function quantizePixel(r: number, g: number, b: number): string {
  const palette = [
    { r: 24, g: 24, b: 46 },
    { r: 205, g: 92, b: 92 },
    { r: 255, g: 183, b: 77 },
    { r: 255, g: 241, b: 118 },
    { r: 129, g: 199, b: 132 },
    { r: 79, g: 195, b: 247 },
    { r: 206, g: 147, b: 216 },
    { r: 255, g: 255, b: 255 },
  ];
  
  let closest = palette[0];
  let minDist = Infinity;
  
  palette.forEach(color => {
    const dist = Math.hypot(r - color.r, g - color.g, b - color.b);
    if (dist < minDist) {
      minDist = dist;
      closest = color;
    }
  });
  
  return `rgb(${closest.r}, ${closest.g}, ${closest.b})`;
}

function addScanlines(ctx: CanvasRenderingContext2D, width: number, height: number, pixelSize: number) {
  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = '#000';
  
  for (let y = 0; y < height; y += pixelSize) {
    ctx.fillRect(0, y, width, 1);
  }
  
  ctx.restore();
}

function addCRTEffect(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = ctx.createRadialGradient(
    width / 2, height / 2, 0,
    width / 2, height / 2, width * 0.7
  );
  
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.25)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function addCyberpunkGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = 'rgba(0, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  
  const gridSize = 60;
  
  for (let x = 0; x <= width; x += gridSize) {
    ctx.globalAlpha = 0.25 * (1 - Math.abs(x - width / 2) / (width / 2));
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  
  for (let y = 0; y <= height; y += gridSize) {
    ctx.globalAlpha = 0.15;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  
  ctx.restore();
}

function addChromaticAberration(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
  offset: number
) {
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  ctx.globalAlpha = 0.25;
  
  // Red channel
  ctx.filter = 'url(#red-channel)';
  ctx.drawImage(img, -offset, 0, width, height);
  
  // Blue channel
  ctx.filter = 'url(#blue-channel)';
  ctx.drawImage(img, offset, 0, width, height);
  
  ctx.restore();
}

function addVignette(ctx: CanvasRenderingContext2D, width: number, height: number, intensity: number) {
  const gradient = ctx.createRadialGradient(
    width / 2, height / 2, width * 0.4,
    width / 2, height / 2, width * 0.85
  );
  
  gradient.addColorStop(0, `rgba(0, 0, 0, 0)`);
  gradient.addColorStop(1, `rgba(0, 0, 0, ${intensity})`);
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function addRainEffect(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = 'rgba(0, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  
  for (let i = 0; i < 150; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const length = Math.random() * 30 + 10;
    
    ctx.globalAlpha = Math.random() * 0.4 + 0.1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 2, y + length);
    ctx.stroke();
  }
  
  ctx.restore();
}

function addStars(ctx: CanvasRenderingContext2D, width: number, height: number, count: number) {
  for (let i = 0; i < count; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height * 0.7;
    const size = Math.random() * 3 + 1;
    const brightness = Math.random();
    
    ctx.save();
    ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = size * 2;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function addSwirlingStrokes(ctx: CanvasRenderingContext2D, width: number, height: number, _img: HTMLImageElement) {
  // Create swirling brush stroke patterns
  for (let i = 0; i < 50; i++) {
    ctx.save();
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 100 + 50;
    const rotation = Math.random() * Math.PI * 2;
    
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = 0.15;
    
    // Swirling stroke
    ctx.beginPath();
    ctx.strokeStyle = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
    ctx.lineWidth = Math.random() * 8 + 2;
    for (let t = 0; t < Math.PI * 2; t += 0.1) {
      const r = radius * (1 + Math.sin(t * 3) * 0.3);
      const sx = Math.cos(t) * r;
      const sy = Math.sin(t) * r * 0.5;
      if (t === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    ctx.restore();
  }
}

function addClouds(ctx: CanvasRenderingContext2D, width: number, height: number, count: number) {
  for (let i = 0; i < count; i++) {
    ctx.save();
    const x = Math.random() * width;
    const y = Math.random() * height * 0.5;
    const size = Math.random() * 150 + 80;
    
    ctx.globalAlpha = 0.3;
    ctx.filter = 'blur(30px)';
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.arc(x + size * 0.5, y, size * 0.8, 0, Math.PI * 2);
    ctx.arc(x - size * 0.3, y + size * 0.2, size * 0.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function addInkBleeding(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.globalAlpha = 0.15;
  ctx.filter = 'blur(20px)';
  
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 80 + 30;
    
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.restore();
}

function addSealStamp(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save();
  ctx.fillStyle = '#b71c1c';
  ctx.strokeStyle = '#b71c1c';
  ctx.lineWidth = 3;
  
  // Outer square
  ctx.strokeRect(x - size / 2, y - size / 2, size, size);
  
  // Inner decoration
  ctx.fillRect(x - size / 3, y - size / 3, size / 1.5, size / 1.5);
  
  // Center character (simulated)
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${size / 2}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('印', x, y);
  
  ctx.restore();
}

function addScreenTone(ctx: CanvasRenderingContext2D, width: number, height: number, density: number) {
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  
  for (let y = 0; y < height; y += density) {
    for (let x = 0; x < width; x += density) {
      if ((x / density + y / density) % 2 === 0) {
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
  
  ctx.restore();
}

function addSpeedLines(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.lineWidth = 2;
  
  const centerX = width / 2;
  const centerY = height / 2;
  
  for (let i = 0; i < 40; i++) {
    const angle = Math.random() * Math.PI * 2;
    const startRadius = Math.random() * 100 + 50;
    const endRadius = Math.max(width, height);
    
    ctx.globalAlpha = Math.random() * 0.3 + 0.1;
    ctx.beginPath();
    ctx.moveTo(centerX + Math.cos(angle) * startRadius, centerY + Math.sin(angle) * startRadius);
    ctx.lineTo(centerX + Math.cos(angle) * endRadius, centerY + Math.sin(angle) * endRadius);
    ctx.stroke();
  }
  
  ctx.restore();
}

function addBenDayDots(ctx: CanvasRenderingContext2D, width: number, height: number, size: number) {
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  
  for (let y = size; y < height; y += size * 2) {
    for (let x = size; x < width; x += size * 2) {
      ctx.beginPath();
      ctx.arc(x, y, size / 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  ctx.restore();
}

function addWoodGrain(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = 'rgba(100, 70, 40, 0.08)';
  ctx.lineWidth = 2;
  
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * width;
    ctx.globalAlpha = Math.random() * 0.2 + 0.1;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    
    // Wavy line
    for (let y = 0; y < height; y += 20) {
      ctx.lineTo(x + Math.sin(y * 0.02) * 30 + Math.random() * 10, y);
    }
    
    ctx.stroke();
  }
  
  ctx.restore();
}

function addGearsPattern(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.globalAlpha = 0.1;
  ctx.strokeStyle = 'rgba(255, 200, 100, 0.3)';
  ctx.lineWidth = 2;
  
  for (let i = 0; i < 8; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 80 + 40;
    const teeth = 12;
    
    ctx.beginPath();
    for (let t = 0; t < teeth * 2; t++) {
      const angle = (t / (teeth * 2)) * Math.PI * 2;
      const r = t % 2 === 0 ? radius : radius * 0.8;
      const gx = x + Math.cos(angle) * r;
      const gy = y + Math.sin(angle) * r;
      if (t === 0) ctx.moveTo(gx, gy);
      else ctx.lineTo(gx, gy);
    }
    ctx.closePath();
    ctx.stroke();
  }
  
  ctx.restore();
}

function addChalkTexture(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.globalAlpha = 0.1;
  
  for (let i = 0; i < 5000; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillRect(x, y, 1, 1);
  }
  
  ctx.restore();
}

function addBrickTexture(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.lineWidth = 2;
  
  const brickWidth = 80;
  const brickHeight = 40;
  
  for (let y = 0; y < height; y += brickHeight) {
    const offset = (y / brickHeight) % 2 === 0 ? 0 : brickWidth / 2;
    for (let x = -brickWidth; x < width; x += brickWidth) {
      ctx.strokeRect(x + offset, y, brickWidth - 2, brickHeight - 2);
    }
  }
  
  ctx.restore();
}

function addPaintDrips(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const colors = ['#ff006e', '#00f5ff', '#ffea00'];
  
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * width;
    const startY = Math.random() * height * 0.5;
    const dripLength = Math.random() * 100 + 30;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.random() * 6 + 2;
    ctx.lineCap = 'round';
    ctx.globalAlpha = 0.4;
    
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x, startY + dripLength);
    ctx.stroke();
    
    // Drip blob at end
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, startY + dripLength, ctx.lineWidth, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
}

function addPaperPatterns(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1;
  
  // Decorative border
  const borderWidth = 40;
  ctx.strokeRect(borderWidth, borderWidth, width - borderWidth * 2, height - borderWidth * 2);
  
  // Corner decorations
  const cornerSize = 60;
  [
    { x: borderWidth, y: borderWidth },
    { x: width - borderWidth - cornerSize, y: borderWidth },
    { x: borderWidth, y: height - borderWidth - cornerSize },
    { x: width - borderWidth - cornerSize, y: height - borderWidth - cornerSize }
  ].forEach((corner) => {
    ctx.beginPath();
    ctx.moveTo(corner.x, corner.y + cornerSize / 2);
    ctx.lineTo(corner.x + cornerSize / 2, corner.y);
    ctx.stroke();
  });
  
  ctx.restore();
}
