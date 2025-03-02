import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "400px" }}>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
