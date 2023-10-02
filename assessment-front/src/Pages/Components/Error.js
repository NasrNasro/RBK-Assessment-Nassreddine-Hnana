import React from "react";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

function Error() {
  const alerts = useSelector((state) => state.alertReducer);
  return (
    <>
      {alerts?.map((alert) => (
        <Alert variant={alert.alertType} className="text-center" key={alert.id}>
          {alert.msg}
        </Alert>
      ))}
    </>
  );
}

export default Error;
