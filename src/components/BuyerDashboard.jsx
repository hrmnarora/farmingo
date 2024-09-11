import { useCrops } from './../Context/CropContext';
import { Link } from 'react-router-dom';

function BuyerDashboard() {
  const { crops } = useCrops();
  const userType = localStorage.getItem('userType'); // Assuming userType is either 'buyer' or 'farmer'

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Buyer Dashboard</h1>

      <div className="my-4 w-full max-w-7xl">
        <h2 className="text-2xl mb-4">Available Crops</h2>

        {crops.length === 0 ? (
          <p>No crops are available at the moment. Please check back later.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {crops
              .filter(crop => crop.status === 'available')
              .map(crop => (
                <div key={crop.id} className="border p-4 rounded-lg bg-white shadow-md">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-40 object-cover mb-4 rounded-lg"
                  />
                  <h3 className="text-xl font-semibold mb-2">{crop.name}</h3>
                  <p className="text-lg">Price: {crop.price}</p>
                  <p className="text-md mb-2">Quantity: {crop.quantity}</p>
                  <p className="text-md mb-2 text-gray-600">
                    Description: {crop.description}
                  </p>
                  
                    <Link
                      to={`/crop/${crop.id}`}
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      View Details
                    </Link>

                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BuyerDashboard;
