import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  //console.log("DayListItem PROPS: ", props)
  let dayClass = classNames("day-list__item", {
    'day-list__item--selected':props.selected,
    'day-list__item--full':(!props.spots)
  })

  const formatSpots = () => {
    if(!props.spots) return "no spots remaining"
    if(props.spots === 1) return "1 spot remaining"
    return `${props.spots} spots remaining`
  }
 //Why can't this just be a function inside the h3 element

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      {/* <h3 className="text--light">{spotsRemaining}</h3> */}
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
} 