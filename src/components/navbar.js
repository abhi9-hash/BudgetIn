import React from "react";
import { Row } from "antd";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const navItemStyle =
    "text-black font-medium text-base mx-2 cursor-pointer pb-0.5 transition-all duration-300";

  const handleMouseEnter = (e) => {
    e.target.style.borderBottom = "2px solid #1890ff";
  };

  const handleMouseLeave = (e) => {
    e.target.style.borderBottom = "none";
  };

  return (
    <Row
      justify="space-between"
      align="middle"
      className="flex flex-row justify-between items-center flex-nowrap fixed top-0 w-full p-5 shadow-md rounded-b-lg bg-white z-50 bg-opacity-70 bg-black p-10"
    >
      <div className="flex justify-center items-center flex-row w-full gap-5">
        <div
          onClick={() => navigate("/home")}
          className={navItemStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          View/Edit Budget
        </div>
        <div
          onClick={() => navigate("/create-budget")}
          className={navItemStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Create Budget
        </div>
      </div>
    </Row>
  );
};

export default Navbar;
