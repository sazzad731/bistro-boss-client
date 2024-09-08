import FoodCard from "../../../Componets/FoodCard/FoodCard";

const OrderTab = ({ category }) => {
  return (
    <div className="grid grid-col-span-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {category?.map((item) => (
        <FoodCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default OrderTab;