import PrimaryButton from "../../../Componets/PrimaryButton/PrimaryButton";
import SectionHeader from "../../../Componets/SectionHeader/SectionHeader";
import featuredImg from "../../../assets/home/featured.jpg"
import "./Featured.css"
const Featured = () => {
  return (
    <section className="bg-img bg-fixed mb-32">
      <div className="bg-gradient-to-r from-slate-950 py-20 px-4 md:px-36">
        <SectionHeader
          className="text-white"
          heading="FROM OUR MENU"
          subHeading="Check it out"
        />
        <div className="flex flex-col xl:flex-row items-center justify-between gap-16">
          <img className="xl:w-1/2" src={featuredImg} alt="Image" />
          <div className="text-white">
            <p className="text-xl">March 20, 2023</p>
            <h4 className="text-2xl uppercase">WHERE CAN I GET SOME?</h4>
            <p className="text-lg mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              voluptate facere, deserunt dolores maiores quod nobis quas quasi.
              Eaque repellat recusandae ad laudantium tempore consequatur
              consequuntur omnis ullam maxime tenetur.
            </p>
            <PrimaryButton style="border-b-white hover:border-b-white btn-ghost">
              Read More
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;