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

  static delete(expId, trialId){
    const options ={
      ...TrialAPI.options,
      method:'DELETE'
    }
    const url = TrialAPI.baseUrl + `/${expId}` + `/trials/${trialId}`
    //debugger

    fetch(url, options)
    .then(resp => resp.json())
    .then((data) => {
      if (!data.errors){

        const index = Trial.all.findIndex((trial)=> trial.id === data.id)

        Trial.all.splice(index,1)
        Trial.renderTrials()
        //filter through all experiments and get rid of deleted
        //re render all experiments
      } else{
        throw new Error(`${data.errors}`)
      }
    })
    .catch(alert)

  }


  static patch(data, expId, trialId){

    const options ={
      ...TrialAPI.options,
      method: 'PATCH',
      body: JSON.stringify({trial:data})
    }
    const url = TrialAPI.baseUrl + `/${expId}` + `/trials/${trialId}`


    fetch(url,options)
    .then(resp => resp.json())
    .then((data) => {
      if(!data.errors){

        //create a new Trials
        const editedTrials = Trial.all.map(trial =>{

          if(Trial.id === data.id){
            
            return new Trial(data)

          }else{
            return trial

          }
        })
        Trial.all = editedTrials
        Trial.renderTrials()
      //  newExpModal.style.display = "none";
       //clearTrialForm()
      }else{
        throw new Error(`${data.errors}`)
      }
    })
    .catch(alert)

  }


}
