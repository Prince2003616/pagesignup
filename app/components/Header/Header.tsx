'use client';

import { useState } from 'react';
import SignupCard from '../signupCard/signupCard';
import SearchBar from '../searchbar/seachBar'; // Import the SearchBar component

export default function Header() {
  const [showSignupCard, setShowSignupCard] = useState(false);

  const handleSignupClick = () => {
    setShowSignupCard(!showSignupCard);
  };

  return (
    <div>
      {/* Header Section with bg color #FEEFE5 */}
      <div className="flex flex-col md:flex-row justify-between items-center p-8 bg-[#FEEFE5] shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <p className="font-bold text-blue-900 text-2xl md:text-5xl">LearnQuest</p>
        </div>

        {/* Menu and Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
          {/* Menu Options */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <a href="#" className="text-blue-800 hover:text-blue-600 transition-colors text-sm md:text-base">Training</a>
            <a href="#" className="text-blue-800 hover:text-blue-600 transition-colors text-sm md:text-base">Solutions</a>
            <a href="#" className="text-blue-800 hover:text-blue-600 transition-colors text-sm md:text-base">Company</a>
            <a href="#" className="text-blue-800 hover:text-blue-600 transition-colors text-sm md:text-base">Resource Center</a>
            <a href="#" className="text-blue-800 hover:text-blue-600 transition-colors text-sm md:text-base">Partners</a>
            <a href="#" className="text-blue-800 hover:text-blue-600 transition-colors text-sm md:text-base">Trainers</a>
            <a href="#" className="text-blue-800 hover:text-blue-600 transition-colors text-sm md:text-base">Contact Us</a>
          </div>
          {/* Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSignupClick}
              className="bg-[#7FC0AA] text-blue px-4 py-2 rounded-md font-semibold hover:bg-[#6BAE99] transition-colors text-sm md:text-base"
            >
              Sign Up
            </button>
            <button
              className="bg-[#7FC0AA] text-blue px-6 py-2 rounded-md font-semibold hover:bg-[#6BAE99] transition-colors text-sm md:text-base"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* SearchBar Section with bg color #FEEFE5*/}
      <div className="flex justify-center md:justify-end p-4 bg-[#FEEFE5] shadow-md">
        <SearchBar />
      </div>

      {/* Conditionally Render SignupCard */}
      {showSignupCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <SignupCard onClose={() => setShowSignupCard(false)} />
        </div>
      )}
    </div>
  );
}