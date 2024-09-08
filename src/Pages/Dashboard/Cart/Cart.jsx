import Swal from "sweetalert2";
import SectionHeader from "../../../Componets/SectionHeader/SectionHeader";
import useCart from "../../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <div className="bg-base-200 w-full min-h-screen pt-14 pb-20">
      <SectionHeader heading="WANNA ADD MORE?" subHeading="My Cart" />
      <div className="bg-white md:w-[992px] mx-auto p-14">
        <div className="flex items-center justify-evenly mb-9">
          <h2 className="text-3xl font-bold uppercase">
            Total orders: {cart?.length}
          </h2>
          <h2 className="text-3xl font-bold uppercase">
            total price: {totalPrice}
          </h2>
          {cart.length ? (
            <Link to="/dashboard/payment">
              <button className="btn bg-[#D1A054] text-xl font-bold uppercase">
                Pay
              </button>
            </Link>
          ) : (
            <button disabled={!cart.length} className="btn bg-[#D1A054] text-xl font-bold uppercase">
              Pay
            </button>
          )}
        </div>

        <div className="overflow-x-auto rounded-t-xl">
          <table className="table">
            {/* head */}
            <thead className="bg-[#D1A054]">
              <tr className="uppercase text-white text-base font-semibold">
                <th></th>
                <th>image</th>
                <th>name</th>
                <th>price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>{item.name}</p>
                  </td>
                  <td>${item.price}</td>
                  <th>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn bg-red-500 hover:bg-red-400 text-white"
                    >
                      <FaTrashAlt className="w-6 h-6" />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
