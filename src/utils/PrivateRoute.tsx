import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { errorMessage } from "./SweetAlertEvent.tsx";
import { AuthCheckFunction } from "./authCheck.tsx";

type Props = {
    authCheck: AuthCheckFunction;
}

const PrivateRoute : React.FC<Props> = ({ authCheck }) => {
    if (authCheck() === 0){
        errorMessage("잘못된 접근입니다..");
        return <Navigate to="/" />
    }
    return <Outlet />;
};

export default PrivateRoute;