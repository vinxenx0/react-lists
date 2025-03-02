import React from "react"; 

import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const BaseLayout = ({ children }) => {


  return (
    <div className="d-flex flex-column vh-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow-1 container mt-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <div className="container">
          <p className="mb-0">© 2024 List Manager. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BaseLayout;
