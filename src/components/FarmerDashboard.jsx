import { useState } from 'react';
import { useCrops } from './../Context/CropContext';
import bgImage from './bg2.png';

function FarmerDashboard() {
  const { crops, addCrop } = useCrops();
  const [newCrop, setNewCrop] = useState({ name: '', price: '', description: '', quantity: '', image: null });
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleAddCrop = () => {
    const id = Date.now();
    if (newCrop.name && newCrop.price && newCrop.description && newCrop.quantity && newCrop.image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        const cropToAdd = { ...newCrop, id, status: 'available', image: base64Image };

        // Add crop to context and localStorage
        addCrop(cropToAdd);
        const storedCrops = JSON.parse(localStorage.getItem('crops')) || [];
        localStorage.setItem('crops', JSON.stringify([...storedCrops, cropToAdd]));

        // Reset the form
        setNewCrop({ name: '', price: '', description: '', quantity: '', image: null });
        setPopupOpen(false);
      };
      reader.readAsDataURL(newCrop.image);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="h-screen flex">
      {/* Left section for add new crop */}
      <div
        className="w-1/3 bg-green-900 text-white p-8 relative"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-6xl font-bold mb-4">Selling Your Crops Become Simple</h1>
          <p className="mb-8">Parkitup Provides You to book the Best Parking Slots Available at your desired Location</p>
          <button onClick={() => setPopupOpen(true)} className="bg-white text-zinc-800 px-4 py-2 rounded">List New</button>
        </div>
      </div>

      {/* Right section for listed crops */}
      <div className="w-2/3 pt-4 px-5">
        <div className="border-y-2 border-zinc-200 pt-5">
          <h2 className="text-6xl font-medium py-5">Your Listed Crops</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 px-5">
  {crops.length === 0 ? (
    <p className="text-center col-span-full">No crops are available at the moment. Please check back later.</p>
  ) : (
    crops.map((crop) => (
      <div key={crop.id} className="bg-white border border-zinc-200 shadow-sm  overflow-hidden">
        <img
          src={crop.image}
          alt={crop.name}
          className="w-full h-[200px] object-cover"
        />
        <div className="p-4">
          <h4 className="font-bold text-xl mb-2">{crop.name}</h4>
          <p className="text-lg">Price: {crop.price}</p>
          <a href={`/crop/${crop.id}`} className="text-green-600 hover:text-green-700">
            View Details
          </a>
        </div>
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
