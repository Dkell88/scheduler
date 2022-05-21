import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Confirm from "components/Appointment/Confirm"
import Status from "components/Appointment/Status"
import Error from "components/Appointment/Error"
import Form from "components/Appointment/Form"
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY"
const SHOW = "SHOW"
const CREATE = "CREATE"

export default function Appointment (props) {

 const {mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
 );

 const onAdd = () => {
   console.log("click")
   console.log("props", props)
  transition(CREATE)
 }
 const onSave = () => {
   console.log("save")
  
 }
 const onCancel = () => {
   console.log("Cancel")
   back();  
 }
 const onChange = () => {
  console.log("onChange")
 
}


  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer}/>)}
      {mode === EMPTY && (<Empty onAdd={onAdd}/> )}
      {mode === CREATE && (<Form onSave={onSave} onCancel={onCancel}  interviewers={props.interviewers} onChange={onChange}/>)}
   
    </article>
  );
}