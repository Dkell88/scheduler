import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  let interviewerClass = classNames("interviewers__item", {
    'interviewers__item--selected':props.selected
  })


return(
  // <li className={interviewerClass} onClick={() => props.setInterviewer(props.id)}>
  <li className={interviewerClass} onClick={props.setInterviewer}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li>
)

}

// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };

// {anger < 1 && <span>Don't click me too much! </span>}