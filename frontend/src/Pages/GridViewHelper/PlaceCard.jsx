import { useContext, useState } from "react";
import { AiFillHeart, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { UserContext } from "./../../Components/Context/UserContext/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PopUpHelper from "./PopUpWidget/PopUpHelper";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export default function PlaceCard({ currentSlide, data }) {
  const [click, setClick] = useState(false);
  const { user } = useContext(UserContext);
  const [popUp, setPopUp] = useState(false);
  const navigate = useNavigate();

  const ADDtoFavorites = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("please login to continue");
      navigate("/login");
    }
    if (user._id === data.owner) {
      toast.error("You cant add your own place to favorites!!");
    } else {
      axios
        .post("/favorite", {
          FavPlace: data._id,
        })
        .then(() => {
          setClick(!click);
        })
        .catch((e) => toast.error(e.response.data.message));
    }
  };

  const RemoveFromFavorite = (e) => {
    e.preventDefault();
    axios
      .delete("/favorite/" + data._id)
      .then(() => {
        setClick(!click);
      })
      .catch((e) => toast.error(e.response.data.message));
  };

  const togglePopUp = () => {
    setPopUp(!popUp);
  };

  return (
    <div className="w-full rounded-lg relative overflow-hidden pb-2 h-fit">
      <div>
        <Link to={"/details/" + data._id}>
          <img
            className="aspect-square rounded-md w-full h-full object-cover"
            src={"http://localhost:3000/uploads/" + data.photos[0]}
            alt=""
          />
        </Link>
      </div>
      <Link to={"/details/" + data._id}>
        <h1 className="text-[15px] font-bold py-2 ">{data.address}</h1>
        <span className="leading-3 text-base py-2 text-gray-500 ">
          {data.title.length > 50
            ? data.title.slice(0, 50) + "...."
            : data.title}
        </span>
        <h1 className="text-base py-2 text-green-600 font-bold">
          ${data.price} perNight
        </h1>
      </Link>
      <div className="bg-gray-700 rounded-full absolute top-2 right-2 p-2">
        {click ? (
          <AiFillHeart
            className="active:scale-[.9] cursor-pointer "
            onClick={RemoveFromFavorite}
            size={24}
            color="red"
          />
        ) : (
          <AiOutlineHeart
            className="active:scale-[.9] cursor-pointer "
            onClick={ADDtoFavorites}
            size={24}
            color="white"
          />
        )}
      </div>
      <div className="bg-gray-700 rounded-full absolute top-14 right-2 p-2">
        <AiOutlineEye
          onClick={togglePopUp}
          size={24}
          className="cursor-pointer"
          color="white"
        />
      </div>
      {popUp && (
        <PopUpHelper
          data={data}
          currentSlide={currentSlide}
          setPopUp={setPopUp}
        />
      )}
    </div>
  );
}
PlaceCard.propTypes = {
  currentSlide: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  setPopUp: PropTypes.func.isRequired,
};
