
const Cover = ({bgImage, title, titleStyle, detail, styleDetail}) => {
  return (
    <div
      className="hero h-[700px] mb-20 px-4 xl:px-0"
      style={{
        backgroundImage: `url("${bgImage}")`,
      }}
    >
      <div className="hero-overlay xl:w-[1080px] h-[400px] bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-4xl text-white">
          <h1 className={`mb-5 font-bold uppercase ${titleStyle}`}>
            {title}
          </h1>
          <p className={`mb-5 ${styleDetail}`}>{detail}</p>
        </div>
      </div>
    </div>
  );
};

export default Cover;