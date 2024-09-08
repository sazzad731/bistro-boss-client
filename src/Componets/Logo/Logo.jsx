import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <p className="text-3xl font-bold uppercase">BISTRO BOSS</p>
      <span className="uppercase tracking-[10px]">Restaurant</span>
    </Link>
  );
};

export default Logo;