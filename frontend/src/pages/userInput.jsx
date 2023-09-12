import React from "react";
function UserInput(props) {
    return (
      <input
        className={props.className}
        placeholder={props.placeholder}
        type={props.type}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      />
    );
  }

  export default UserInput;