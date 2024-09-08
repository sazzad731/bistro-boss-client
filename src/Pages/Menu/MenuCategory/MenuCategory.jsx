import MenuItem from "../../../Componets/MenuItem/MenuItem";
import PrimaryButton from "../../../Componets/PrimaryButton/PrimaryButton";

const MenuCategory = ({ items, category, btnText }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 xl:px-0 mb-12">
        {items.map((item) => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
      <div className="flex items-center justify-center">
        <PrimaryButton
          path={`/order/${category === undefined ? "salad" : category}`}
          style="border-b-black hover:border-b-black"
        >
          {btnText}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default MenuCategory;