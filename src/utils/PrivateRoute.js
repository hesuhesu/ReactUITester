import { Navigate, Outlet } from "react-router-dom";
import { errorMessage } from "./SweetAlertEvent";
import { authCheck } from "./authCheck";

const PrivateRoute = () => {
    if (authCheck() === 0){
        errorMessage("잘못된 접근입니다..");
        return <Navigate to="/" />
    }
    return <Outlet />;
};

export default PrivateRoute;