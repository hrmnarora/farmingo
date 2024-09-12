import { useParams, useNavigate } from 'react-router-dom';
import { useCrops } from './../Context/CropContext';
import { useState } from 'react';
import bgImage from './bg3.png'; // Update the path as needed

function CropDetail() {
  const { id } = useParams();
  const { crops, updateCropStatus } = useCrops();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const crop = crops.find(crop => crop.id === parseInt(id));

  if (!crop) {
    return <div>Crop not found</div>;
  }

  const handleBuy = () => {
    setShowPopup(true);
  };

  const handleConfirmPurchase = () => {
    updateCropStatus(crop.id, 'sold');
    alert('Crop purchased!');
    navigate('/buyer');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}
    >
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">{crop.name}</h1>
        <p className="mb-2">Price: {crop.price}</p>
        <p className="mb-2">Quantity: {crop.quantity}</p>
        <p className="mb-4">{crop.description}</p>
        <p className="mb-4">Status: {crop.status}</p>
        {/* Use crop.image directly if it's a URL */}
        {crop.image ? (
          typeof crop.image === 'string' ? (
            <img
              src={crop.image}
              alt={crop.name}
              className="w-64 h-64 object-cover mb-4"
            />
          ) : (
            <p>No valid image available</p>
          )
        ) : (
          <p>No image provided</p>
        )}
        <button onClick={handleBuy} className="bg-green-500 text-white px-4 py-2 rounded">
          Buy
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Confirm Purchase</h2>
            <p className="mb-4">Are you sure you want to buy this crop?</p>
            <button onClick={handleConfirmPurchase} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
              Confirm
            </button>
            <button onClick={handleClosePopup} className="bg-red-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CropDetail;
