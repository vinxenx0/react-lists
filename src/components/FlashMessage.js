import React from "react";

const FlashMessage = ({ message }) => {
  return (
    <div className="alert alert-warning alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3" role="alert" style={{ zIndex: 1050 }}>
      {message}
    </div>
  );
};

export default FlashMessage;
