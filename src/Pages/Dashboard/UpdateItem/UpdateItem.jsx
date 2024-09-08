import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTIN_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const {name, category, recipe, price, _id} = useLoaderData()
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    // image upload to imgbb and then get an url
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      if (menuRes.data.modifiedCount > 0) {
        // reset();
        Swal.fire({
          title: `${data.name} updated successfull`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  
  return (
    <div className="py-12">
      <h2 className="text-center text-4xl uppercase">UPDATE ITEM</h2>
      <div className="xl:w-[992px] mx-auto bg-base-200 p-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* recipe name input field */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-xl font-semibold">
                Recipe name*
              </span>
            </div>
            <input
              type="text"
              defaultValue={name}
              {...register("name", { required: true })}
              placeholder="Recipe name"
              className="input input-bordered w-full"
            />
          </label>
          <div className="flex flex-col xl:flex-row items-center xl:gap-6">
            {/* category input field */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-xl font-semibold">
                  Category*
                </span>
              </div>
              <select
                defaultValue={category}
                className="select select-bordered"
                {...register("category", { required: true })}
              >
                <option disabled value="default">
                  Select a Category
                </option>
                <option value="salad">salad</option>
                <option value="pizza">pizza</option>
                <option value="soups">soup</option>
                <option value="desserts">dessert</option>
                <option value="drinks">drinks</option>
              </select>
            </label>

            {/* price input field */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-xl font-semibold">Price*</span>
              </div>
              <input
                type="number"
                defaultValue={price}
                {...register("price")}
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          {/* recipe details input field */}
          <label className="form-control">
            <div className="label">
              <span className="label-text text-xl font-semibold">
                Recipe Details*
              </span>
            </div>
            <textarea
              {...register("recipe", { required: true })}
              defaultValue={recipe}
              className="textarea textarea-bordered h-24"
              placeholder="Recipe Details"
            ></textarea>
          </label>
          {/* file input field */}
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input w-full max-w-xs block mt-6"
          />
          {/* submit button */}
          <button
            type="submit"
            className="btn mt-8 bg-gradient-to-r from-[#835D23] to-[#B58130] text-white text-xl font-bold"
          >
            Update Recipe Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;