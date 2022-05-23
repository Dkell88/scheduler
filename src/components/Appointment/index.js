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

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const STATUS = "STATUS";
const CONFIRM = "Confirm";
const ERROR = "Error";

export default function Appointment (props) {

 const {mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
 );

 const onAdd = () => {
  transition(CREATE)
 }
 const save = (name, interviewer) => {
  transition(STATUS)
  console.log(`Save student: ${name} Interviewer ${interviewer}`)
  const interview = {
    student: name,
    interviewer
  };
  props.book(props.id, interview)
  .then(() => {
    transition(SHOW)
  })
  .catch(err => {
    console.log(err.message)
    transition(ERROR, true)
  });
}
 const onCancel = () => {
   console.log("Cancel")
   back();  
 }
 const onChange = () => {
  console.log("onChange")
 
}
 const onClose = () => {
  console.log("onChange")
  back()
 
}


  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer}/>)}
      {mode === EMPTY && (<Empty onAdd={onAdd}/> )}
      {mode === CREATE && (<Form onSave={save} onCancel={onCancel}  interviewers={props.interviewers} onChange={onChange}/>)}
      {mode === STATUS && (<Status/> )}
      {mode === ERROR && (<Error onClose={onClose}/>)}
      {mode === CONFIRM && (<Confirm />)}
   
    </article>
  );
}