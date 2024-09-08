import Swal from "sweetalert2";
import SectionHeader from "../../../Componets/SectionHeader/SectionHeader";
import { FaTrashAlt } from "react-icons/fa";
import { PiNotePencil } from "react-icons/pi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  const axiosSecure = useAxiosSecure();


  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: `${item.name} has been deleted`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      }
    });
  };
  return (
    <div className="bg-base-200 w-full min-h-screen pt-14 pb-20">
      <SectionHeader heading="MANAGE ALL ITEMS" subHeading="Hurry Up!" />
      <div className="bg-white md:w-[992px] mx-auto p-14">
        <h2 className="text-3xl font-bold uppercase mb-9">
          Total items: {menu.length}
        </h2>

        <div className="overflow-x-auto rounded-t-xl">
          <table className="table">
            {/* head */}
            <thead className="bg-[#D1A054]">
              <tr className="uppercase text-white text-base font-semibold">
                <th></th>
                <th>image</th>
                <th>name</th>
                <th>price</th>
                <th>Edit item</th>
                <th>Delete item</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-20 w-20">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>{item.name}</p>
                  </td>
                  <td>${item.price}</td>
                  <th>
                    <Link to={`/dashboard/updateItem/${item._id}`}
                      className="btn bg-[#D1A054] hover:bg-[#D1A054] text-white"
                    >
                      <PiNotePencil className="w-6 h-6" />
                    </Link>
                  </th>
                  <th>
                    <button
                      onClick={() => handleDelete(item)}
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

export default ManageItems;
