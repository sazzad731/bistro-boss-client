import SectionHeader from "../../../Componets/SectionHeader/SectionHeader";
import useMenu from "../../../hooks/useMenu";
import PrimaryButton from "../../../Componets/PrimaryButton/PrimaryButton";
import MenuCategory from "../../Menu/MenuCategory/MenuCategory";

const PopularManu = () => {
  const [ menu ] = useMenu();
  const popular = menu.filter(item => item.category === 'popular');

  return (
    <section className="mb-32 px-3 lg:px-0">
      <SectionHeader heading="FROM OUR MENU" subHeading="Check it out" />
      <MenuCategory items={popular} btnText="View Full Menu" />
    </section>
  );
};

export default PopularManu;