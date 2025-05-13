import { Product } from '../types';

export const product: Product = {
  id: '1',
  name: 'Premium Running Shoes ULTRA',
  price: 299.99,
  description: 'These premium running shoes combine cutting-edge technology with stylish design to deliver exceptional performance. Featuring responsive cushioning, breathable materials, and durable construction, they provide optimal comfort and support for runners of all levels. The innovative sole design offers superior traction on various surfaces, while the lightweight build ensures effortless movement.',
  images: [
    'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1456705/pexels-photo-1456705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ],
  variants: {
    colors: [
      { id: 'color-1', name: 'Black', value: '#000000' },
      { id: 'color-2', name: 'White', value: '#FFFFFF' },
      { id: 'color-3', name: 'Red', value: '#FF0000' },
      { id: 'color-4', name: 'Blue', value: '#0000FF' }
    ],
    sizes: [
      { id: 'size-1', name: '38', value: '38' },
      { id: 'size-2', name: '39', value: '39' },
      { id: 'size-3', name: '40', value: '40' },
      { id: 'size-4', name: '41', value: '41' },
      { id: 'size-5', name: '42', value: '42' },
      { id: 'size-6', name: '43', value: '43' }
    ]
  }
};