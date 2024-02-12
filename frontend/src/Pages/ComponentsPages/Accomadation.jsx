import { Link, Navigate } from "react-router-dom";
import AccountNavigation from "../AdminPage/AccountNavigation/AccountNavigation";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../Components/Context/UserContext/UserContext";
import "./Acomadation.css";
import { AcomContext } from "../../Components/Context/AcomadationContext/AccomContext";

export default function Accomadation() {
  const { Accomadations, dispatch } = useContext(AcomContext);
  const { user, ready } = useContext(UserContext);
  const [currentdoc, setcurrentDoc] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("/myplaces")
      .then(({ data }) => {
        dispatch({ type: "SHOWALL", payload: data });
        setcurrentDoc(new Array(data.length).fill(0));
      })
      .finally(() => {
        setLoading(true);
      });
  }, [dispatch]);
  if (!ready) {
    return "Loading...";
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  function newSlide(index) {
    setcurrentDoc((prev) => {
      const newararray = [...prev];
      newararray[index] =
        newararray[index] === Accomadations[index].photos.length - 1
          ? 0
          : newararray[index] + 1;

      return newararray; // Add the return statement here
    });
  }

  function prevosSlide(index) {
    setcurrentDoc((prev) => {
      const newararray = [...prev];
      newararray[index] =
        newararray[index] === 0
          ? Accomadations[index].photos.length - 1
          : newararray[index] - 1;

      return newararray; // Add the return statement here
    });
  }
  async function deleteAccomadation(id) {
    try {
      await axios.delete("/delete/" + id);
      dispatch({ type: "DELETE", payload: id });
      alert("Accomandation deleted Successfully!");
    } catch (error) {
      console.error("Error occurred during accommodation deletion: ", error);
    }
  }

  return (
    <div>
      <AccountNavigation />
      <div className="text-center mt-4 ">
        <Link
          to={"/account/places/new"}
          className="inline-flex  gap-2 rounded-full bg-primary text-white py-2 px-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-2 p-3">
        {Accomadations &&
          Accomadations.map((place, index) => (
            <div
              key={place._id}
              className="bg-gray-300 cursor-default mt-3 gap-4 justify-between items-center  flex py-2 px-4 rounded-md"
            >
              <div className="flex rounded-2xl items-center ">
                {place.photos.length > 0 && (
                  <div className="relative accpho overflow-hidden shrink-0 cursor-pointer">
                    <div
                      className="aspect-square md:w-44 w-32 lg:w-48 rounded-lg transition-[background] duration-500 ease-linear bg-cover bg-center"
                      style={{
                        backgroundImage: `url(http://localhost:3000/uploads/${
                          place.photos[currentdoc[index]]
                        })`,
                      }}
                    />

                    <div className="absolute transition-all  duration-1000 ease-in-out sonpho top-[50%] lg:opacity-0  flex justify-between w-full">
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
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                          />
                        </svg>
                      </button>
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
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <h2 className="md:text-xl text-[.8rem] lg:text-[1.2rem] line-clamp-2 md:line-clamp-3 lg:line-clamp-3 font-semibold mb-2">
                    {place.title}
                  </h2>
                  <p className="text-gray-600 text-[.7rem] md:text-[.9rem] lg:text-[1.1rem] line-clamp-2 md:line-clamp-3 lg:line-clamp-3">
                    {place.description}
                  </p>
                  <h3 className="text-green-500 font-semibold mt-2">
                    {"$" + place.price + " per night"}
                  </h3>
                </div>
              </div>

              <div className="flex flex-col gap-5 ">
                <Link to={"/account/places/" + place._id}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 cursor-pointer h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </Link>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteAccomadation(place._id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
