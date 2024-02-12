import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Perks from "../../Components/Perks/Perks";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../../Components/Context/UserContext/UserContext";
import AccountNavigation from "../AdminPage/AccountNavigation/AccountNavigation";
import { toast } from "react-toastify";
export default function PlacesFormpage() {
  const [title, setTitle] = useState("");
  const [address, setAdress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [price, setPrice] = useState("");
  const [photoLink, setPhotolink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setperks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkOut, setCheckout] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [error, setError] = useState("");
  const [direct, setRedirect] = useState(false);

  const { user, ready } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    else {
      axios.get("/getSingle/" + id).then(({ data }) => {
        setTitle(data.title);
        setAdress(data.address);
        setDescription(data.description);
        setperks(data.perks);
        setExtraInfo(data.extraInfo);
        setPrice(data.price);
        setCheckin(data.checkIn);
        setMaxGuest(data.MaxGuest);
        setCheckout(data.CheckOut);
        setAddedPhotos(data.photos);
      });
    }
  }, [id]);
  if (!ready) {
    return "Loading...";
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  async function uploadbylink(ev) {
    ev.preventDefault();
    if (photoLink == "") {
      toast.error("Please fill the selected field");
    } else {
      try {
        axios
          .post("/upload-by-link", {
            link: photoLink,
          })
          .then((response) => {
            const { data } = response;
            setAddedPhotos((prev) => {
              return [data, ...prev];
            });
          })
          .finally(() => {
            setPhotolink("");
            setError("");
          });

        // Handle success, e.g., show a success message to the user
      } catch (error) {
        // Handle error, e.g., show an error message to the user
        console.error("Error uploading image:", error);
      }
    }
  }
  function uploadPhoto(event) {
    event.preventDefault();
    const files = event.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }
    console.log([...formData.entries()]);

    axios
      .post("/upload-gallery", formData, {
        headers: {
          "Content-Type": "mulipart/form-data",
        },
      })
      .then((response) => {
        const { data } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...data];
        });
      })
      .finally(() => {
        setError("");
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
        // Handle error, e.g., show an error message to the user
      });
  }
  async function SavePlace(e) {
    e.preventDefault();
    if (id) {
      axios
        .put("/updatePlace/" + id, {
          title: title,
          address: address,
          photos: addedPhotos,
          description: description,
          perks: perks,
          extraInfo: extraInfo,
          checkIn: checkin,
          CheckOut: checkOut,
          MaxGuest: maxGuest,
          price,
        })
        .then(() => {
          setRedirect(true);
        });
    } else {
      axios
        .post("/post-new-place", {
          title: title,
          ownername: user.name,
          address: address,
          photos: addedPhotos,
          description: description,
          perks: perks,
          extraInfo: extraInfo,
          checkIn: checkin,
          CheckOut: checkOut,
          MaxGuest: maxGuest,
          price,
        })
        .then(() => {
          setRedirect(true);
        });
    }
  }
  function selectMain(ev, filename) {
    ev.preventDefault();
    setAddedPhotos([
      filename,
      ...addedPhotos.filter((photo) => photo !== filename),
    ]);
  }
  function removePhoto(ev, filename) {
    ev.preventDefault();
    setAddedPhotos((prev) => prev.filter((photo) => photo !== filename));
  }
  function inputHeading(text) {
    return <h2 className="text-xl select-none font-semibold">{text}</h2>;
  }
  function descriptionHeading(text) {
    return <span className="text-gray-500 select-none text-sm">{text}</span>;
  }
  function preInput(header, des) {
    return (
      <>
        {inputHeading(header)}
        {descriptionHeading(des)}
      </>
    );
  }
  if (direct) {
    return <Navigate to={"/account/places"} />;
  }
  return (
    <>
      <AccountNavigation />
      <div className=" mt-4">
        <form
          onSubmit={SavePlace}
          id="Accomodationform"
          action="submit"
          className=" flex flex-col gap-1"
        >
          {preInput("Title", "Title should be short and catchy")}

          <input
            required
            value={title}
            id="title-field"
            onChange={(ev) => setTitle(ev.target.value)}
            type="text"
            className=""
            placeholder="Enter title"
          />
          {preInput("Address", "Address to this place")}

          <input
            required
            value={address}
            id="address-input"
            onChange={(ev) => {
              setAdress(ev.target.value);
            }}
            className=""
            type="text"
            placeholder="Enter Address to your place"
          />
          {preInput("Photos", "more photos attracts more customers")}

          <div className="flex items-center  gap-3">
            <input
              id="photoes"
              value={photoLink}
              onChange={(ev) => {
                setPhotolink(ev.target.value);
              }}
              type="text"
              className=" "
              placeholder="Add using a link ...jpg"
            />
            <button
              onClick={uploadbylink}
              className="text-white p-2 self-start flex rounded-lg bg-primary"
            >
              Add&nbsp;photo
            </button>
          </div>
          {error && <div className="text-red-500">{error}</div>}

          <div className=" grid gap-2 grid-cols-3 items-center md:grid-cols-4 lg:grid-cols-7 ">
            {addedPhotos.length > 0 &&
              addedPhotos.map((pic) => (
                <div className="relative" key={pic}>
                  <img
                    className="rounded-md  h-[140px]  flex shrink-0 w-full object-cover"
                    src={"http://localhost:3000/uploads/" + pic}
                    alt=""
                  />
                  <button
                    onClick={(ev) => {
                      removePhoto(ev, pic);
                    }}
                    className="absolute p-1 rounded-xl right-1 bottom-1 bg-black opacity-70  text-white"
                  >
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(ev) => {
                      selectMain(ev, pic);
                    }}
                    className="absolute p-1 rounded-xl left-1 bottom-1 bg-black opacity-70  text-white"
                  >
                    {pic === addedPhotos[0] ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
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
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              ))}

            <label
              htmlFor="file-upload"
              className="border h-32 cursor-pointer border-gray-300 bg-transparent flex justify-center rounded-2xl p-8 text-2xl items-center text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              <input
                multiple
                id="file-upload"
                onChange={uploadPhoto}
                type="file"
                className="hidden select-none w-full h-full"
              />
              Upload
            </label>
          </div>
          {preInput("Description", "description to your place")}

          <textarea
            id="des-feild"
            required
            value={description}
            onChange={(ev) => {
              setDescription(ev.target.value);
            }}
            rows={5}
            className="resize-none text-lg leading-8 border border-gray-300 rounded-xl"
          ></textarea>
          {preInput("Perks", "select all the perks of your place")}

          <Perks selected={perks} newselected={setperks} />
          {preInput("Extra info", "house rules etc")}

          <textarea
            id="extra-info"
            value={extraInfo}
            onChange={(ev) => {
              setExtraInfo(ev.target.value);
            }}
            rows={3}
            className="resize-none text-lg leading-8"
          />
          {preInput(
            "CheckIn and CheckOut",
            "Remember to have a time window between room and cleaning the room"
          )}

          <div className="grid gap-2 sm:grid-cols-3 md:grid-cols-4 ">
            <div className="mt-2 -mb-1">
              <h3>CheckIn time</h3>
              <input
                required
                required
                id="checkin"
                value={checkin}
                onChange={(ev) => {
                  setCheckin(ev.target.value);
                }}
                type="text"
                placeholder="14:00"
              />
            </div>
            <div className="mt-2 -mb-1">
              <h3>CheckOut time</h3>
              <input
                required
                required
                id="checkOutTime"
                value={checkOut}
                onChange={(ev) => {
                  setCheckout(ev.target.value);
                }}
                type="text"
                placeholder="16:00"
              />
            </div>
            <div className="mt-2 -mb-1">
              <h3>Max Number of guests</h3>
              <input
                required
                required
                id="max-guests"
                value={maxGuest}
                onChange={(ev) => {
                  setMaxGuest(ev.target.value);
                }}
                type="number"
                placeholder="3"
              />
            </div>
            <div className="mt-2 -mb-1">
              <h3>Price per Night</h3>
              <input
                required
                required
                value={price}
                id="price-field"
                onChange={(ev) => setPrice(ev.target.value)}
                type="text"
                className=""
                placeholder="Enter Price"
              />
            </div>
          </div>

          <button className="bg-primary p-2 my-2 text-white rounded-lg">
            {" "}
            Save
          </button>
        </form>
      </div>
    </>
  );
}
