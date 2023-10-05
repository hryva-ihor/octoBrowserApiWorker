import React from "react";

const ModalMessage = ({ message, enter, found }) => {
  return (
    <div>
      <p>{message}</p>
      {enter && (
        <p>
          Було вставлено <span>{enter}</span> імені
        </p>
      )}
      {found && (
        <p>
          Знайдено <span>{found}</span> uuid
        </p>
      )}
    </div>
  );
};

export default ModalMessage;
