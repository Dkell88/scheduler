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

const confirm = () => {
 
  statusMessage = "Deleting"
  transition(STATUS,true)
  props.cancel(props.id)
  .then(() => {
    transition(EMPTY)
  })
  .catch(err => {
    console.log(err.message)
    transition(ERROR, true)
  });
};

  return (
    <article className="appointment">
      <Header time={props.time}/>

      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)}/>)}

      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)}/> )}

      {mode === CREATE && (<Form onSave={save} onCancel={back}  interviewers={props.interviewers}/>)}

      {mode === EDIT && (<Form onSave={save} onCancel={back}  interviewers={props.interviewers} student={props.interview.student} interviewer={props.interview.interviewer.id}/>)}

      {mode === STATUS && (<Status message={statusMessage}/> )}

      {mode === ERROR && (<Error onClose={back}/>)}

      {mode === CONFIRM && (<Confirm onCancel={back} onConfirm={confirm}/>)}
   
    </article>
  );
}