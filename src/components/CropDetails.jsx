import { useParams } from 'react-router-dom';
import { useCrops } from './../Context/CropContext';

function CropDetail() {
  const { id } = useParams();
  const { crops, updateCropStatus } = useCrops();
  const crop = crops.find(crop => crop.id === parseInt(id));

  if (!crop) {
    return <div>Crop not found</div>;
  }

  const handleBuy = () => {
    updateCropStatus(crop.id, 'sold');
    alert('Crop purchased!');
  };

  console.log('crop.image:', crop.image); // Check what this logs

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">{crop.name}</h1>
      <p>Price: {crop.price}</p>
      <p>Quantity: {crop.quantity}</p>
      <p>{crop.description}</p>
      <p>Status: {crop.status}</p>
      {/* Use crop.image directly if it's a URL */}
      {crop.image ? (
        typeof crop.image === 'string' ? (
          <img
            src={crop.image}
            alt={crop.name}
            className="w-64 h-64 object-cover my-4"
          />
        ) : (
          <p>No valid image available</p>
        )
      ) : (
        <p>No image provided</p>
      )}
      <button onClick={handleBuy} className="bg-green-500 px-4 py-2 rounded">Buy</button>
    </div>
  );
}

export default CropDetail;
