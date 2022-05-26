/* Returns an array of appointments(objects) for a given day(param).
 *
 * @param {state} object, the full state oject for the application (days, appointments, interviewers, ...).
 * @param {day} object, the selected day to get appointment for.
 * @return {filteredApps} array of appointments dependant on the day parameter.
 */
export const getAppointmentsForDay = (state, day) => {
  const filteredDays = state.days.filter((d) => d.name === day);

  if (!filteredDays.length) return [];

  const filteredApps = filteredDays[0].appointments.map((apps) => {
    if (apps in state.appointments) return state.appointments[apps];
    return [];
  });

  return filteredApps;
};

/* Returns an Interview object based on the selected appointment for a given day.
 *
* @param {state} object, the full state oject for the application (days, appointments, interviewers, ...).
* @param {interview} object, the selected interview to display.
* @return {returnedInterview} object containing the selected interview details for a selected interview appointment(param).
*/
export const getInterview = (state, interview) => {
  if (!interview) return null;

  const filteredApps = Object.values(state.interviewers).find(
    (int) => interview.interviewer === int.id
  );
  const returnedInterview = { ...interview, interviewer: filteredApps };

  return returnedInterview;
};

/* Returns an array of interviewers available for a given day(param).
 *
 * @param {state} object, the full state oject for the application (days, appointments, interviewers, ...).
 * @param {day} object, the selected day.
 * @return {filteredApps} array of interviewers dependant on the day parameter.
 */
export const getInterviewersForDay = (state, day) => {
  const filteredDays = state.days.filter((d) => d.name === day);
  if (!filteredDays.length) return [];

  const filteredInterviewers = filteredDays[0].interviewers.map((int) => {
    if (int in state.interviewers) return state.interviewers[int];
    return [];
  });

  return filteredInterviewers;
};
