import React, { useState } from "react";
import { Alert } from "antd";

const ErrorBox = ({ message }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1000 w-72">
          <Alert
            message="Error"
            description={message}
            type="error"
            showIcon
            closable
            onClose={handleClose}
          />
        </div>
      )}
    </>
  );
};

export default ErrorBox;
