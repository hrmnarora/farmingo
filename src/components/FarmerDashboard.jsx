import { useState } from "react";
import { useCrops } from "./../Context/CropContext";
import bgImage from "./bg2.png";
import SignOutButton from "./SignOutButton"; // Import the SignOutButton

function FarmerDashboard() {
  const { crops, addCrop, updateCrop, deleteCrop } = useCrops(); // Add update and delete functions
  const [newCrop, setNewCrop] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    image: null,
    time: new Date().toLocaleString(),
    username: "Farmer123", // Example username, replace with actual user data
  });
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false); // Track edit popup
  const [editCropId, setEditCropId] = useState(null); // Track the crop being edited

  const handleAddCrop = () => {
    const id = Date.now();
    if (
      newCrop.name &&
      newCrop.price &&
      newCrop.description &&
      newCrop.quantity &&
      newCrop.image
    ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        const cropToAdd = {
          ...newCrop,
          id,
          status: "available",
          image: base64Image,
        };
        addCrop(cropToAdd);

        // Save in localStorage
        const storedCrops = JSON.parse(localStorage.getItem("crops")) || [];
        localStorage.setItem(
          "crops",
          JSON.stringify([...storedCrops, cropToAdd])
        );

        // Reset the form
        setNewCrop({
          name: "",
          price: "",
          description: "",
          quantity: "",
          image: null,
          time: new Date().toLocaleString(),
          username: "Farmer123", // Replace with dynamic user data
        });
        setPopupOpen(false);
      };
      reader.readAsDataURL(newCrop.image);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleEditCrop = (crop) => {
    setNewCrop(crop); // Set the form with the crop details for editing
    setEditCropId(crop.id);
    setEditPopupOpen(true);
  };

  const handleUpdateCrop = () => {
    if (
      newCrop.name &&
      newCrop.price &&
      newCrop.description &&
      newCrop.quantity &&
      newCrop.image
    ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        const updatedCrop = {
          ...newCrop,
          image: base64Image,
        };
        updateCrop(editCropId, updatedCrop);
        setEditPopupOpen(false);
      };
      reader.readAsDataURL(newCrop.image);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDeleteCrop = (id) => {
    if (window.confirm("Are you sure you want to delete this crop?")) {
      deleteCrop(id);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1">
        
        {/* Left Section */}
        <div
          className="w-1/3 hidden md:flex flex-col bg-green-900 text-white p-8 relative"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute flex flex-col  inset-0 bg-black opacity-50 z-0"></div>
          <div className="relative z-10">
            <h1 className="text-6xl font-bold mb-4">
              Selling Your Crops Made Simple
            </h1>
            <p className="mb-8">List your crops for sale here.</p>
            <button
              onClick={() => setPopupOpen(true)}
              className=" px-4 w-full bg-green-500 py-2 rounded text-white font-bold"
            >
              List New Crop
            </button>
          </div>
          <div className="z-10 relative">
            <div className="bg-white mt-10 text-black flex items-center justify-center px-5 py-2 w-fit">
              <SignOutButton />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full pt-4 px-5">
          {/* Listed Crops */}
          <div className="border-y-2 border-zinc-200 pt-5 flex justify-between">
            <h2 className="text-6xl font-medium py-5">Your Listed Crops</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 px-5">
            {crops.filter((crop) => crop.status === "available").length ===
            0 ? (
              <p className="text-center col-span-full">
                No crops are available at the moment.
              </p>
            ) : (
              crops
                .filter((crop) => crop.status === "available")
                .map((crop) => (
                  <div
                    key={crop.id}
                    className="bg-white border border-zinc-200 shadow-sm overflow-hidden"
                  >
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-full h-[200px] object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-bold text-xl mb-2">{crop.name}</h4>
                      <p className="text-lg">Price: {crop.price}</p>
                      <p className="text-sm">Listed by: {crop.username}</p>
                      <p className="text-sm">Listed on: {crop.time}</p>
                      <div className="flex mt-4">
                        <button
                          onClick={() => handleEditCrop(crop)}
                          className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCrop(crop.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>

          {/* Sold Crops Section */}
          <div className="border-y-2 border-zinc-200 pt-5 mt-10">
            <h2 className="text-6xl font-medium py-5">Sold Crops</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 px-5">
            {crops.filter((crop) => crop.status === "sold").length === 0 ? (
              <p className="text-center col-span-full">No sold crops.</p>
            ) : (
              crops
                .filter((crop) => crop.status === "sold")
                .map((crop) => (
                  <div
                    key={crop.id}
                    className="bg-white border border-zinc-200 shadow-sm overflow-hidden"
                  >
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-full h-[200px] object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-bold text-xl mb-2">{crop.name}</h4>
                      <p className="text-lg">Price: {crop.price}</p>
                      <p className="text-sm">Sold by: {crop.username}</p>
                      <p className="text-sm">Listed on: {crop.time}</p>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      {/* Popup for adding new crop */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded w-[400px]">
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
              onChange={(e) =>
                setNewCrop({ ...newCrop, price: e.target.value })
              }
              className="block w-full mb-4 p-2 border"
            />
            <input
              type="text"
              placeholder="Quantity"
              value={newCrop.quantity}
              onChange={(e) =>
                setNewCrop({ ...newCrop, quantity: e.target.value })
              }
              className="block w-full mb-4 p-2 border"
            />
            <textarea
              placeholder="Description"
              value={newCrop.description}
              onChange={(e) =>
                setNewCrop({ ...newCrop, description: e.target.value })
              }
              className="block w-full mb-4 p-2 border"
            />
            <input
              type="file"
              onChange={(e) =>
                setNewCrop({ ...newCrop, image: e.target.files[0] })
              }
              className="block w-full mb-4"
            />
            <button
              onClick={handleAddCrop}
              className="bg-green-500 px-4 py-2 rounded mr-4"
            >
              Add Crop
            </button>
            <button
              onClick={() => setPopupOpen(false)}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Popup for editing crop */}
      {isEditPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded w-[400px]">
            <h2 className="text-2xl mb-4">Edit Crop</h2>
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
              onChange={(e) =>
                setNewCrop({ ...newCrop, price: e.target.value })
              }
              className="block w-full mb-4 p-2 border"
            />
            <input
              type="text"
              placeholder="Quantity"
              value={newCrop.quantity}
              onChange={(e) =>
                setNewCrop({ ...newCrop, quantity: e.target.value })
              }
              className="block w-full mb-4 p-2 border"
            />
            <textarea
              placeholder="Description"
              value={newCrop.description}
              onChange={(e) =>
                setNewCrop({ ...newCrop, description: e.target.value })
              }
              className="block w-full mb-4 p-2 border"
            />
            <input
              type="file"
              onChange={(e) =>
                setNewCrop({ ...newCrop, image: e.target.files[0] })
              }
              className="block w-full mb-4"
            />
            <button
              onClick={handleUpdateCrop}
              className="bg-blue-500 px-4 py-2 rounded mr-4"
            >
              Update Crop
            </button>
            <button
              onClick={() => setEditPopupOpen(false)}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FarmerDashboard;
