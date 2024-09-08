import { useState } from "react";
import orderBg from "../../assets/order/banner2.jpg"
import Cover from "../../Componets/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../hooks/useMenu";
import OrderTab from "./OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Order = () => {
  const categories = ["salad", "pizza", "soup", "dessert", "drinks"]
  const { category } = useParams();
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [ menu ] = useMenu(); // custom hooks
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const soup = menu.filter((item) => item.category === "soup");
  const dessert = menu.filter((item) => item.category === "dessert");
  const drinks = menu.filter((item) => item.category === "drinks");

  return (
    <section className="mb-24">
      <Helmet>
        <title>Bistro Boss - Order food</title>
      </Helmet>
      <Cover
        bgImage={orderBg}
        title="Order Food"
        titleStyle="text-7xl"
        detail="Would you like to try a dish?"
        styleDetail="text-2xl"
      />
      <div className="px-4 xl:px-0">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList className="uppercase font-bold mb-5">
            <Tab>salad</Tab>
            <Tab>pizza</Tab>
            <Tab>soups</Tab>
            <Tab>desserts</Tab>
            <Tab>drinks</Tab>
          </TabList>

          <TabPanel>
            <OrderTab category={salad} />
          </TabPanel>

          <TabPanel>
            <OrderTab category={pizza} />
          </TabPanel>

          <TabPanel>
            <OrderTab category={soup} />
          </TabPanel>

          <TabPanel>
            <OrderTab category={dessert} />
          </TabPanel>

          <TabPanel>
            <OrderTab category={drinks} />
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
};

export default Order;