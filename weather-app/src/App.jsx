import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import Spinner from "./Spinner";

const App = () => {
  const [location, setLocation] = useState(""); // Stores the user's input location
  const [weatherData, setWeatherData] = useState(null); // Stores fetched weather details
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false); // Tracks theme (light/dark mode)

  const apiKey = "f788fc3674bdc5e3295eae9b1f3e08e2"; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    if (!location.trim()) {
      setError("Please enter a valid location.");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError("Could not fetch data. Please check the location and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`relative w-full h-screen overflow-hidden ${
        darkMode ? "dark-mode" : "light-mode"
      }`}
    >
      {/* Animated Background */}
      <div
        className="area absolute inset-0 -z-10"
        style={{
          background: darkMode
            ? "linear-gradient(to left, rgba(17, 4, 95, 0.8), rgba(0, 0, 50, 0.8))" // Dark Blue Gradient
            : "linear-gradient(to left, #8f94fb, #4e54c8)", // Light Mode Gradient
        }}
      >
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {/* Toggle Switch */}
        <div className="absolute top-5 right-5 flex items-center gap-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleTheme}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200  peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700">
              <div
                className={`w-5 h-5 rounded-full shadow-md transition-transform ${
                  darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              >

          {darkMode ? "🌙" : "☀️"}
              </div>
            </div>
          </label>
          <span className="font-medium">{darkMode ? "Dark Mode" : "Light Mode"}</span>
        </div>

        <h1 className="text-4xl font-bold mb-6">Weather App</h1>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-4 mb-6"
        >
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-3 border border-gray-400 rounded-md w-72 sm:w-96 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold shadow-lg transition-transform transform hover:scale-105"
          >
            Get Weather
          </button>
        </form>

        {/* Spinner or Error Message */}
        {loading && <Spinner />}
        {error && <p className="text-red-500 text-lg font-semibold">{error}</p>}

        {/* Weather Data */}
        {weatherData && <WeatherCard data={weatherData} darkMode={darkMode} />}
      </div>
    </div>
  );
};

export default App;


const fetchWeatherData = async (location) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=YOUR_API_KEY`
    );
    const data = await response.json();
    setWeatherData(data); // Update state with fetched data
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};