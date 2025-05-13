import { useState, useEffect } from 'react';

interface StorageItem<T> {
  value: T;
  expiry: number;
}

const EXPIRY_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      
      if (item) {
        const parsedItem: StorageItem<T> = JSON.parse(item);
        const now = new Date().getTime();
        
        if (now < parsedItem.expiry) {
          return parsedItem.value;
        } else {
          window.localStorage.removeItem(key);
        }
      }
      return initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const expiry = new Date().getTime() + EXPIRY_TIME;
      const item: StorageItem<T> = { value, expiry };
      
      window.localStorage.setItem(key, JSON.stringify(item));
      setStoredValue(value);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        try {
          const parsedItem: StorageItem<T> = JSON.parse(event.newValue);
          const now = new Date().getTime();
          
          if (now < parsedItem.expiry) {
            setStoredValue(parsedItem.value);
          }
        } catch (error) {
          console.error('Error processing storage event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}