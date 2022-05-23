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
const ERROR = "ERROR";
const EDIT = "EDIT"

let statusMessage = "";

export default function Appointment (props) {


 const {mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
 );


 const onAdd = () => {
  transition(CREATE)
 };

 const save = (name, interviewer) => {

   if(!name || !interviewer) return transition(ERROR)
   
  statusMessage = "Saving"
  transition(STATUS)

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
};

 const onCancel = () => {
   console.log("Cancel")
   back();  
 };

 const onChange = () => {
  console.log("onChange")
};

 const onClose = () => {
  console.log("onClose")
  back()
};

const onConfirm = () => {
  console.log("onConfirm")
  statusMessage = "Deleting"
  transition(STATUS)
  props.cancel(props.id)
  .then(() => {
    console.log("Index appoinmtment deleted")
    transition(EMPTY)
  })
};

 const onDelete = () => {
  console.log("onDelete")
  transition(CONFIRM)
};


  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={onDelete} onEdit={() => transition(EDIT)}/>)}
      {mode === EMPTY && (<Empty onAdd={onAdd}/> )}
      {mode === CREATE && (<Form onSave={save} onCancel={onCancel}  interviewers={props.interviewers} onChange={onChange}/>)}
      {mode === EDIT && (<Form onSave={save} onCancel={onCancel}  interviewers={props.interviewers} onChange={onChange} student={props.student} interviewer={props.interviewer}/>)}
      {mode === STATUS && (<Status message={statusMessage}/> )}
      {mode === ERROR && (<Error onClose={onClose}/>)}
      {mode === CONFIRM && (<Confirm onCancel={onClose} onConfirm={onConfirm}/>)}
   
    </article>
  );
}