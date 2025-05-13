import React from 'react';
import { Color, Size } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface VariantSelectorProps {
  colors: Color[];
  sizes: Size[];
}

const VariantSelector: React.FC<VariantSelectorProps> = ({ colors, sizes }) => {
  const [selectedColor, setSelectedColor] = useLocalStorage<string>('selectedColor', colors[0]?.id || '');
  const [selectedSize, setSelectedSize] = useLocalStorage<string>('selectedSize', sizes[0]?.id || '');

  return (
    <div className="space-y-6">
      {/* Color selector */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Color</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color.id)}
              aria-label={`Color: ${color.name}`}
              title={color.name}
              className={`
                w-10 h-10 rounded-full border-2 transition-all duration-200
                ${selectedColor === color.id ? 'border-blue-500 scale-110' : 'border-gray-300'}
                ${color.value === '#FFFFFF' ? 'bg-white' : ''}
                hover:scale-110
              `}
              style={{ backgroundColor: color.value }}
            >
              {selectedColor === color.id && (
                <span className="flex items-center justify-center h-full">
                  <span className={`h-2 w-2 rounded-full ${color.value === '#FFFFFF' ? 'bg-gray-800' : 'bg-white'}`}></span>
                </span>
              )}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Selected: {colors.find(c => c.id === selectedColor)?.name || 'None'}
        </p>
      </div>

      {/* Size selector */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size.id}
              onClick={() => setSelectedSize(size.id)}
              className={`
                min-w-[3rem] h-10 px-3 rounded-md border transition-all duration-200
                ${selectedSize === size.id 
                  ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' 
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'}
              `}
            >
              {size.name}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Selected: {sizes.find(s => s.id === selectedSize)?.name || 'None'}
        </p>
      </div>
    </div>
  );
};

export default VariantSelector;