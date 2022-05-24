import { useState, useEffect } from "react";
const axios = require('axios').default;

export default function useApplicationData() {
  const [prevState, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  });

  const setDay = day => setState({ ...prevState, day });

  const bookInterview = (id, interview)  => {
    const appointment = {
      ...prevState.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...prevState.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview, id})
    .then(() => {
      console.log("inside then promise within App")
      setState((prev) => ({...prev, appointments }));
      //updateSpots(id)
      return null
    })
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...prevState.appointments[id],
      interview: null
    }
    const appointments = {
      ...prevState.appointments,
      [id]: appointment
    }
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, {id})
    .then(() =>{
      console.log("Deleted")
      setState((prev) => ({...prev, appointments}));
      //updateSpots(id)
    })
  };

  const updateSpots = (id) => {
    //console.log("updateSpots - id: ", id)
    const selectedDay = prevState.days.find(day => day.name === prevState.day)
    console.log("updateSpots selectedDay:", selectedDay)
    const appointmentsIDs = selectedDay.appointments
    console.log("appointments ", appointmentsIDs)
    const spots = selectedDay.appointments.filter(id => !prevState.appointments[id].interview).length
    console.log("updateSpots spots:", spots)

    const updatedState = {...prevState, days: [...prevState.days], }

  }

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




  return {state: prevState, setDay, bookInterview, cancelInterview}
}