import { Address } from '../types';

export const fetchAddressByCep = async (cep: string): Promise<Address> => {
  try {
    // Remove non-numeric characters
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      throw new Error('CEP must have 8 digits');
    }
    
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await response.json();
    
    if (data.erro) {
      throw new Error('CEP not found');
    }
    
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch address');
  }
};

export const formatCep = (cep: string): string => {
  const cleanCep = cep.replace(/\D/g, '');
  
  if (cleanCep.length <= 5) {
    return cleanCep;
  }
  
  return `${cleanCep.slice(0, 5)}-${cleanCep.slice(5, 8)}`;
};