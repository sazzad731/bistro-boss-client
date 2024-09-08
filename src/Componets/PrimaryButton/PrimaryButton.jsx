import { Link } from "react-router-dom";

const PrimaryButton = ({children, style, path}) => {
  return (
    <Link to={path === undefined ? "" : path} className={`btn border-b-2 text-xl uppercase ${style}`}>
      {children}
    </Link>
  );
};

export default PrimaryButton;