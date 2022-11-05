import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { IEmailInterface } from "../Types/emailType";

const Mailto = ({ email, subject, body, children }: IEmailInterface) => {
  let params = subject || body ? "?" : "";
  if (subject) params += `subject=${encodeURIComponent(subject)}`;
  if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;

  return <a href={`mailto:${email}${params}`}>{children}</a>;
};

export default Mailto;
