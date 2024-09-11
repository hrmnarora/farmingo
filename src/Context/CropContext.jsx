import React, { createContext, useState, useContext, useEffect } from 'react';

const CropContext = createContext();

export function CropProvider({ children }) {
  const [crops, setCrops] = useState([]);

  // Load crops from localStorage on initial mount
  useEffect(() => {
    const savedCrops = localStorage.getItem('crops');
    if (savedCrops) {
      try {
        const parsedCrops = JSON.parse(savedCrops);
        if (Array.isArray(parsedCrops)) {
          setCrops(parsedCrops);
        } else {
          console.error('Invalid crops data in localStorage.');
        }
      } catch (error) {
        console.error('Failed to parse crops from localStorage:', error);
      }
    }
  }, []); // Runs only once when the component is mounted

  // Save crops to localStorage whenever crops state changes
  useEffect(() => {
    if (crops.length > 0) {
      try {
        localStorage.setItem('crops', JSON.stringify(crops));
      } catch (error) {
        console.error('Failed to save crops to localStorage:', error);
      }
    }
  }, [crops]);

  // Function to add a new crop
  const addCrop = (crop) => {
    setCrops((prevCrops) => [...prevCrops, crop]);
  };

  // Function to update crop status
  const updateCropStatus = (id, status) => {
    setCrops((prevCrops) =>
      prevCrops.map((crop) =>
        crop.id === id ? { ...crop, status } : crop
      )
    );
  };

  return (
    <CropContext.Provider value={{ crops, addCrop, updateCropStatus }}>
      {children}
    </CropContext.Provider>
  );
}

export const useCrops = () => useContext(CropContext);
