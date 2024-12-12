import { userLabel } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";
import Navbar from "@/components/Navbar/Navbar";

const HomePage = () => {
  const { isAuthLoading, registeredEntity } = useAuth();
  const navigate = useNavigate();

  const images = [
    "/src/Pages/Images/Image1.jpeg",
    "/src/Pages/Images/Image2.jpeg",
    "/src/Pages/Images/Image3.jpeg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reduce image sliding speed to 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (isAuthLoading) return;

    registeredEntity &&
      (registeredEntity.type === userLabel
        ? navigate(`/user/${registeredEntity.profile.username}`)
        : navigate("/business"));
  }, [isAuthLoading]);

  return (
    <>
      <div className="bg-gradient-to-r from-violet-950 to-black relative">
        <div className="flex py-9">
          <h1 className="text-white font-serif text-3xl mt-12 z-0 leading leading-relaxed text-center capitalize py-5 text-wrap">
            Each time a woman stands up for herself,
            <br /> without knowing it possibly,
            <br /> without claiming it,
            <br />
            she stands up for all women.
            <br />
            <h2 className="text-2xl"> -Maya Angelou</h2>
          </h1>
        </div>
        <div className="flex justify-center items-center gap-2">
          <p className="text-2xl text-white">A platform to </p>
          <ReactTyped
            strings={[
              "Showcase your art ...",
              "Connect to investors...",
              "Uphold craftsmanship...",
            ]}
            typeSpeed={40}
            backSpeed={50}
            loop
            className="text-2xl font-bold text-[#99ddff]"
          />
        </div>

        {/* Sliding Picture Animation */}
        <div className="absolute top-20 right-20 w-80 h-80">
          <img
            src={images[currentImageIndex]}
            alt="Sliding Animation"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="mt-24 w-full leading-none rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-24"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </div>

      {/* About Us Section */}
      <div id="about" className="py-20">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-5xl font-bold text-violet-900 mb-6">About Us</h2>
          <p className="text-2xl text-gray-700 leading-relaxed">
            SheElevate is a platform dedicated to empowering skilled women in
            rural areas by connecting them with local business owners and shop
            keepers. Women who are proficient or skilled in any work, often lack
            the support and a platform where their work is appreciated and
            eventually the skill is either shut in a vault or just wasted. By
            enabling women to showcase their crafts and skills, we contribute to
            building a sustainable and inclusive society. SheElevate empowers
            women financially and even acts as a centre of empowerment which not
            only benefits them but also common people who can easily access
            items from them. Through this initiative, we aim to bridge the gap
            between talent and opportunity, fostering creativity and economic
            growth.
          </p>
        </div>
      </div>

      {/* Contact Us Section */}
      <div
        id="contact"
        className="py-20  pt-0 bg-gradient-to-r from-violet-950 to-black relative text-white"
      >
        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#ffffff"
            d="M 0 0 L 0 160 L 30 176 C 60 192 120 223.99922 180 234.69922 C 240 244.99922 300 235.00078 360 213.30078 C 420 192.00078 480 160 540 176 C 600 192 660 256.00078 720 245.30078 C 780 235.00078 840 148.99922 900 106.69922 C 960 63.999219 1020 64.000781 1080 85.300781 C 1140 107.00078 1200 149.00078 1260 181.30078 C 1320 213.00078 1380 235.00078 1410 245.30078 L 1440 256 L 1440 0 L 0 0 z "
          />
        </svg>

        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
          <p className="text-lg text-gray-300 mb-8">
            Have any questions or need assistance? We're here to help. Reach out
            to us, and we’ll get back to you promptly!
          </p>
          <form className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none"
              />
            </div>
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none mb-4"
            ></textarea>
            <button
              type="submit"
              className="bg-violet-800 hover:bg-violet-900 text-white py-3 px-8 rounded-lg text-lg font-bold transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HomePage;
