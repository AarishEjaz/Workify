import React from "react";

const Spinner = () => {
  return (
    <div className="text-center" style={{ marginBottom: "25%" }}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
