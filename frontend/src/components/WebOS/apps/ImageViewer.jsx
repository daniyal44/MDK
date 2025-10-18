import React, { useState } from 'react';
import { Image as ImageIcon, ZoomIn, ZoomOut, RotateCw, Download } from 'lucide-react';

const ImageViewer = () => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Toolbar */}
      <div className="h-12 border-b border-gray-800 flex items-center gap-2 px-4 bg-gray-800">
        <button className="px-3 py-1.5 rounded hover:bg-gray-700 text-white text-sm transition-colors">
          Open Image
        </button>
        <div className="w-px h-6 bg-gray-700 mx-2" />
        <button
          onClick={() => setZoom(Math.min(200, zoom + 10))}
          className="w-8 h-8 rounded hover:bg-gray-700 flex items-center justify-center text-white transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom(Math.max(25, zoom - 10))}
          className="w-8 h-8 rounded hover:bg-gray-700 flex items-center justify-center text-white transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-white text-sm mx-2">{zoom}%</span>
        <button
          onClick={() => setRotation((rotation + 90) % 360)}
          className="w-8 h-8 rounded hover:bg-gray-700 flex items-center justify-center text-white transition-colors"
        >
          <RotateCw className="w-4 h-4" />
        </button>
        <div className="flex-1" />
        <button className="w-8 h-8 rounded hover:bg-gray-700 flex items-center justify-center text-white transition-colors">
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* Image Area */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-8">
        <div className="flex flex-col items-center justify-center">
          <ImageIcon className="w-32 h-32 text-gray-600 mb-4" />
          <p className="text-gray-400 text-lg">No image loaded</p>
          <p className="text-gray-500 text-sm mt-2">Click "Open Image" to load an image</p>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;