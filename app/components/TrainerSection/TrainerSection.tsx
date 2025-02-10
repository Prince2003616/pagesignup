import React from 'react';
import Breadcrumb from '../BreadCrumb/breadcrumb'; // Adjust the import path as necessary

const TrainerSection = () => {
  // Define the JSON data directly in the component
  const data = {
    trainerSection: {
      title: "Become a LearnQuest Trainer",
      description: "LearneQuest's Trainer Network is comprised of professionals across hundreds of technology disciplines from around the world."
    }
  };

  const { title, description } = data.trainerSection;

  return (
    <div className="w-full bg-[#FEEFE5]">
      {/* Breadcrumb placed above TrainerSection */}
      <Breadcrumb />

      {/* TrainerSection content */}
      <div className="w-full py-12 px-4">
        <div className="max-w-12xl mx-auto text-left px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-blue-700">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainerSection;