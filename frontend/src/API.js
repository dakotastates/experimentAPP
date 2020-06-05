class API {
  static baseUrl = "http://localhost:3000/api/v1/experiments"

  static options = {
    headers:{
      'Content-Type': 'application/json',
      "Accept": "application/json"
    }
  }
//get all api data
  static get(){
    return(
      fetch('http://localhost:3000/api/v1/experiments')
      .then(resp => resp.json())
    )
  }

//get data by id
  static getShow(Id){
    const url = API.baseUrl + `/${Id}`
    console.log(url)
    return(
      fetch(url)
      .then(resp => resp.json())
      .then((data) =>{
        //console.log(data)
        if (!data.errors){
          //if there are no errors then use the data to render correct show Modal
          //Experiment.renderShowExperiment(data)

          //Trial.renderShowExperiment(data)
        }
      })
    )

  }

  static post(data){
    //debugger
    const options ={
      ...API.options,
      method: 'POST',
      body: JSON.stringify({experiment:data})
    }
    fetch(API.baseUrl, options)
    .then(resp => resp.json())
    .then((data) => {
      if (!data.errors){
        // Create a new Experiment
        new Experiment(data)
        // render all experiments(make sure empty experiment list)
        Experiment.renderExperiments()
      //  newExpModal.style.display = "none";
        //clearForm()
      }else{
        throw new Error( `${data.errors}` )
      }
    })
    .catch(alert)
  }

  static delete(Id){
    const options ={
      ...API.options,
      method:'DELETE'
    }
    const url = API.baseUrl + `/${Id}`

    fetch(url, options)
    .then(resp => resp.json())
    .then((data) => {
      if (!data.errors){
        const index = Experiment.all.findIndex((experiment)=> experiment.id === data.id)
        Experiment.all.splice(index,1)
        Experiment.renderExperiments()
        //filter through all experiments and get rid of deleted
        //re render all experiments
      } else{
        throw new Error(`${data.errors}`)
      }
    })
    .catch(alert)
  }

  static patch(data,Id){
    const options ={
      ...API.options,
      method: 'PATCH',
      body: JSON.stringify({experiment:data})
    }
    const url = API.baseUrl + `/${Id}`
    fetch(url,options)
    .then(resp => resp.json())
    .then((data) => {
      if(!data.errors){
        //create a new Experiments
        const editedExps = Experiment.all.map(experiment =>{
          if(experiment.id === data.id){
            return new Experiment(data)
          }else{
            return experiment
          }
        })
        Experiment.all = editedExps
        Experiment.renderExperiments()
      //  newExpModal.style.display = "none";
      //  clearForm()
      }else{
        throw new Error(`${data.errors}`)
      }
    })
    .catch(alert)
  }

}
