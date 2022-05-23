import React ,{ useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "components/helpers/selectors";
const axios = require('axios').default;


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  });
  let dailyAppointments = []; 
  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview)  => {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log("before axios call", interview)
    return axios.put(`http://localhost:8001/api/appointments/:${id}`, {interview, id})
    .then(() => {
      console.log("inside then promise within App")
      setState((prev) => ({...prev, appointments }));
      return null
    })
  };

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`),
    ])
    .then(all => {
      setState(prev => ({...prev, appointments: all[1].data, days:all[0].data, interviewers: all[2].data}))
    })
    .catch((e) => console.log(e));
  }, []);
  
  dailyAppointments = getAppointmentsForDay(state, state.day); 

  const appointmentArr = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview)
    const interviewers = getInterviewersForDay(state, state.day);
    return (<Appointment 
      key={appointment.id} 
      //{...appointment}
      id={appointment.id} 
      time={appointment.time} 
      interview={interview} 
      interviewers={interviewers}
      book={bookInterview}
    />)
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
              days={state.days}
              value={state.day}
              onChange={setDay}
            /> 
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentArr}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
