import React from "react";
import { Row } from "antd";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

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
      className="flex flex-row justify-between items-center flex-nowrap fixed top-0 w-full p-5 shadow-md rounded-b-lg bg-white z-50"
    >
      <div onClick={handleBackClick} className={navItemStyle}>
        {"<<"} Back
      </div>
      <div className="flex justify-center items-center flex-row w-11/12">
        <div
          onClick={() => navigate("/home")}
          className={navItemStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Home
        </div>
        <div
          onClick={() =>
            navigate("/analytics", { state: { type: "workspacesactivity" } })
          }
          className={navItemStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Workspace Activity
        </div>
        <div
          onClick={() =>
            navigate("/analytics", { state: { type: "featureUsage" } })
          }
          className={navItemStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Usage Statistics
        </div>
        <div
          onClick={() =>
            navigate("/analytics", { state: { type: "weeklysignups" } })
          }
          className={navItemStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Weekly Signups
        </div>
      </div>
    </Row>
  );
};

export default Navbar;
