import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useLocalStorage<string>('selectedImage', images[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure the selected image exists in the current images array
    if (!images.includes(selectedImage)) {
      setSelectedImage(images[0]);
    }
  }, [images, selectedImage, setSelectedImage]);

  const handleImageSelect = (image: string) => {
    setIsLoading(true);
    setSelectedImage(image);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square w-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}
        <img
          src={selectedImage}
          alt="Product"
          className={`object-cover w-full h-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleImageLoad}
        />
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageSelect(image)}
            className={`
              relative aspect-square overflow-hidden rounded-md 
              transition-all duration-200 transform hover:scale-105 
              ${selectedImage === image ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-200'}
            `}
          >
            <img 
              src={image} 
              alt={`Product thumbnail ${index + 1}`} 
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;