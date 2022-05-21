export const getAppointmentsForDay = (state, day) => {

  const filteredDays = state.days.filter(d => d.name === day);
  if(!filteredDays.length) return [];

  const filteredApps = filteredDays[0].appointments.map((apps) =>{
      if(apps in state.appointments) return state.appointments[apps]
      return [];  
  })

  return filteredApps
};

export const getInterview = (state, interview) => {

  if(!interview) return null;
  const filteredApps = Object.values(state.interviewers).find(int => interview.interviewer === int.id);
  const returnedApp = {...interview, interviewer:filteredApps };

  return returnedApp
};



export const getInterviewersForDay = (state, day) => {

  console.log("state.days ", state.days)
  console.log("day ", day)

  const filteredDays = state.days.filter(d => d.name === day);
  if(!filteredDays.length) return [];

  const filteredInt = filteredDays[0].interviewers.map((int) =>{
      if(int in state.interviewers) return state.interviewers[int]
      return [];  
  })

  return filteredInt
};