import chefService from "../../../assets/home/chef-service.jpg"
const BistroBoss = () => {
  return (
    <section className="relative mb-24 hidden xl:block">
      <img src={chefService} alt="background image" />
      <div className=" absolute top-14 left-0 bg-white mx-28 py-24 px-40">
        <h2 className="text-5xl uppercase mb-2 text-center">Bistro Boss</h2>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus, libero accusamus laborum deserunt ratione dolor
          officiis praesentium! Deserunt magni aperiam dolor eius dolore at,
          nihil iusto ducimus incidunt quibusdam nemo.
        </p>
      </div>
    </section>
  );
};

export default BistroBoss;