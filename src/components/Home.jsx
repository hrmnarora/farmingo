import { useState } from "react";
import SignInModal from "./SignInModal";
import RegisterModal from "./RegisterModal";
import bgImage from "./bg.jpg";
import { useCrops } from "./../Context/CropContext";
import { Link } from "react-router-dom";

function Home() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const { crops } = useCrops(); // Use the crops context to fetch crops

  return (
    <div
      className="h-[100vh] font-[poppins] flex flex-col items-center text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <header className="flex justify-between h-[100px] items-center w-full p-6 bg-[#021500]/80">
        <h1 className="text-3xl font-bold">
          Farm<span className="text-green-500">ingo</span>
        </h1>
        <nav className="space-x-6">
          <a href="#features" className="text-lg hover:text-green-400">
            Features
          </a>
          <a href="#contact" className="text-lg hover:text-green-400">
            Contact
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="flex w-[100vw]">
        <div className="flex w-[100vw] h-[calc(100vh-100px)] flex-col justify-center items-center bg-[#021500]/80 px-10">
          <div className="w-[80%] flex h-full flex-col justify-center ">
            <h2 className="text-8xl font-medium mb-4 text-zinc-100 ">
              Best Deals <br />
              for Your Crops
            </h2>
            <p className="text-xl mb-6">
              Farmingo connects farmers with buyers for the best crop deals,{" "}
              <br /> negotiation, transport, and contract handling.
            </p>
            <button
              className="bg-white text-zinc-800 px-6 py-3 rounded-full w-fit text-lg font-semibold hover:bg-green-600"
              onClick={() => setShowButtons(true)}
            >
              Get Started
            </button>
          </div>
          {showButtons && (
            <div className="w-[100vw] h-[100vh] bg-black/30 flex items-center justify-center absolute top-0">
              <div className="p-7 bg-white rounded-md flex items-center justify-center flex-col mt-3">
                <button
                  className="bg-green-500 text-white px-6 py-3 rounded-md mb-3"
                  onClick={() => setIsSignInOpen(true)}
                >
                  Login to existing Account
                </button>
                <p className="text-zinc-800 text-sm">Not have an Account?</p>
                <button
                  className="text-green-500 font-bold text-medium"
                  onClick={() => setIsRegisterOpen(true)}
                >
                  Create New Account
                </button>
              </div>
            </div>
          )}
          {isSignInOpen && (
            <SignInModal closeModal={() => setIsSignInOpen(false)} />
          )}
          {isRegisterOpen && (
            <RegisterModal closeModal={() => setIsRegisterOpen(false)} />
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full flex items-center  mt-16">
        <h1 className="text-zinc-800 ml-16 text-6xl">Features We Provide</h1>
      </div>
      <section
        id="features"
        className="w-full py-20 mt-[40px] border-y-2  border-zinc-200 bg-white text-black"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-10">
          <div className="  p-6 rounded-md  ">
            <h4 className="font-bold text-xl mb-4 text-zinc-800">
              Negotiation
            </h4>
            <p>
              Directly negotiate prices with buyers to get the best deal for
              your crops.
            </p>
          </div>
          <div className="  p-6 rounded-md  ">
            <h4 className="font-bold text-xl mb-4 text-zinc-800">Transport</h4>
            <p>
              Seamless transport solutions to ensure your crops reach the buyer
              in perfect condition.
            </p>
          </div>
          <div className="  p-6 rounded-md  ">
            <h4 className="font-bold text-xl mb-4 text-zinc-800">Live Chat</h4>
            <p>
              Instant messaging to discuss and finalize crop deals with buyers
              in real-time.
            </p>
          </div>
          <div className="  p-6 rounded-md  ">
            <h4 className="font-bold text-xl mb-4 text-zinc-800">Contracts</h4>
            <p>
              Hassle-free contracts to ensure secure and transparent
              transactions for both parties.
            </p>
          </div>
        </div>
      </section>

      {/* Crops Section */}
      <div className="w-full flex  items-center  mt-16">
        <h1 className="text-zinc-800 ml-16 text-6xl">
          Discover Available Products
        </h1>
      </div>
      <section
        id="features"
        className="w-full py-20 mt-[40px] border-y-2 border-zinc-200 bg-green-900 text-black"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-10">
          {crops.length === 0 ? (
            <p className="text-center text-zinc-200">
              No crops are available at the moment. Please check back later.
            </p>
          ) : (
            crops.map((crop) => (
              <div
                key={crop.id}
                className="bg-white w-[300px]   border-zinc-100"
              >
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-[200px] object-cover"
                />
                <div className="flex flex-col p-5">
                  <h4 className="font-bold text-xl mb-2">{crop.name}</h4>
                  <p className="text-lg">Price: {crop.price}</p>
                  {/* <p className="text-md mb-2">Quantity: {crop.quantity}</p> */}
                  <Link
                    to={`/crop/${crop.id}`}
                    className="text-zinc-600  hover:text-green-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <div className="w-full flex py-10 border-y-2  border-zinc-200 items-center  mt-16">
        <h1 className="text-zinc-800 ml-16 text-6xl">
          Dont worry,Just Flamingo
        </h1>
      </div>
    </div>
  );
}

export default Home;
