import { useContext, useEffect, useState } from "react";
import AccountNavigation from "../AdminPage/AccountNavigation/AccountNavigation";
import { UserContext } from "../../Components/Context/UserContext/UserContext";
import { differenceInCalendarDays, format } from "date-fns";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./BookingPAge.css";

export default function BookingPage() {
  const { user, ready } = useContext(UserContext);
  const [bookingData, setBookingData] = useState([]);
  const [gotdata, setgotdat] = useState(false);
  const [currentdoc, setCurrentdoc] = useState([]); // Corrected the state variable name
  useEffect(() => {
    axios
      .get("/getmybookings")
      .then(({ data }) => {
        setBookingData(data);
        setCurrentdoc(new Array(data.length).fill(0));
      })
      .then(() => {
        setgotdat(true);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);
  if (!ready) {
    return "Loading...";
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  const prevSlide = (index) => {
    setCurrentdoc((prev) => {
      const newSlides = [...prev];
      newSlides[index] =
        newSlides[index] === 0
          ? bookingData[index].place.photos.length - 1
          : newSlides[index] - 1;
      return newSlides;
    });
  };

  const nextSlide = (index) => {
    setCurrentdoc((prev) => {
      const newSlides = [...prev];
      newSlides[index] =
        newSlides[index] === bookingData[index].place.photos.length - 1
          ? 0
          : newSlides[index] + 1;
      return newSlides;
    });
  };
  if (!gotdata) {
    return (
      <>
        <AccountNavigation />
        <div>...Loading</div>
      </>
    );
  }
  return (
    <div>
      <AccountNavigation />
      <div className="grow">
        {bookingData.length > 0 &&
          bookingData.map(
            (document, index) =>
              document.place && (
                <Link
                  to={"/account/bookings/" + document._id}
                  key={document._id}
                  className="bg-gray-300 grow cursor-pointer mt-3  items-start  flex py-2 px-4 rounded-lg"
                >
                  <div className="relative master">
                    <div
                      className="aspect-square md:w-44 w-32 lg:w-48 rounded-lg shrink-0 transition-[background] duration-500 ease-linear bg-cover bg-center"
                      style={{
                        backgroundImage: `url(http://localhost:3000/uploads/${
                          document.place.photos[currentdoc[index]]
                        })`,
                      }}
                    />
                    {document.place.photos.length > 1 && (
                      <div className="absolute butttonHover transition-all  duration-1000 ease-in-out sonpho top-[50%] lg:opacity-0  flex justify-between w-full">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            nextSlide(index);
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
                            prevSlide(index);
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
                    )}
                  </div>
                  <div className="p-4 grow flex flex-col items-start justify-center ">
                    <h2 className="md:text-xl text-[.8rem] border-b border-gray-400 p-1 lg:text-[1.2rem] line-clamp-2 md:line-clamp-3 lg:line-clamp-3 font-semibold mb-2">
                      {document.place.title}
                    </h2>
                    <div className="text-gray-600 my-2  text-[.7rem] md:text-[.9rem] lg:text-[1.1rem] items-center justify-start flex gap-2 ">
                      <div className="flex">
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
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                          />
                        </svg>
                        {format(new Date(document.checkIn), "dd-MM-yyyy")}
                      </div>
                      &rarr;
                      <div className="flex">
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
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                          />
                        </svg>
                        {format(new Date(document.checkOut), "dd-MM-yyyy")}
                      </div>
                    </div>
                    <p className="text-gray-600 text-[.8rem] flex md:text-[.9rem] lg:text-[1.1rem] gap-2">
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
                          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                        />
                      </svg>
                      {differenceInCalendarDays(
                        new Date(document.checkOut),
                        new Date(document.checkIn)
                      )}{" "}
                      nights
                    </p>

                    <h3 className=" flex text-gray-600 mt-2">
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
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                        />
                      </svg>

                      {"Total Price:$" + document.place.price}
                    </h3>
                  </div>
                </Link>
              )
          )}
        {bookingData.length === 0 && <div>No Bookings</div>}
      </div>
    </div>
  );
}
