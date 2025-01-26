import React from "react";

const WeatherCard = ({ data, darkMode }) => {
  const { name, main, weather } = data;

  return (
    <div
      className={`p-6 rounded-2xl shadow-xl flex flex-col items-center transition-all transform hover:scale-105 ${
        darkMode ? "bg-white text-gray-900" : "bg-gray-900 text-white"
      }`}
    >
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <p className="text-lg font-medium">Temp: {main.temp}°C</p>
      <p className="text-lg capitalize">{weather[0].description}</p>
    </div>
  );
};

export default WeatherCard;
