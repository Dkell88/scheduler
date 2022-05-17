import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  
  let dayClass = classNames("day-list__item", {
    'day-list__item--selected':props.selected,
    'day-list__item--full':(!props.spots)
  })

  const formatSpots = (spots) => {
    if(!spots) return "no spots remaining"
    if(spots === 1) return "1 spot remaining"
    return `${spots} spots remaining`
  }
  const spotsRemaining = formatSpots(props.spots)  //Why can't this just be a function inside the h3 element

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{spotsRemaining}</h3>
    </li>
  );
}