import { useCrops } from "./../Context/CropContext";
import { Link } from "react-router-dom";
import bgImage from './bg2.png'; // Assuming you want a background image like in the Farmer Dashboard

function BuyerDashboard() {
  const { crops } = useCrops();

  return (
    <div className="h-screen flex">
      {/* Left section with image and title */}
      <div
        className="w-1/3 bg-green-900 text-white p-8 relative"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-6xl font-bold mb-4">Explore Fresh Crops</h1>
          <p className="mb-8">
            Browse through our listings to find the best crops available for purchase.
          </p>
        </div>
      </div>

      {/* Right section with crops listing */}
      <div className="w-2/3 pt-4 px-10">
        <div className="border-y-2 border-zinc-200 pt-5 ">
          <h2 className="text-6xl font-medium py-5">Available Crops</h2>
        </div>

        <div className="my-4 w-full max-w-7xl">
          {crops.length === 0 ? (
            <p>No crops are available at the moment. Please check back later.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5">
              {crops
                .filter((crop) => crop.status === "available")
                .map((crop) => (
                  <div
                    key={crop.id}
                    className="bg-white border border-zinc-200 shadow-sm mt-10 overflow-hidden"
                  >
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-full h-[200px] object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-bold text-xl mb-2">{crop.name}</h4>
                      <p className="text-lg">Price: {crop.price}</p>
                      {/* <p className="text-md mb-2">Quantity: {crop.quantity}</p>
                      <p className="text-gray-600">Description: {crop.description}</p> */}
                      <Link
                        to={`/crop/${crop.id}`}
                        className="text-zinc-600 hover:text-green-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;
