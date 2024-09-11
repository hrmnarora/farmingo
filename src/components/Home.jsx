import { useState } from 'react';
import SignInModal from './SignInModal';
import RegisterModal from './RegisterModal';
import bgImage from './bg.jpg';
import { useCrops } from './../Context/CropContext';
import { Link } from 'react-router-dom';

function Home() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const { crops } = useCrops(); // Use the crops context to fetch crops

  return (
    <div 
      className="h-screen font-[poppins] flex flex-col items-center text-white"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Header */}
      <header className="flex justify-between h-[100px] items-center w-full p-6 bg-[#021500]/80">
        <h1 className="text-3xl font-bold">Farm<span className="text-green-500">ingo</span></h1>
        <nav className="space-x-6">
          <a href="#features" className="text-lg hover:text-green-400">Features</a>
          <a href="#contact" className="text-lg hover:text-green-400">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <div className='flex w-[100vw]'>
        <div className="flex w-[100vw] h-[calc(100vh-100px)] flex-col justify-center items-center bg-[#021500]/80 px-20">
          <div className='w-[60%] flex h-full flex-col text-center justify-center items-center'>
            <h2 className="text-6xl font-bold mb-4 text-green-500">
              Best Deals for Your Crops
            </h2>
            <p className="text-xl mb-6">
              Farmingo connects farmers with buyers for the best crop deals, negotiation, transport, and contract handling.
            </p>
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-full w-fit text-lg font-semibold hover:bg-green-600"
              onClick={() => setShowButtons(true)}
            >
              Get Started
            </button>
          </div>
          {showButtons && (
            <div className='w-[100vw] h-[100vh] bg-black/30 flex items-center justify-center absolute top-0'>
              <div className="p-7 bg-white rounded-md flex items-center justify-center flex-col mt-3">
                <button
                  className="bg-green-500 text-white px-6 py-3 rounded-md mb-3"
                  onClick={() => setIsSignInOpen(true)}
                >
                  Login to existing Account
                </button>
                <p className='text-zinc-800 text-sm'>Not have an Account?</p>
                <button
                  className="text-green-500 font-bold text-medium"
                  onClick={() => setIsRegisterOpen(true)}
                >
                  Create New Account
                </button>
              </div>
            </div>
          )}
          {isSignInOpen && <SignInModal closeModal={() => setIsSignInOpen(false)} />}
          {isRegisterOpen && <RegisterModal closeModal={() => setIsRegisterOpen(false)} />}
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="w-full py-20 bg-white text-black">
        <h3 className="text-center text-4xl mb-10 font-bold">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-10">
          <div className="bg-zinc-100 p-6 rounded-md text-center ">
            <h4 className="font-bold text-xl mb-4 text-green-500">Negotiation</h4>
            <p>Directly negotiate prices with buyers to get the best deal for your crops.</p>
          </div>
          <div className="bg-zinc-100 p-6 rounded-md text-center ">
            <h4 className="font-bold text-xl mb-4 text-green-500">Transport</h4>
            <p>Seamless transport solutions to ensure your crops reach the buyer in perfect condition.</p>
          </div>
          <div className="bg-zinc-100 p-6 rounded-md text-center ">
            <h4 className="font-bold text-xl mb-4 text-green-500">Live Chat</h4>
            <p>Instant messaging to discuss and finalize crop deals with buyers in real-time.</p>
          </div>
          <div className="bg-zinc-100 p-6 rounded-md text-center ">
            <h4 className="font-bold text-xl mb-4 text-green-500">Contracts</h4>
            <p>Hassle-free contracts to ensure secure and transparent transactions for both parties.</p>
          </div>
        </div>
      </section>

      {/* Crops Section */}
      <section id="crops" className="w-full py-20 bg-gray-100 text-black">
        <h3 className="text-center text-4xl mb-10 font-bold">Available Crops</h3>
        {crops.length === 0 ? (
          <p className="text-center">No crops are available at the moment. Please check back later.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10">
            {crops.map(crop => (
              <div key={crop.id} className="bg-white p-6 rounded-md shadow-md">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-40 object-cover mb-4 rounded-lg"
                />
                <h4 className="font-bold text-xl mb-2">{crop.name}</h4>
                <p className="text-lg">Price: {crop.price}</p>
                <p className="text-md mb-2">Quantity: {crop.quantity}</p>
                <p className="text-md mb-2 text-gray-600">{crop.description}</p>
                <Link
                  to={`/crop/${crop.id}`}
                  className="text-green-500 underline hover:text-green-700"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-green-500 h-[200px] w-full text-center text-white py-6">
        <h4 className="text-2xl font-semibold mb-4">Contact Us</h4>
        <p>Email: support@farmingo.com | Phone: +123 456 7890</p>
      </footer>
    </div>
  );
}

export default Home;
