import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import PropTypes from "prop-types";
import { UserContext } from "../../Components/Context/UserContext/UserContext";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
export default function BookingWidget({ doc }) {
  const { user } = useContext(UserContext);
  const [checkin, setCheckin] = useState("");
  const [name, setName] = useState("");
  const [checkOut, setCheckout] = useState("");
  const [guest, setGuest] = useState(1);
  const [mobile, setMobile] = useState("");
  const [red, setr] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberofdays = 0;
  if (checkOut && checkin) {
    numberofdays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkin)
    );
  }
  async function bookthisplace(e) {
    e.preventDefault();
    if (!user) {
      alert("Please login first");
      return;
    } else {
      if (doc.owner === user._id) {
        alert("You cannot book your own place");
      } else {
        axios
          .post("/bookings", {
            place: doc._id,
            price: numberofdays * doc.price,
            checkIn: checkin,
            checkOut: checkOut,
            phone: mobile,
            name: name,
            noOfGuests: guest,
          })
          .then(({ data }) => {
            setr("/account/bookings/" + data._id);
          })
          .catch(() => {});
      }
    }
  }
  if (red) {
    return <Navigate to={red} />;
  }
  return (
    <div className="bg-white sticky top-0 right-0 z-[50] shadow text-center  p-4 rounded-2xl">
      <h1 className="text-xl">Price: ${doc.price}/Per night</h1>
      <div className="border mt-3 rounded-xl">
        <div className="flex">
          <div className="text-start   p-3 ">
            <p>Check In</p>
            <input
              key={"Checkin"}
              value={checkin}
              onChange={(e) => {
                setCheckin(e.target.value);
              }}
              type="date"
            />
          </div>
          <div className="text-start border-l   p-3 ">
            <p>Check Out</p>
            <input
              value={checkOut}
              onChange={(e) => {
                setCheckout(e.target.value);
              }}
              type="date"
            />
          </div>
        </div>
        <div className="text-start border-t  p-3 ">
          <p>Number of guests</p>
          <input
            onChange={(e) => {
              setGuest(e.target.value);
            }}
            value={guest}
            type="number"
          />
        </div>
        {numberofdays > 0 && (
          <>
            <div className="text-start border-t  px-3 ">
              <p>Complete name</p>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
              />
            </div>
            <div className="text-start  px-3 ">
              <p>Complete Phone</p>
              <input
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
                value={mobile}
                type="tel"
              />
            </div>
          </>
        )}
      </div>
      <button
        onClick={bookthisplace}
        className="bg-primary p-2 rounded-full text-white w-full mt-3"
      >
        Book this place $
        {numberofdays > 0 && <span>{numberofdays * doc.price}</span>}
      </button>
    </div>
  );
}
BookingWidget.propTypes = {
  doc: PropTypes.object.isRequired, // Adjust the prop type based on the actual type
};
