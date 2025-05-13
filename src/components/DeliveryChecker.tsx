import React, { useState, useEffect, useCallback } from "react";
import { Address } from "../types";
import { fetchAddressByCep, formatCep } from "../utils/cepService";
import { useLocalStorage } from "../hooks/useLocalStorage";

const DeliveryChecker: React.FC = () => {
  const [cep, setCep] = useLocalStorage<string>("cep", "");
  const [address, setAddress] = useLocalStorage<Address | null>(
    "address",
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCep = e.target.value.replace(/\D/g, "").slice(0, 8);
    setCep(formatCep(newCep));
  };

  const checkCep = useCallback(async () => {
    if (cep.replace(/\D/g, "").length !== 8) {
      setError("CEP must have 8 digits");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const addressData = await fetchAddressByCep(cep);
      setAddress(addressData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to fetch address information");
      }
      setAddress(null);
    } finally {
      setIsLoading(false);
    }
  }, [cep, setAddress]);

  useEffect(() => {
    // Auto-fetch if we have a complete CEP
    if (cep.replace(/\D/g, "").length === 8 && !address) {
      checkCep();
    }
  }, [address, cep, checkCep]);

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <h3 className="font-medium text-gray-800 mb-3">Shipping Information</h3>

      <div className="flex flex-col space-y-3">
        <div className="flex gap-2">
          <div className="flex-grow">
            <label
              htmlFor="cep"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              CEP
            </label>
            <input
              type="text"
              id="cep"
              value={cep}
              onChange={handleCepChange}
              placeholder="Enter CEP (e.g., 01001-000)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                        focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={checkCep}
              disabled={isLoading || cep.replace(/\D/g, "").length !== 8}
              className="h-10 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm 
                        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                        focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Checking
                </span>
              ) : (
                "Check"
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {address && !address.erro && (
          <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
            <h4 className="font-medium text-green-800 mb-1">
              Delivery available to this address:
            </h4>
            <p className="text-green-700">
              {address.logradouro}
              {address.complemento ? `, ${address.complemento}` : ""}
              <br />
              {address.bairro}, {address.localidade} - {address.uf}
              <br />
              CEP: {address.cep}
            </p>
            <p className="mt-2 text-sm text-green-600">
              Estimated delivery: 3-5 business days
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryChecker;
