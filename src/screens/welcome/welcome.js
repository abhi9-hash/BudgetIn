import React from "react";
import { Button } from "antd";
import "./welcome.css";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
  };
  return (
    <div className="welcome-container">
      <Navbar />
      <div className="welcome-content text-center bg-opacity-100 bg-black p-1000 rounded-lg">
        <h1 className="text-4xl text-white mb-4">Welcome to BudgetIn !</h1>
        <Button type="primary" onClick={handleClick}>
          Get started
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
