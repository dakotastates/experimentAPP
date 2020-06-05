class TrialAPI{
  static baseUrl = "http://localhost:3000/api/v1/experiments"



  static getTrials(expId){
    Trial.all=[]
    const expUrl = TrialAPI.baseUrl + `/${expId}` + `/trials`
    console.log(expUrl)
    return(
      fetch(expUrl)
      .then(resp => resp.json())
      .then(trials =>{
        trials.forEach(trial => new Trial(trial) )
        trials.forEach(trial => console.log(trial))
        Trial.renderTrials()
      })//render all trials
    )
  }
}
