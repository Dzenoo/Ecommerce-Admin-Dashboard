import React from "react";
import Button from "../Form/Button";

import Modal from "./Modal";

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Greska!"
      show={props.show}
      footer={<Button onClick={props.onClear}>Ok</Button>}
    >
      <h2>{props.error}</h2>
    </Modal>
  );
};

export default ErrorModal;
