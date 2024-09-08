
const MenuItem = ({item}) => {
  const { name, image, price, recipe } = item;
  return (
    <div className="flex flex-col lg:flex-row items-center">
      <img
        className="w-[120px] h-[104px] rounded-tl-none rounded-tr-[100%] rounded-br-[100%] rounded-bl-[100%] lg:me-8 mb-5 lg:mb-0 object-cover"
        src={image}
        alt={name}
      />
      <div>
        <h5 className="text-xl uppercase">{name}------------------</h5>
        <p className="text-[#737373]">{recipe}</p>
      </div>
      <div>
        <p className="mb-7 text-xl text-[#BB8506]">${price}</p>
      </div>
    </div>
  );
};

export default MenuItem;