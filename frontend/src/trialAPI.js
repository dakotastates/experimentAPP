class TrialAPI{
  static baseUrl = "http://localhost:3000/api/v1/experiments"

  static options = {
    headers:{
      'Content-Type': 'application/json',
      "Accept": "application/json"
    }
  }


  static getTrials(expId){
    Trial.all=[]
    const expUrl = TrialAPI.baseUrl + `/${expId}` + `/trials`
    //post(expUrl)
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

  static post(data, expId){
//debugger
    const postUrl = TrialAPI.baseUrl + `/${expId}` + `/trials`


    const options ={
      ...TrialAPI.options,
      method: 'POST',
      body: JSON.stringify({trial:data})

    }
    //debugger
    fetch(postUrl, options)
    .then(resp => resp.json())
    .then((data) => {
      if (!data.errors){
        // Create a new Experiment
        //debugger
        new Trial(data)
        // render all experiments(make sure empty experiment list)
        Trial.renderTrials()
      //  newExpModal.style.display = "none";
        //clearForm()
      }else{
        throw new Error( `${data.errors}` )
      }
    })
    .catch(alert)

  }
}
