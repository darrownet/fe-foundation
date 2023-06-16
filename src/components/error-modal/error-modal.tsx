import React from "react";
import {useSelector} from "react-redux";
import {IInitialState} from "../../core/store";

const ErrorModal = () => {

  const error: any | undefined = useSelector((state: IInitialState) => state.app.error) || undefined;

  if (error) {
    return (
      <div className="error-modal">
        <h1>Error!</h1>
        <p>{error}</p>
      </div>
    );
  } else {
    return <></>;
  }

}

export default ErrorModal;