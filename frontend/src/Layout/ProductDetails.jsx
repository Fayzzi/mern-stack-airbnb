import { Outlet } from "react-router-dom";
import ProductDetailsHeader from "../Pages/Details Page/ProductDetailsHeader";

export default function ProductDetails() {
  return (
    <div className="md:mx-24 min-h-screen  lg:mx-56  mx-3 ">
      <ProductDetailsHeader />
      <Outlet />
    </div>
  );
}
