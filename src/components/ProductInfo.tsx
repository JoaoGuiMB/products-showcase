import React from 'react';
import { Product } from '../types';
import VariantSelector from './VariantSelector';
import DeliveryChecker from './DeliveryChecker';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { name, price, description, variants } = product;

  const formatPrice = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{name}</h1>
        <div className="mt-2 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="ml-2 text-sm text-gray-600">4.0 out of 5 stars (42 reviews)</p>
        </div>
        <p className="mt-4 text-3xl font-bold text-gray-900">{formatPrice(price)}</p>
        <div className="mt-2">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            In stock
          </span>
          <span className="ml-2 inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Free shipping
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
        <p className="text-gray-700">{description}</p>
      </div>

      <div className="mb-6">
        <VariantSelector colors={variants.colors} sizes={variants.sizes} />
      </div>

      <div className="mb-6">
        <DeliveryChecker />
      </div>

      <div className="mt-auto pt-6">
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg 
                    font-medium shadow-md transition-colors duration-200 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to Cart
        </button>
        <button 
          className="w-full mt-3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 
                    py-3 px-6 rounded-lg font-medium transition-colors duration-200"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;