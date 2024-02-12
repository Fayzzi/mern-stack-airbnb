import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function PopUpHelper({
  currentSlide,

  data,
  setPopUp,
}) {
  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(currentSlide);

  const previousImage = () => {
    const newIndex = (imageIndex - 1 + data.photos.length) % data.photos.length;
    setImageIndex(newIndex);
  };

  const nextImage = () => {
    const newIndex = (imageIndex + 1) % data.photos.length;
    setImageIndex(newIndex);
  };

  const handlenavigation = (e) => {
    e.preventDefault();
    setPopUp(false);
    navigate("/details/" + data._id);
    window.location.reload();
  };

  return (
    <div className="w-screen flex justify-center items-center z-[1] h-screen fixed top-0 left-0">
      <div className="w-[95%] relative md:w-[85%] lg:w-[90%] h-[90%] xl:w-[70%] overflow-y-scroll shadow-md border bg-white rounded-md p-5">
        <div className="absolute top-1 right-2">
          <RxCross1
            size={30}
            onClick={() => {
              setPopUp(false);
            }}
            className="z-[1]"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-[50%] w-full ">
            <div className="group relative">
              <div
                className="rounded-lg transition-[background] duration-500 ease-linear bg-cover bg-center  w-full h-96 "
                style={{
                  backgroundImage: `url(http://localhost:3000/uploads/${data.photos[imageIndex]})`,
                }}
              />
              <div className="w-full md:opacity-0 group-hover:opacity-[1] transition duration-500 ease-in-out flex justify-between absolute top-[50%]">
                <button
                  onClick={previousImage}
                  className="bg-gray-50 p-5 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <button
                  onClick={nextImage}
                  className="bg-gray-50 p-5 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="absolute md:opacity-0 group-hover:opacity-[1] transition duration-500 ease-in-out w-fit bottom-3 bg-black p-2 items-center flex rounded-full  left-0 right-0 m-auto">
                {data.photos.length > 1 && (
                  <div className="flex gap-1">
                    {data.photos.map((_, dots) => (
                      <div
                        key={dots}
                        className={`h-2 w-2 rounded-full ${
                          dots === imageIndex ? "bg-white" : "bg-gray-800"
                        } `}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex mt-6 items-center gap-2">
              <div className="h-10 w-10 rounded-full">
                <img
                  className="rounded-full h-full w-full object-cover"
                  src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt=""
                />
              </div>
              <h1 className="select-none">
                {" "}
                Hosted By <b>{data.ownername}</b>
              </h1>
            </div>
            <div className="flex mt-5 flex-col gap-3">
              <div>
                <h1 className=" select-none font-semibold text-[17px]">
                  {data.ownername} is offering
                </h1>
                <div className="flex mt-1 flex-col gap-2">
                  {data.perks &&
                    data.perks.map((p, i) => (
                      <h1 key={i} className="select-none">
                        {i + 1}) {p}
                      </h1>
                    ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-1.5">
              <b className="select-none">House Rules</b>
              <div className="select-none">
                CheckIn Before:<b>{data.checkIn}</b>
              </div>
              <div className="select-none">
                CheckOut After: <b>{data.CheckOut}</b>
              </div>
              <div className="select-none">
                Price Per Night: <b>${data.price}</b>
              </div>
              <div className="select-none">
                Max Guests: <b>{data.MaxGuest}</b>
              </div>
            </div>
          </div>
          <div className="md:w-[50%] w-full md:ml-5">
            <div className="select-none">
              Location:
              <a
                className="underline"
                href={`https://www.google.com/maps/place/${data.address}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.address}
              </a>
            </div>
            <div className="mt-4 ">
              <h1 className="text-lg font-sans font-semibold">Description:</h1>
              <span className="mt-2 select-none text-[17px] leading-7">
                {data.description}
              </span>

              {data.extraInfo && (
                <div>
                  <h1 className="select-none text-lg my-2 font-sans font-semibold">
                    Extra Info:
                  </h1>
                  <span className="my-2 select-none text-[17px] leading-7">
                    {data.extraInfo}
                  </span>
                </div>
              )}
            </div>

            <h1
              onClick={handlenavigation}
              className="mt-5 cursor-pointer text-xl text-blue-500 font-semibold select-none"
            >
              Book This Place?
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
PopUpHelper.propTypes = {
  currentSlide: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  setPopUp: PropTypes.func.isRequired,
};
