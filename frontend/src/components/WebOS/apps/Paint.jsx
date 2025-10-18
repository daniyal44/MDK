import React, { useRef, useState, useEffect } from 'react';
import { Palette, Pencil, Eraser, Circle, Square, Minus, Download, Trash2 } from 'lucide-react';

const Paint = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    setLastPos({ x, y });
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    if (tool === 'pencil') {
      ctx.strokeStyle = color;
      ctx.globalCompositeOperation = 'source-over';
      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (tool === 'eraser') {
      ctx.strokeStyle = 'white';
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    setLastPos({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB'];

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="h-16 border-b border-gray-200 flex items-center gap-3 px-4 bg-gray-50">
        <div className="flex items-center gap-2 border-r border-gray-300 pr-3">
          <button
            onClick={() => setTool('pencil')}
            className={`w-10 h-10 rounded flex items-center justify-center transition-colors ${
              tool === 'pencil' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
            }`}
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`w-10 h-10 rounded flex items-center justify-center transition-colors ${
              tool === 'eraser' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
            }`}
          >
            <Eraser className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {colors.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded border-2 transition-transform hover:scale-110 ${
                color === c ? 'border-gray-800 scale-110' : 'border-gray-300'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 rounded border-2 border-gray-300 cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-2 border-l border-gray-300 pl-3">
          <span className="text-sm text-gray-600">Size:</span>
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-sm text-gray-600 w-8">{lineWidth}px</span>
        </div>

        <div className="flex-1" />

        <button
          onClick={clearCanvas}
          className="px-3 py-2 rounded hover:bg-gray-200 flex items-center gap-2 text-sm transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-4">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="bg-white border border-gray-300 shadow-lg cursor-crosshair"
        />
      </div>
    </div>
  );
};

export default Paint;