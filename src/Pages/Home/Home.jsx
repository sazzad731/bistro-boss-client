import Banner from "./Banner/Banner";
import BistroBoss from "./BistroBoss/BistroBoss";
import Category from "./Category/Category";
import Featured from "./Featured/Featured";
import PopularManu from "./PopularManu/PopularManu";
import Testimonials from "./Testimonials/Testimonials";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Bistro Boss - Home</title>
      </Helmet>
      <Banner />
      <Category />
      <BistroBoss />
      <PopularManu />
      <Featured />
      <Testimonials/>
    </>
  );
};

export default Home;