import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../ComponentsPages/BookingWidget";

export default function DetailsPage() {
  const { id } = useParams();
  const [singledoc, setSingledoc] = useState();
  const [showallphotos, setShowAllPhotos] = useState(false);
  useEffect(() => {
    if (!id) return;
    else {
      axios
        .get("/getSingle/" + id)
        .then((response) => {
          const { data } = response;
          setSingledoc(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);
  if (!singledoc) return "...Loading"; //doc will be null while fetching the data
  if (showallphotos) {
    return (
      <div className="absolute bg-black text-white inset-0 min-h-screen ">
        <div>
          <button
            onClick={() => setShowAllPhotos(false)}
            className="flex items-center left-2 gap-1 fixed text-white bg-black p-2 justify-center my-2 rounded-2xl"
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
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>

        <div className="bg-black gap-1 flex flex-wrap">
          {singledoc.photos.length > 0 ? (
            singledoc.photos.map((photo, index) => (
              <div key={index} className="p-3 w-screen md:w-screen lg:w-1/4">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={`http://localhost:3000/uploads/${photo}`}
                  alt={`Photo ${index + 1}`}
                />
              </div>
            ))
          ) : (
            <p>No photos available</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-white grow">
      {" "}
      <h1 className="md:text-3xl lg:text-3xl text-2xl my-2 p-2 font-semibold block">
        {singledoc.title}
      </h1>
      <a
        className="font-semibold inline-flex underline"
        target="_blank"
        rel="noreferrer"
        href={"http://maps.google.com/?q=" + singledoc.address}
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
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        {singledoc.address}
      </a>
      <div className="relative  ">
        {singledoc.photos.length >= 3 && (
          <div className="grid mt-2 rounded-3xl overflow-hidden grid-cols-[1fr_1fr] gap-2 md:grid-cols-[2fr_1fr]">
            <div className="min-h-full">
              {singledoc.photos?.[0] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="cursor-pointer  w-full h-full object-cover"
                  src={"http://localhost:3000/uploads/" + singledoc.photos[0]}
                  alt=""
                />
              )}
            </div>
            <div className="min-h-full flex flex-col">
              {singledoc.photos?.[1] && (
                <div className="flex-1">
                  <img
                    onClick={() => setShowAllPhotos(true)}
                    className="cursor-pointer w-full h-full object-cover overflow-hidden"
                    src={"http://localhost:3000/uploads/" + singledoc.photos[1]}
                    alt=""
                  />
                </div>
              )}
              {singledoc.photos?.[2] && (
                <div className="flex-1 overflow-hidden">
                  <img
                    onClick={() => setShowAllPhotos(true)}
                    className="cursor-pointer w-full h-full object-cover relative top-2"
                    src={"http://localhost:3000/uploads/" + singledoc.photos[2]}
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {singledoc.photos.length === 2 && (
          <div className="grid mt-2 rounded-3xl overflow-hidden gap-2 grid-cols-[1fr_1fr]">
            <div className="min-h-full">
              {singledoc.photos?.[0] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="cursor-pointer w-full h-full object-cover"
                  src={"http://localhost:3000/uploads/" + singledoc.photos[0]}
                  alt=""
                />
              )}
            </div>
            <div className="min-h-full flex flex-col">
              {singledoc.photos?.[1] && (
                <div className="flex-1">
                  <img
                    onClick={() => setShowAllPhotos(true)}
                    className="cursor-pointer w-full h-full object-cover overflow-hidden"
                    src={"http://localhost:3000/uploads/" + singledoc.photos[1]}
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {singledoc.photos.length === 1 && (
          <div className="grid mt-2 rounded-3xl overflow-hidden gap-2 grid-cols-1">
            <div className="min-h-full">
              {singledoc.photos?.[0] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="cursor-pointer w-full h-full object-cover"
                  src={"http://localhost:3000/uploads/" + singledoc.photos[0]}
                  alt=""
                />
              )}
            </div>
          </div>
        )}

        {singledoc.photos.length > 3 && (
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute flex gap-1 p-2 rounded-2xl bottom-1 right-1 bg-black text-white"
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
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <div className="text-[.8rem] md:text-[.9rem] lg:text-[1rem]">
              {" "}
              Show more photos
            </div>
          </button>
        )}
      </div>
      <div className=" my-8 border-t border-b p-2 border-gray-300 max-h-48 overflow-hidden">
        <div className=" max-w-fit  items-center  gap-4 flex ">
          <img
            className="w-14 h-14 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
          />
          <span>
            Hosted by
            <b> {singledoc.ownername}</b>
          </span>
        </div>
      </div>
      <div
        key={"mygrid"}
        className="grid my-10 gap-8 grid-cols-1 lg:grid-cols-[2fr_1fr]"
      >
        <div className="ml-1">
          {singledoc.perks.length > 0 && (
            <h2 className="font-semibold mb-2  text-2xl">
              What this place offers
            </h2>
          )}
          {singledoc.perks.length > 0 &&
            singledoc.perks.map((perk) => (
              <div className="p-2  border-b" key={perk}>
                {perk === "wifi" && (
                  <div className="flex gap-1 p-2 items-center">
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
                        d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                      />
                    </svg>
                    wifi
                  </div>
                )}
                {perk === "parking" && (
                  <div className="flex gap-1 p-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-car"
                    >
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                      <circle cx="7" cy="17" r="2" />
                      <path d="M9 17h6" />
                      <circle cx="17" cy="17" r="2" />
                    </svg>
                    parking
                  </div>
                )}
                {perk === "Tv" && (
                  <div className="flex gap-1 p-2 items-center">
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
                        d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>
                    Tv
                  </div>
                )}
                {perk === "Radio" && (
                  <div className="flex gap-1 p-2 items-center">
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
                        d="M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z"
                      />
                    </svg>
                    Radio
                  </div>
                )}
                {perk === "Pets" && (
                  <div className="flex gap-1 p-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-cat"
                    >
                      <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
                      <path d="M8 14v.5" />
                      <path d="M16 14v.5" />
                      <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
                    </svg>
                    Pets allowance
                  </div>
                )}
                {perk === "entrance" && (
                  <div className="flex gap-1 p-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-venetian-mask"
                    >
                      <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z" />
                      <path d="M6 11c1.5 0 3 .5 3 2-2 0-3 0-3-2Z" />
                      <path d="M18 11c-1.5 0-3 .5-3 2 2 0 3 0 3-2Z" />
                    </svg>
                    Private Entrance
                  </div>
                )}
              </div>
            ))}
          <div className=" mt-8 ">
            <div>
              <div className="text-justify mb-2">
                <h2 className="font-semibold mb-2  text-2xl">
                  About This place
                </h2>
                <p>{singledoc.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block lg:block">
          <BookingWidget doc={singledoc} />
        </div>
      </div>
      <div className="grid my-8 grid-cols-1 ">
        <div className=" flex flex-col">
          <h2 className="font-semibold mb-2  text-2xl">Things to know</h2>
          <h2 className="font-semibold my-2  text-[1rem] text-black">
            House Rules
          </h2>
          <div>
            <span>Check In after: </span>
            <b>{singledoc.checkIn}</b>
          </div>

          <div>
            {" "}
            <span>Check Out after: </span>
            <b>{singledoc.CheckOut}</b>
          </div>
          <div>
            <span>Max numbers of guest: </span>
            <b>{singledoc.MaxGuest}</b>
          </div>
        </div>
      </div>
      {singledoc?.extraInfo && (
        <div className="bg-gray-100 md:-mx-24 lg:-mx-56 p-2 mt-4 -mx-3 border-t shadow-inner ">
          <div className="md:px-24 lg:px-56  mt-2  flex flex-col gap-3">
            <h1 className="mt-2  font-semibold text-2xl">
              More about this place
            </h1>
            <span className="text-gray-700  text-justify text-md leading-6 ">
              {singledoc.extraInfo}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
