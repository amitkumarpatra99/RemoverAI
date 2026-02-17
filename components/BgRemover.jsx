"use client";

import React, { useState, useRef, useEffect } from "react";
import { removeBackground } from "@imgly/background-removal";
import {
  Upload,
  Loader2,
  Download,
  Image as ImageIcon,
  Sparkles,
  Trash2,
  AlertCircle,
  Copy,
  Check,
  Split,
  X,
} from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function BgRemover() {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const [isComparing, setIsComparing] = useState(false);
  const [comparePosition, setComparePosition] = useState(50); // percentage
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  const validateFile = (file) => {
    if (!file.type.startsWith("image/")) {
      return "Please upload a valid image file (PNG, JPG, WEBP).";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size exceeds 10MB limit.";
    }
    return null;
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) handleProcess(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleProcess(file);
  };

  const handleProcess = (file) => {
    setError(null);
    setProcessedImage(null);
    setIsComparing(false); // Reset comparison mode

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    const objectUrl = URL.createObjectURL(file);
    setOriginalImage(objectUrl);

    removeBackground(file)
      .then((blob) => {
        setProcessedImage(URL.createObjectURL(blob));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to process image. Please try again.");
        setIsLoading(false);
      });
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement("a");
      link.href = processedImage;
      link.download = "removed-bg.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopy = async () => {
    if (processedImage) {
      try {
        const response = await fetch(processedImage);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
        setError("Failed to copy image to clipboard.");
      }
    }
  };

  // Slider Logic needed for drag
  const handleSliderDrag = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX || e.touches?.[0]?.clientX;
      const position = ((x - rect.left) / rect.width) * 100;
      setComparePosition(Math.min(100, Math.max(0, position)));
    }
  };

  // Mouse/Touch events for slider
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const activeDrag = (e) => {
      if (isSliding) handleSliderDrag(e);
    };
    const stopDrag = () => setIsSliding(false);

    if (isSliding) {
      window.addEventListener("mousemove", activeDrag);
      window.addEventListener("touchmove", activeDrag);
      window.addEventListener("mouseup", stopDrag);
      window.addEventListener("touchend", stopDrag);
    }

    return () => {
      window.removeEventListener("mousemove", activeDrag);
      window.removeEventListener("touchmove", activeDrag);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchend", stopDrag);
    };
  }, [isSliding]);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4">
      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => setError(null)}
            className="p-1 hover:bg-red-500/20 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
        {/* HEADER */}
        <div className="text-center pt-10 pb-6 px-6 border-b border-white/10">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span className="text-xs font-medium text-purple-100">
              AI v 2.0
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200">
            Background Remover
          </h1>

          <p className="text-blue-200/70 mt-3 text-lg">
            Upload an image to automatically remove the background.
          </p>
        </div>

        {/* BODY */}
        <div className="p-8 md:p-12">
          {/* UPLOAD AREA */}
          {!originalImage && (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`group relative h-80 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 
                ${isDragging
                  ? "border-purple-400 bg-purple-500/10 scale-[1.01] shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                  : "border-white/20 hover:border-white/40 hover:bg-white/5"
                }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                {isDragging ? "Drop it like it's hot!" : "Upload an Image"}
              </h3>

              <p className="text-blue-200/60 text-sm">
                Drag & drop or click to browse (PNG, JPG, WEBP)
              </p>
            </div>
          )}

          {/* RESULT VIEW */}
          {originalImage && (
            <div className="space-y-8 animate-in fade-in zoom-in duration-500">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setOriginalImage(null);
                      setProcessedImage(null);
                      setError(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-200 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Reset
                  </button>
                </div>

                {processedImage && (
                  <div className="flex items-center gap-2">
                    {/* Compare Toggle */}
                    <button
                      onClick={() => setIsComparing(!isComparing)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isComparing
                          ? "bg-purple-500/20 text-purple-200 border border-purple-500/30"
                          : "bg-white/5 text-blue-200 hover:bg-white/10 border border-white/10"
                        }`}
                    >
                      <Split className="w-4 h-4" />
                      {isComparing ? "Exit Compare" : "Compare"}
                    </button>

                    {/* Copy Button */}
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-blue-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-400" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> Copy
                        </>
                      )}
                    </button>

                    {/* Download Button */}
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 transition-all"
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>
                  </div>
                )}
              </div>

              {/* Main Image Area */}
              <div className="relative aspect-video w-full max-h-[600px] bg-black/20 rounded-2xl overflow-hidden border border-white/10 shadow-inner flex items-center justify-center">
                {isLoading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-purple-400 animate-pulse" />
                      </div>
                    </div>
                    <p className="mt-4 text-lg font-medium text-purple-200 animate-pulse">
                      Simas AI is Thinking...
                    </p>
                    <p className="text-sm text-purple-300/60 mt-1">
                      Removing background securely on device
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Image Container */}
                    <div
                      ref={containerRef}
                      className="relative w-full h-full flex items-center justify-center p-4"
                      // Disable touch scrolling when interacting with slider
                      style={{ touchAction: isComparing ? "none" : "auto" }}
                    >
                      {/* Comparison Slider Mode */}
                      {isComparing && processedImage ? (
                        <div className="relative w-full h-full max-w-4xl mx-auto overflow-hidden select-none pointer-events-none">
                          {/* Base Image (Processed - Transparent) */}
                          <div className="absolute inset-0 w-full h-full bg-[url('https://media.istockphoto.com/id/1136656153/vector/checker-seamless-pattern-vector-checkered-texture-transparent-grid.jpg?s=612x612')] bg-cover opacity-50"></div>
                          <img
                            src={processedImage}
                            alt="Processed"
                            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                          />

                          {/* Overlay Image (Original) - Clip Path matches slider position */}
                          <div
                            className="absolute inset-0 w-full h-full overflow-hidden"
                            style={{ clipPath: `inset(0 ${100 - comparePosition}% 0 0)` }}
                          >
                            <img
                              src={originalImage}
                              alt="Original"
                              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                            />
                            <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                              Original
                            </div>
                          </div>

                          {/* Processed Label */}
                          <div className="absolute top-4 right-4 bg-purple-500/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                            Removed Background
                          </div>

                          {/* Slider Handle */}
                          <div
                            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 pointer-events-auto touch-none"
                            style={{ left: `${comparePosition}%` }}
                            onMouseDown={() => setIsSliding(true)}
                            onTouchStart={() => setIsSliding(true)}
                          >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center justify-center">
                              <Split className="w-4 h-4 text-purple-600 rotate-90" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Normal View (Single Image)
                        <div className="relative w-full h-full max-w-4xl mx-auto">
                          <div className={`w-full h-full ${processedImage ? "bg-[url('https://media.istockphoto.com/id/1136656153/vector/checker-seamless-pattern-vector-checkered-texture-transparent-grid.jpg?s=612x612')] bg-cover rounded-lg" : ""}`}>
                            <img
                              src={processedImage || originalImage}
                              alt="Start View"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          {processedImage && (
                            <div className="absolute top-4 right-4 bg-purple-500/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                              Background Removed
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
