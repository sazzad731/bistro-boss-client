import PrimaryButton from "../PrimaryButton/PrimaryButton";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({item}) => {
  const { name, image, price, recipe, _id } = item;
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [, refetch] = useCart();


  const handleAddToCart = () => {
    if(user && user.email){
      // send cart item to the database
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price
      }
      axiosSecure
        .post("/carts", cartItem)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Item added successful",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            // refetch cart to update the cart items count
            refetch();
          }
        })
        .catch((error) => {
          Swal.fire({
            title: error,
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }else{
      navigate('/login', {state: {from: location}})
    }
  };
  
  return (
    <div className="card bg-base-100 shadow-xl">
      <p className="text-white absolute top-5 right-5 font-semibold bg-[#111827] px-6 py-3">
        ${price}
      </p>
      <figure>
        <img className="w-full rounded-t-2xl" src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="text-2xl font-semibold text-center">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-center">
          <div onClick={handleAddToCart}>
            <PrimaryButton style="text-[#BB8506] bg-base-200 border-b-[#BB8506] hover:border-b-[#BB8506] hover:bg-[#111827]">
              ADD TO CART
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;