import { Helmet } from "react-helmet-async";
import Cover from "../../Componets/Cover/Cover";
import menuImage from "../../assets/menu/banner3.jpg";
import dessertBg from "../../assets/menu/dessert-bg.jpeg";
import pizzaBg from "../../assets/menu/pizza-bg.jpg";
import saladBg from "../../assets/menu/salad-bg.jpg";
import soupBg from "../../assets/menu/soup-bg.jpg";
import useMenu from "../../hooks/useMenu";
import SectionHeader from "../../Componets/SectionHeader/SectionHeader";
import MenuCategory from "./MenuCategory/MenuCategory";

const Menu = () => {
  const [menu] = useMenu();
  const offered = menu.filter((item) => item.category === "offered");
  const dessert = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");

  return (
    <>
      <Helmet>
        <title>Bistro Boss - Menu</title>
      </Helmet>
      <section className="mb-11">
        <Cover
          styleDetail="text-2xl font-semibold"
          bgImage={menuImage}
          title="OUR MENU"
          titleStyle="text-7xl"
          detail="Would you like to try a dish?"
        />
        <SectionHeader subHeading="Don't miss" heading="TODAY'S OFFER" />
        <MenuCategory
          items={offered}
          category="salad"
          btnText="ORDER YOUR FAVOURITE FOOD"
        />
      </section>

      {/* DESSERTS */}
      <section className="mb-11">
        <Cover
          styleDetail="font-semibold"
          bgImage={dessertBg}
          title="dessert"
          titleStyle="text-4xl"
          detail="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        />
        <MenuCategory
          items={dessert}
          category="dessert"
          btnText="ORDER YOUR FAVOURITE DESSERT"
        />
      </section>

      {/* PIZZA */}
      <section className="mb-11">
        <Cover
          styleDetail="font-semibold"
          bgImage={pizzaBg}
          title="pizza"
          titleStyle="text-4xl"
          detail="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        />
        <MenuCategory
          items={pizza}
          category="pizza"
          btnText="ORDER YOUR FAVOURITE PIZZA"
        />
      </section>

      {/* SALADS */}
      <section className="mb-11">
        <Cover
          styleDetail="font-semibold"
          bgImage={saladBg}
          title="salad"
          titleStyle="text-4xl"
          detail="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        />
        <MenuCategory
          items={salad}
          category="salad"
          btnText="ORDER YOUR FAVOURITE SALAD"
        />
      </section>

      {/* SOUPS */}
      <section className="mb-11">
        <Cover
          styleDetail="font-semibold"
          bgImage={soupBg}
          title="soup"
          titleStyle="text-4xl"
          detail="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        />
        <MenuCategory
          items={soup}
          category="soup"
          btnText="ORDER YOUR FAVOURITE SOUP"
        />
      </section>
    </>
  );
};

export default Menu;
