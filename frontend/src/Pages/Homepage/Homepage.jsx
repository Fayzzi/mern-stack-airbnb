// Import necessary dependencies
import axios from "axios";
import { useEffect, useState } from "react";
import "./Homepage.css";
import PlaceCard from "../GridViewHelper/PlaceCard";

// Define the Homepage component
export default function Homepage() {
  // State variables
  const [alldata, setAlldata] = useState([]);
  const [recieved, setRecieved] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(null);

  // useEffect to fetch data on component mount
  useEffect(() => {
    axios
      .get("/")
      .then((response) => {
        const { data } = response;
        setAlldata(data);
        setCurrentSlide(new Array(data.length).fill(0));
      })
      .finally(() => {
        setRecieved(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Render loading message if data is being fetched
  if (alldata.length === 0 && recieved) {
    return (
      <div>
        <h1>No places uploaded</h1>
      </div>
    );
  }

  // Render loading message if data is being fetched
  if (alldata && !recieved) {
    return <div>Loading...</div>;
  }

  // Render the component
  return (
    <>
      <div className="grid px-4 gap-y-7 gap-x-6 mt-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Map through the data and render cards */}
        {alldata &&
          alldata.map((data, index) => (
            <PlaceCard
              currentSlide={currentSlide[index]}
              data={data}
              key={index}
            />
          ))}
      </div>
    </>
  );
}
