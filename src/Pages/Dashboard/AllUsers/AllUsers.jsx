import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../../Componets/SectionHeader/SectionHeader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users=[], refetch } = useQuery({
    queryKey: [ "users" ],
    queryFn: async()=>{
      const res = await axiosSecure.get("/users");
      return res.data;
    }
  })

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`)
      .then(res =>{
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Role changed success",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      })
  };

  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
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
      <SectionHeader heading="MANAGE ALL USERS" subHeading="How many??" />
      <div className="bg-white md:w-[992px] mx-auto p-12">
        <h2 className="text-3xl font-bold uppercase mb-9">
          Total Users: {users?.length}
        </h2>

        <div className="overflow-x-auto  rounded-t-xl">
          <table className="table">
            {/* head */}
            <thead className="bg-[#D1A054] text-base text-white uppercase">
              <tr>
                <th></th>
                <th>Name</th>
                <th>EMAIL</th>
                <th>ROLE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr className="text-base" key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn bg-[#D1A054] hover:bg-[#D1A054] text-white"
                      >
                        <FaUsers className="w-6 h-6" />
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn bg-red-500 hover:bg-red-400 text-white"
                    >
                      <FaTrashAlt className="w-6 h-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
