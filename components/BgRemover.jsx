"use client";

import React, { useState, useRef } from "react";
import { removeBackground } from "@imgly/background-removal";
import {
  Upload,
  Loader2,
  Download,
  Image as ImageIcon,
  Sparkles,
  Trash2,
} from "lucide-react";

export default function BgRemover() {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
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
    if (file && file.type.startsWith("image/")) processFile(file);
  };

  const processFile = (file) => {
    setProcessedImage(null);
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

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
        
        {/* HEADER */}
        <div className="text-center pt-10 pb-6 px-6 border-b border-white/10">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span className="text-xs font-medium text-purple-100">AI v 2.0</span>
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
                ${
                  isDragging
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
            <div className="grid md:grid-cols-2 gap-8 animate-in fade-in zoom-in duration-500">
              {/* Original Image */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-white/80 px-1">
                  <h3 className="font-medium flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> Original
                  </h3>

                  <button
                    onClick={() => {
                      setOriginalImage(null);
                      setProcessedImage(null);
                    }}
                    className="text-xs flex items-center gap-1 text-red-300 hover:text-red-200 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20"
                  >
                    <Trash2 className="w-3 h-3" /> Reset
                  </button>
                </div>

                <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/20 shadow-inner">
                  <img
                    src={originalImage}
                    alt="Original"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>

              {/* Processed Image */}
              <div className="space-y-4">
                <h3 className="font-medium text-purple-200 flex items-center gap-2 px-1">
                  <Sparkles className="w-4 h-4" /> Processed
                </h3>

                <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-[url('https://media.istockphoto.com/id/1136656153/vector/checker-seamless-pattern-vector-checkered-texture-transparent-grid.jpg?s=612x612')] bg-cover shadow-inner group">
                  {isLoading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader2 className="w-6 h-6 text-purple-400 animate-pulse" />
                        </div>
                      </div>
                      <p className="mt-4 text-sm font-medium text-purple-200 animate-pulse">
                        AI is thinking...
                      </p>
                    </div>
                  ) : processedImage ? (
                    <img
                      src={processedImage}
                      alt="Processed"
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
                    />
                  ) : null}
                </div>

                {/* DOWNLOAD BUTTON */}
                <button
                  onClick={handleDownload}
                  disabled={!processedImage}
                  className={`w-full py-4 px-6 rounded-xl flex items-center justify-center gap-2 font-bold text-lg transition-all duration-300
                    ${
                      processedImage
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_rgba(124,58,237,0.7)] hover:-translate-y-1"
                        : "bg-white/5 text-gray-500 cursor-not-allowed border border-white/5"
                    }`}
                >
                  <Download className="w-5 h-5" />
                  {processedImage
                    ? "Download Transparent Image"
                    : "Waiting for Image..."}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
