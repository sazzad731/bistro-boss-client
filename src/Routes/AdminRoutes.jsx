import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoutes = ({children}) => {
  const { user, isLoading } = useAuth();
  const [ isAdmin, isAdminLoading ] = useAdmin();
  const location = useLocation();
  
  if (isLoading || isAdminLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{from: location}} replace/>
};

export default AdminRoutes;