
const getAppointmentsForDay = (state, day) => {

  const filteredDays = state.days.filter(d => d.name === day);

  if(!filteredDays.length) return [];

  const filteredApps = filteredDays[0].appointments.map((apps) =>{
      if(apps in state.appointments) return state.appointments[apps]  
  })

  return filteredApps
};

const getInterview = (state, interview) => {

  if(!interview.length) return [];
  const filteredApps = Object.values(state.interviewers).find(int => interview.interviewer === int.id);
  const returnedApp = {...interview, interviewer:filteredApps };

  return returnedApp
};


module.exports = { getAppointmentsForDay, getInterview }