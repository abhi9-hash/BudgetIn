import React from "react";
import { Alert, Spin } from "antd";

function LoadingBox({ message }) {
  return (
    <Spin
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1000 w-72"
      tip="Loading..."
    >
      <Alert className="w-fit mx-auto my-auto" message={message} type="info" />
    </Spin>
  );
}

export default LoadingBox;
