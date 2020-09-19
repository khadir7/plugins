import React from "react";
import Form from "react-bootstrap/Form";
import styled from "styled-components";

const Asterisk = styled.span`
  color: red;
`;

const input = (props) => {
  let inputElement = "";
  switch (true) {
    case props.path.config.type === "password" ||
      props.path.config.type === "textarea" ||
      props.path.config.type === "input":
      inputElement = (
        <Form.Group
          className={
            props.path.touched && props.path.mandatory
              ? props.path.isValid
                ? ""
                : "error"
              : ""
          }
        >
          <Form.Label>{props.path.name}</Form.Label>
          {props.path.mandatory ? <Asterisk>*</Asterisk> : ""}
          <Form.Control
            {...props.config}
            value={props.value}
            onChange={(e) => props.changed(e, props.path.objName)}
            onKeyPress={(event) => {
              if (event.key === "Enter" && props.path.onEnterEvent) {
                props.onEnterEventClicked();
              }
            }}
          />
          {props.children}
        </Form.Group>
      );
      break;
    // case ( 'textarea' ):
    //     inputElement = (
    //         <div>
    //             <textarea
    //                 className={classes.InputElement}
    //                 {...props.elementConfig}
    //                 value={props[props.setPath]}
    //                 onChange={props.changed} />;
    //         </div>
    //     )
    //     break;
    // case ( 'select' ):
    //     inputElement = (
    //         <div>
    //             <select
    //                 className={classes.InputElement}
    //                 value={props[props.setPath]}
    //                 onChange={props.changed}>
    //                 {props.elementConfig.options.map(option => (
    //                     <option key={option.label} value={option[props.setPath]}>
    //                         {option.label}
    //                     </option>
    //                 ))}
    //             </select>
    //         </div>
    //     );
    //     break;
    default:
      break;
  }

  return <>{inputElement}</>;
};

export default input;
