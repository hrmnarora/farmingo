import { useState } from 'react';
import { useCrops } from './../Context/CropContext';

function FarmerDashboard() {
  const { crops, addCrop } = useCrops();
  const [newCrop, setNewCrop] = useState({ name: '', price: '', description: '', quantity: '', image: null });
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleAddCrop = () => {
    const id = Date.now();
    if (newCrop.name && newCrop.price && newCrop.description && newCrop.quantity && newCrop.image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result; // Base64 string of the image
        const cropToAdd = { ...newCrop, id, status: 'available', image: base64Image };
        
        // Add crop to context and localStorage
        addCrop(cropToAdd);
        const storedCrops = JSON.parse(localStorage.getItem('crops')) || [];
        localStorage.setItem('crops', JSON.stringify([...storedCrops, cropToAdd]));
        
        // Reset the form
        setNewCrop({ name: '', price: '', description: '', quantity: '', image: null });
        setPopupOpen(false);
      };
      reader.readAsDataURL(newCrop.image); // Read image as Base64 string
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="h-screen flex">
      {/* Left section for add new crop */}
      <div className="w-1/3 bg-green-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-4">Selling Your Crops Become Simple</h1>
        <p className="mb-8">Parkitup Provides You to book the Best Parking Slots Available at your desired Location</p>
        <button onClick={() => setPopupOpen(true)} className="bg-green-500 px-4 py-2 rounded">List New</button>
      </div>

      {/* Right section for listed crops */}
      <div className="w-2/3 bg-gray-100 p-8">
        <h2 className="text-2xl font-bold mb-4">Your Listed Crops</h2>
        <div className="space-y-4">
          {crops.length === 0 ? (
            <p>No crops listed yet.</p>
          ) : (
            crops.map((crop) => (
              <div key={crop.id} className="bg-green-200 p-4 rounded">
                <h3 className="text-xl font-bold">{crop.name}</h3>
                <p>Price: {crop.price}</p>
                <p>Quantity: {crop.quantity}</p>
                <p>Status: {crop.status}</p>
                {/* Display the image */}
                {crop.image && (
                  <img src={crop.image} alt={crop.name} className="w-32 h-32 object-cover my-2" />
                )}
                {/* Link to crop detail page */}
                <a href={`/crop/${crop.id}`} className="text-blue-500 underline">View Details</a>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Popup for adding new crop */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded w-1/2">
            <h2 className="text-2xl mb-4">List New Crop</h2>
            <input
              type="text"
              placeholder="Crop Name"
              value={newCrop.name}
              onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
              className="block w-full mb-4 p-2 border"
            />
            <input
              type="text"
              placeholder="Price"
              value={newCrop.price}
              onChange={(e) => setNewCrop({ ...newCrop, price: e.target.value })}
              className="block w-full mb-4 p-2 border"
            />
            <input
              type="text"
              placeholder="Quantity"
              value={newCrop.quantity}
              onChange={(e) => setNewCrop({ ...newCrop, quantity: e.target.value })}
              className="block w-full mb-4 p-2 border"
            />
            <textarea
              placeholder="Description"
              value={newCrop.description}
              onChange={(e) => setNewCrop({ ...newCrop, description: e.target.value })}
              className="block w-full mb-4 p-2 border"
            />
            <input
              type="file"
              onChange={(e) => setNewCrop({ ...newCrop, image: e.target.files[0] })}
              className="block w-full mb-4"
            />
            <button onClick={handleAddCrop} className="bg-green-500 px-4 py-2 rounded mr-4">Add Crop</button>
            <button onClick={() => setPopupOpen(false)} className="bg-red-500 px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FarmerDashboard;
