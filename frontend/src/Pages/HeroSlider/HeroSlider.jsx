import axios from "axios";
import React, { useEffect, useState } from "react";

export default function HeroSlider() {
  const [data, setData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios
      .get("/")
      .then(({ data }) => {
        setData(data);
        setCurrentSlide(new Array(data.length).fill(0));
      })
      .then(() => {
        setReady(true);
      });
  }, []);
  const prevSlide = (index) => {
    setCurrentSlide((prev) => {
      const newSlides = [...prev];
      newSlides[index] =
        newSlides[index] === 0
          ? data[index].photos.length - 1
          : newSlides[index] - 1;
      return newSlides;
    });
  };

  const nextSlide = (index) => {
    setCurrentSlide((prev) => {
      const newSlides = [...prev];
      newSlides[index] =
        newSlides[index] === data[index].photos.length - 1
          ? 0
          : newSlides[index] + 1;
      return newSlides;
    });
  };
  return ready === true ? (
    <div className="w-full">
      {data &&
        data.map((d, i) => (
          <div key={i} className="group w-10/12 relative mx-auto">
            <div
              className=" w-full rounded-md overflow-hidden h-[75vh] m-3 bg-no-repeat bg-center bg-cover"
              style={{
                backgroundImage: `url(http://localhost:3000/uploads/${
                  d.photos[currentSlide[i]]
                })`,
              }}
              key={i}
            ></div>
            <div className=" absolute flex w-full justify-between top-[50%]">
              <button
                onClick={() => nextSlide(i)}
                className="p-3 duration-500 ease-in-out transition opacity-0 group-hover:opacity-100  bg-black text-white flex items-center justify-center rounded-md ml-3"
              >
                Next
              </button>
              <button
                onClick={() => prevSlide(i)}
                className="p-3 opacity-0 duration-500 ease-in-out transition group-hover:opacity-100  bg-black text-white flex items-center justify-center rounded-md "
              >
                Prev
              </button>
            </div>
            {d.photos.length > 0 && (
              <div className="absolute bottom-2 transition duration-1000 ease-in-out opacity-0 group-hover:opacity-[1] m-auto w-fit flex items-center bg-black p-2 left-0 right-0 rounded-full">
                {d.photos.map((_, dots) => (
                  <div
                    className={`h-2 w-2  ease-in-out  rounded-full mx-1 ${
                      dots === currentSlide[i] ? "bg-white" : "bg-gray-500"
                    }`}
                    key={dots}
                  ></div>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  ) : (
    <div>...Loading</div>
  );
}
