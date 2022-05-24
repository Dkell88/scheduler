import { useState, useEffect } from "react";
const axios = require('axios').default;

const updateSpots = (prevState, appointments) => {
  const selectedDay = prevState.days.find(day => day.name === prevState.day)
  const spots = selectedDay.appointments.filter(id => !appointments[id].interview).length

  const dayId = prevState.days.findIndex(day => day.name === prevState.day)
  const day = {
    ...prevState.days[dayId],
    spots
  }
  let days = [
    ...prevState.days 
  ]
  days[dayId] = day

  return days

}

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  });
  

  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview)  => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview, id})
    .then(() => {
      setState((prev) => {
         const days = updateSpots(prev, appointments)
        return ({...prev, appointments, days})
      });
  
    })
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, {id})
    .then(() =>{
      setState((prev) => {
        const days = updateSpots(prev, appointments)
        return ({...prev, appointments, days})
      });
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




  return {state, setDay, bookInterview, cancelInterview}
}