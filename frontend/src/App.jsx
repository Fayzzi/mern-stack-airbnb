import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Signupage from "./Pages/SignUp/Signupage";
import axios from "axios";
import AdminPage from "./Pages/AdminPage/AdminPage";
import BookingPage from "./Pages/ComponentsPages/BookingPage";
import Accomadation from "./Pages/ComponentsPages/Accomadation";
import PlacesFormpage from "./Pages/PlacesForm/PlacesFormpage";
import Homepage from "./Pages/Homepage/Homepage";
import DetailsPage from "./Pages/Details Page/DetailsPage";
import ProductDetails from "./Layout/ProductDetails";
import SingleBooking from "./Pages/ComponentsPages/SingleBooking";
import Favorites from "./Pages/FavoritesPage/Favorites";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeroSlider from "./Pages/HeroSlider/HeroSlider";
axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<Signupage />}></Route>
          <Route path="/account" element={<AdminPage />}></Route>
          <Route path="/account/places" element={<Accomadation />}></Route>
          <Route path="/account/bookings" element={<BookingPage />}></Route>
          <Route
            path="/account/bookings/:id"
            element={<SingleBooking />}
          ></Route>
          <Route path="/account/favorites" element={<Favorites />}></Route>
          <Route path="/hero" element={<HeroSlider />}></Route>
          <Route
            path="/account/places/new"
            element={<PlacesFormpage />}
          ></Route>
          <Route
            path="/account/places/:id"
            element={<PlacesFormpage />}
          ></Route>
        </Route>
        <Route path="/details" element={<ProductDetails />}>
          <Route path="/details/:id" element={<DetailsPage />}></Route>
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
