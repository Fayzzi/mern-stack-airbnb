import axios from "axios";
import AccountNavigation from "../AdminPage/AccountNavigation/AccountNavigation";
import { useEffect, useState } from "react";

export default function Favorites() {
  const [favdata, setfavdata] = useState([]);
  const [currentdoc, setcurrentdoc] = useState([]);
  const [gotdata, setgotdat] = useState(false);
  useEffect(() => {
    axios
      .get("/favorite")
      .then(({ data }) => {
        setfavdata(data);
        setcurrentdoc(new Array(data.length).fill(0));
      })
      .then(() => {
        setgotdat(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function newSlide(index) {
    setcurrentdoc((prev) => {
      const newararray = [...prev];
      newararray[index] =
        newararray[index] === favdata[index].FavPlace.photos.length - 1
          ? 0
          : newararray[index] + 1;

      return newararray; // Add the return statement here
    });
  }

  function prevosSlide(index) {
    setcurrentdoc((prev) => {
      const newararray = [...prev];
      newararray[index] =
        newararray[index] === 0
          ? favdata[index].FavPlace.photos.length - 1
          : newararray[index] - 1;

      return newararray; // Add the return statement here
    });
  }
  if (!gotdata) {
    return (
      <>
        <AccountNavigation />
        <span className="mt-2">...Loading</span>
      </>
    );
  }
  return (
    <div>
      <AccountNavigation />
      {favdata.length === 0 && (
        <div className="bg-gray-300 p-2 px-4 my-3 rounded-lg text-lg ">
          You Have {favdata.length.toString()} place added in your Favorites.
        </div>
      )}
      {favdata.length === 1 && (
        <div className="bg-gray-300 p-2 px-4 my-3 rounded-lg text-lg ">
          You Have {favdata.length.toString()} place added in your Favorites.
        </div>
      )}
      {favdata.length > 1 && (
        <div className="bg-gray-300 p-2 px-4 my-3 rounded-lg text-lg ">
          You Have {favdata.length.toString()} places added in your Favorites.
        </div>
      )}
      <div className="mt-2">
        {favdata.length > 0 &&
          favdata.map((d, index) => (
            <div
              className="bg-gray-300 cursor-default mt-3 gap-2 justify-between items-center  flex py-2 px-4 rounded-md"
              key={d._id}
            >
              {
                //images slider
                <div>
                  <div className="relative accpho overflow-hidden shrink-0 cursor-pointer">
                    <div
                      className="aspect-square md:w-44 w-32 lg:w-48 rounded-lg transition-[background] duration-500 ease-linear bg-cover bg-center"
                      style={{
                        backgroundImage: `url(http://localhost:3000/uploads/${
                          d.FavPlace.photos[currentdoc[index]]
                        })`,
                      }}
                    />

                    <div className="absolute transition-all  duration-1000 ease-in-out sonpho top-[50%] lg:opacity-0  flex justify-between w-full">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          prevosSlide(index);
                        }}
                        className="bg-white rounded-full p-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="md:w-6 w-2 h-2 text-black  lg:w-6 lg:h-6 md:h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          newSlide(index);
                        }}
                        className="bg-white rounded-full p-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="md:w-6 w-2 h-2 text-black  lg:w-6 lg:h-6 md:h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              }
              <div className="p-4">
                <h2 className="md:text-xl text-[.8rem] lg:text-[1.2rem] line-clamp-2 md:line-clamp-3 lg:line-clamp-3 font-semibold mb-2">
                  {d.FavPlace.title}
                </h2>
                <p className="text-gray-600 text-[.7rem] md:text-[.9rem] lg:text-[1.1rem] line-clamp-2 md:line-clamp-3 lg:line-clamp-3">
                  {d.FavPlace.description}
                </p>
                <h3 className="text-green-500 font-semibold mt-2">
                  {"$" + d.FavPlace.price + " per night"}
                </h3>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
