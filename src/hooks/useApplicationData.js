import { useState, useEffect } from "react";
const axios = require("axios").default;


/* Returns a days array with an updated value for the spots remaining to be store in state.
 *
 * @param {state} object, the full state oject for the application (days, appointments, interviewers, ...).
 * @param {appointment} object, the new appointment (before being set to state) to based the number of spots from.
 * @return {days} object to be past to state with a single updated spots value based on the selected day.
 */
const updateSpots = (state, appointments) => {
  const selectedDay = state.days.find((day) => day.name === state.day);

  const spots = selectedDay.appointments.filter(
    (id) => !appointments[id].interview
  ).length;

  const dayId = state.days.findIndex((day) => day.name === state.day);

  const day = {
    ...state.days[dayId],
    spots,
  };
  let days = [...state.days];
  days[dayId] = day;

  return days;
};

/*Returns  state(object), setDay(func), bookInterview(func), cancelInterview(func).*/
export default function useApplicationData() {

  //Set state for the application 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: [],
  });

  /* Returns setSate function setting the state to the pass day param.
 *
 * @param {day} object, the day to be set to state.
 */
  const setDay = (day) => setState({ ...state, day });

 /* Returns a axios promise, creates a new interview/appointment, send a axios put request to submit interview to DB and on success sets the new state.
 *
 * @param {id} number, the id of the appointment/interview to be set.
 * @param {interview} object to be manipulated.
 * @return {promise} promise to chain .then and .catch functions.
 */
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview, id })
      .then(() => {
        setState((prev) => {
          const days = updateSpots(prev, appointments);
          return { ...prev, appointments, days };
        });
      });
  };

 /* Returns a axios promise, cancels/delets an interview/appointment, send a axios delete request to remove interview from DB and on success sets the new state.
 *
 * @param {id} number, the id of the appointment/interview to be deleted/cancelled.
 * @return {promise} promise to chain .then and .catch functions.
 * */
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`, { id }).then(() => {
      setState((prev) => {
        const days = updateSpots(prev, appointments);
        return { ...prev, appointments, days };
      });
    });
  };

  /* Sets up a use effect to populate data from the DB. Only on first render. */
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          appointments: all[1].data,
          days: all[0].data,
          interviewers: all[2].data,
        }));
      })
      .catch((e) => console.log(e));
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
