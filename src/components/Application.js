import React ,{ useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "components/helpers/selectors";
//const {getAppointmentsForDay} = require("components/helpers/selectors")
const axios = require('axios').default;


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  });
  const setDay = day => setState({ ...state, day });
  // const [day, setDay] = useState('Monday');
  // const [days, setDays] = useState([]);
  
  // axios.get("http://localhost:8001/api/days")
  // .then((response) => {
    //   console.log("Hardcoded GET request", response);
    // }).catch((err) =>
    //   console.log(err));
  let dailyAppointments = []; 
    
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

    return (<Appointment 
      key={appointment.id} 
      //{...appointment}
      id={appointment.id} 
      time={appointment.time} 
      interview={interview} 
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
