import React, { useEffect, useState } from "react";
import goutam from "../assets/video/goutam.mp4";
import Navbar from "./Layout/Navbar";

const HomeSection = () => {
  const texts = [
    "Welcome to Our Website! ",
    "Innovating the Future",
    "Your Success, Our Mission Explore and Discover",
    "Join the Revolution",
    "Easy way to find your dream property A great platform to buy," ,
    "sell and rent your properties without any agent or commissions."
  ];

  const [currentText, setCurrentText] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        const nextIndex = (currentText + 1) % texts.length;
        setCurrentText(nextIndex);
        setFadeIn(true);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentText, texts]);

  return (
    <section className="relative h-screen w-full">
      {/* Video background */}
      <Navbar />
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
      >
        <source src={goutam} type="video/mp4" />
      </video>

      {/* Text overlay */}
      <div className="absolute top-1/2 left-0 right-0 z-10 flex justify-center items-start h-full px-6">
        <div
          className={`flex flex-col items-center text-white text-center text-m md:text-lg lg:text-xl font-sans transition-opacity duration-1000 ${
            fadeIn ? "opacity-100" : "opacity-0"
          } shadow-lg shadow-blue-750 hover:text-gray-300 hover:shadow-[0px_0px_20px_rgba(255,99,71,0.8)]`}
        >
          <h1 className="text-3xl">{texts[currentText]}</h1>
          <h1 className="text-3xl">{texts[(currentText + 1) % texts.length]}</h1>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
