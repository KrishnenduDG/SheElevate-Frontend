import { FcGoogle } from "react-icons/fc";

const GoogleSignInButton = ({ onClick }) => {
  return (
    <button
      className="flex items-center justify-center bg-white text-gray-500 rounded-md shadow-md h-9 px-4 cursor-pointer transition duration-300 hover:bg-gray-100"
      onClick={onClick}
    >
      <FcGoogle className="mr-[8]" size={22} />
      <div className="font-bolder transform-none">Login</div>
    </button>
  );
};

export default GoogleSignInButton;
