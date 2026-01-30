/*
 * Title: Sketch2Art - AI绘画生成器
 * filepath: /src/App.tsx
 * description: 用户手绘后点击生成，AI将用户的绘画内容为主体，根据不同风格生成艺术作品
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  Eraser, 
  Undo2, 
  Download, 
  Palette, 
  Wand2,
  Trash2,
  RefreshCw,
  PenTool,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { generateArtFromSketch, artStyles, ArtStyle } from './artGenerator';

interface Point {
  x: number;
  y: number;
}

const brushColors = [
  '#1a1a2e', '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#ffffff'
];

const brushSizes = [2, 4, 8, 12, 20, 32];

export default function Sketch2Art() {
  // Canvas refs
  const baseCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [strokes, setStrokes] = useState<{ points: Point[]; color: string; size: number }[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle>('watercolor');
  const [isGenerating, setIsGenerating] = useState(false);
  const [brushSize, setBrushSize] = useState(4);
  const [brushColor, setBrushColor] = useState(brushColors[0]);
  const [hasGeneratedArt, setHasGeneratedArt] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);
  const [showStylePanel, setShowStylePanel] = useState(true);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // Initialize canvases
  useEffect(() => {
    const initCanvases = () => {
      const baseCanvas = baseCanvasRef.current;
      const drawCanvas = drawCanvasRef.current;
      const container = containerRef.current;
      if (!baseCanvas || !drawCanvas || !container) return;
      
      const rect = container.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height, 800);
      setCanvasSize({ width: size, height: size });
      
      const dpr = window.devicePixelRatio || 1;
      
      [baseCanvas, drawCanvas].forEach(canvas => {
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
      });
      
      // Initialize base canvas with white
      const baseCtx = baseCanvas.getContext('2d');
      if (baseCtx) {
        baseCtx.fillStyle = '#ffffff';
        baseCtx.fillRect(0, 0, size, size);
      }
      
      // Setup drawing canvas
      const drawCtx = drawCanvas.getContext('2d');
      if (drawCtx) {
        drawCtx.lineCap = 'round';
        drawCtx.lineJoin = 'round';
        drawCtx.strokeStyle = brushColor;
        drawCtx.lineWidth = brushSize;
      }
    };

    initCanvases();
    
    window.addEventListener('resize', initCanvases);
    return () => window.removeEventListener('resize', initCanvases);
  }, []);

  // Update brush settings
  useEffect(() => {
    const drawCanvas = drawCanvasRef.current;
    const drawCtx = drawCanvas?.getContext('2d');
    if (drawCtx) {
      drawCtx.strokeStyle = brushColor;
      drawCtx.lineWidth = brushSize;
    }
  }, [brushColor, brushSize]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent): Point | null => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return null;
    
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width / (window.devicePixelRatio || 1)),
      y: (clientY - rect.top) * (canvas.height / rect.height / (window.devicePixelRatio || 1))
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const coords = getCoordinates(e);
    if (!coords) return;
    
    setIsDrawing(true);
    setCurrentStroke([coords]);
    
    const drawCtx = drawCanvasRef.current?.getContext('2d');
    if (drawCtx) {
      drawCtx.beginPath();
      drawCtx.moveTo(coords.x, coords.y);
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    
    const coords = getCoordinates(e);
    if (!coords) return;
    
    const drawCanvas = drawCanvasRef.current;
    const drawCtx = drawCanvas?.getContext('2d');
    if (!drawCanvas || !drawCtx) return;
    
    setCurrentStroke(prev => [...prev, coords]);
    
    drawCtx.lineTo(coords.x, coords.y);
    drawCtx.stroke();
  };

  const stopDrawing = useCallback(() => {
    if (isDrawing && currentStroke.length > 0) {
      setStrokes(prev => [...prev, { points: currentStroke, color: brushColor, size: brushSize }]);
    }
    setIsDrawing(false);
    setCurrentStroke([]);
  }, [isDrawing, currentStroke, brushColor, brushSize]);

  // Clear drawing layer
  const clearDrawing = () => {
    const drawCanvas = drawCanvasRef.current;
    const drawCtx = drawCanvas?.getContext('2d');
    if (!drawCanvas || !drawCtx) return;
    
    const dpr = window.devicePixelRatio || 1;
    drawCtx.clearRect(0, 0, drawCanvas.width / dpr, drawCanvas.height / dpr);
    setStrokes([]);
  };

  // Clear everything
  const clearAll = () => {
    const baseCanvas = baseCanvasRef.current;
    const drawCanvas = drawCanvasRef.current;
    if (!baseCanvas || !drawCanvas) return;
    
    const baseCtx = baseCanvas.getContext('2d');
    const drawCtx = drawCanvas.getContext('2d');
    if (!baseCtx || !drawCtx) return;
    
    const dpr = window.devicePixelRatio || 1;
    const width = baseCanvas.width / dpr;
    const height = baseCanvas.height / dpr;
    
    // Reset base canvas to white
    baseCtx.fillStyle = '#ffffff';
    baseCtx.fillRect(0, 0, width, height);
    
    // Clear drawing layer
    drawCtx.clearRect(0, 0, width, height);
    
    setStrokes([]);
    setHasGeneratedArt(false);
    setGenerationCount(0);
  };

  // Undo last stroke
  const undoLastStroke = () => {
    if (strokes.length === 0) return;
    
    const drawCanvas = drawCanvasRef.current;
    const drawCtx = drawCanvas?.getContext('2d');
    if (!drawCanvas || !drawCtx) return;
    
    const dpr = window.devicePixelRatio || 1;
    const width = drawCanvas.width / dpr;
    const height = drawCanvas.height / dpr;
    
    // Clear and redraw all strokes except the last one
    drawCtx.clearRect(0, 0, width, height);
    
    const remainingStrokes = strokes.slice(0, -1);
    remainingStrokes.forEach(stroke => {
      drawCtx.strokeStyle = stroke.color;
      drawCtx.lineWidth = stroke.size;
      drawCtx.beginPath();
      drawCtx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        drawCtx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      drawCtx.stroke();
    });
    
    // Reset to current brush settings
    drawCtx.strokeStyle = brushColor;
    drawCtx.lineWidth = brushSize;
    
    setStrokes(remainingStrokes);
  };

  // Generate art
  const generateArt = async () => {
    const drawCanvas = drawCanvasRef.current;
    if (!drawCanvas || strokes.length === 0) return;
    
    setIsGenerating(true);
    
    try {
      // Generate new art based on current drawing
      const artDataUrl = await generateArtFromSketch(drawCanvas, selectedStyle);
      
      // Load generated art onto base canvas
      const baseCanvas = baseCanvasRef.current;
      if (!baseCanvas) return;
      
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = artDataUrl;
      });
      
      const baseCtx = baseCanvas.getContext('2d');
      if (baseCtx) {
        const dpr = window.devicePixelRatio || 1;
        baseCtx.drawImage(img, 0, 0, baseCanvas.width / dpr, baseCanvas.height / dpr);
      }
      
      // Clear drawing layer after generation
      clearDrawing();
      
      setHasGeneratedArt(true);
      setGenerationCount(prev => prev + 1);
    } catch (error) {
      console.error('Failed to generate art:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Download final art
  const downloadArt = () => {
    const baseCanvas = baseCanvasRef.current;
    const drawCanvas = drawCanvasRef.current;
    if (!baseCanvas || !drawCanvas) return;
    
    // Create a temporary canvas to combine both layers
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = baseCanvas.width;
    tempCanvas.height = baseCanvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    
    // Draw base layer
    tempCtx.drawImage(baseCanvas, 0, 0);
    // Draw drawing layer on top
    tempCtx.drawImage(drawCanvas, 0, 0);
    
    const link = document.createElement('a');
    link.download = `sketch2art-${selectedStyle}-v${generationCount}-${Date.now()}.png`;
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  };

  const currentStyle = artStyles.find(s => s.id === selectedStyle);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Sketch2Art AI
            </h1>
            <p className="text-xs text-white/60">手绘生成艺术 · 以画为主体</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Current Style Badge */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
            <Palette className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-white/80">{currentStyle?.name || '水彩'}</span>
            <span className="text-xs text-white/40">风格</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={undoLastStroke}
              disabled={strokes.length === 0}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all disabled:opacity-30"
              title="撤销"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={clearDrawing}
              disabled={strokes.length === 0}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all disabled:opacity-30"
              title="清除绘画"
            >
              <Eraser className="w-4 h-4" />
            </button>
            <button
              onClick={clearAll}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              title="全部清除"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={downloadArt}
              disabled={!hasGeneratedArt && strokes.length === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 transition-all disabled:opacity-30 shadow-lg shadow-purple-600/20"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">保存作品</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex h-[calc(100vh-80px)] overflow-hidden">
        {/* Canvas Area */}
        <div className="flex-1 flex flex-col p-4 lg:p-6">
          {/* Canvas Container */}
          <div 
            ref={containerRef}
            className="flex-1 flex items-center justify-center"
          >
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
              style={{ 
                width: canvasSize.width || '100%', 
                height: canvasSize.height || '100%',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            >
              {/* Base Layer (Generated Art) */}
              <canvas
                ref={baseCanvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ zIndex: 1 }}
              />
              
              {/* Drawing Layer (User Input) */}
              <canvas
                ref={drawCanvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
                style={{ zIndex: 2, touchAction: 'none' }}
              />
              
              {/* Generation Indicator */}
              {isGenerating && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <RefreshCw className="w-12 h-12 animate-spin text-purple-400" />
                      <div className="absolute inset-0 blur-xl bg-purple-500/50 rounded-full" />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-medium text-lg">AI 正在创作...</p>
                      <p className="text-white/50 text-sm mt-1">应用{currentStyle?.name}风格</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Empty State */}
              {!hasGeneratedArt && strokes.length === 0 && !isGenerating && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                      <PenTool className="w-10 h-10 text-white/30" />
                    </div>
                    <p className="text-white/40 text-lg font-medium">在画布上绘制草图</p>
                    <p className="text-white/20 text-sm mt-2">选择风格后点击生成艺术</p>
                  </div>
                </div>
              )}
              
              {/* Generation Count Badge */}
              <div className="absolute top-4 left-4 z-20">
                <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-xs">
                  <span className="text-white/60">已生成: </span>
                  <span className="text-purple-300 font-mono font-bold">{generationCount}</span>
                  <span className="text-white/40 ml-1">次</span>
                </div>
              </div>

              {/* Toggle Style Panel Button (Mobile) */}
              <button
                onClick={() => setShowStylePanel(!showStylePanel)}
                className="absolute top-4 right-4 z-20 lg:hidden p-2 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10"
              >
                {showStylePanel ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Brush Controls */}
          <div className="mt-4 lg:mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {/* Color Picker */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-xs text-white/60">画笔颜色</span>
                <div className="flex items-center gap-1.5">
                  {brushColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setBrushColor(color)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        brushColor === color 
                          ? 'border-white scale-110 shadow-lg' 
                          : 'border-white/20 hover:scale-105 hover:border-white/50'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Size Selector */}
              <div className="flex items-center gap-3 px-4 py-2.5 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-xs text-white/60">画笔大小</span>
                <div className="flex items-center gap-1">
                  {brushSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setBrushSize(size)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        brushSize === size
                          ? 'bg-purple-500/30 border border-purple-500/50'
                          : 'bg-white/5 hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      <div 
                        className={`rounded-full ${brushSize === size ? 'bg-purple-400' : 'bg-white/60'}`}
                        style={{ width: Math.min(size, 16), height: Math.min(size, 16) }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button - Primary Action */}
            <button
              onClick={generateArt}
              disabled={strokes.length === 0 || isGenerating}
              className="relative overflow-hidden group px-8 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 hover:from-purple-500 hover:via-purple-400 hover:to-cyan-400 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-purple-600/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <div className="relative flex items-center justify-center gap-2">
                <Wand2 className="w-5 h-5" />
                <span className="font-semibold">生成艺术作品</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Panel - Style Selector */}
        <div className={`${showStylePanel ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 fixed lg:relative right-0 top-[80px] lg:top-0 bottom-0 w-80 bg-slate-950/95 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none border-l border-white/10 lg:border-l-0 p-4 lg:p-6 flex flex-col gap-4 transition-transform duration-300 z-30`}>
          {/* Style Categories */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 flex-1 overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-5 h-5 text-purple-400" />
              <h2 className="text-base font-semibold">选择艺术风格</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {['classic', 'modern', 'anime', 'traditional', '3d', 'fantasy', 'minimal'].map((category) => {
                const categoryStyles = artStyles.filter(s => s.category === category);
                if (categoryStyles.length === 0) return null;
                
                return (
                  <div key={category} className="space-y-2">
                    <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider">
                      {category === 'classic' && '经典艺术'}
                      {category === 'modern' && '现代风格'}
                      {category === 'anime' && '动漫风格'}
                      {category === 'traditional' && '传统艺术'}
                      {category === '3d' && '3D效果'}
                      {category === 'fantasy' && '奇幻风格'}
                      {category === 'minimal' && '极简风格'}
                    </h3>
                    <div className="space-y-1.5">
                      {categoryStyles.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setSelectedStyle(style.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left ${
                            selectedStyle === style.id
                              ? 'bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/10'
                              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <span className="text-xl">{style.icon}</span>
                          <div className="flex-1 min-w-0">
                            <span className={`text-sm font-medium block truncate ${
                              selectedStyle === style.id ? 'text-purple-300' : 'text-white/90'
                            }`}>
                              {style.name}
                            </span>
                            <span className="text-xs text-white/50 truncate block">{style.description}</span>
                          </div>
                          {selectedStyle === style.id && (
                            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
            <h3 className="text-sm font-medium text-white/80 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              创作提示
            </h3>
            <ul className="text-xs text-white/50 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>画一个简单的主体轮廓，AI会根据风格完善细节</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>每次生成后可以在结果上继续绘制迭代</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>尝试不同风格会得到截然不同的效果</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>越清晰的草图，生成效果越好</span>
              </li>
            </ul>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl border border-white/10 p-3 text-center">
              <div className="text-2xl font-bold text-purple-400">{artStyles.length}</div>
              <div className="text-xs text-white/50">艺术风格</div>
            </div>
            <div className="bg-white/5 rounded-xl border border-white/10 p-3 text-center">
              <div className="text-2xl font-bold text-cyan-400">{strokes.length}</div>
              <div className="text-xs text-white/50">当前笔划</div>
            </div>
          </div>
        </div>
      </main>

      {/* CSS for custom scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
