class Experiment {
  static all = []

  constructor({id, title, hypothesis, created_at}){

    this.id = id
    this.title = title
    this.hypothesis = hypothesis
    this.created_at = created_at

    Experiment.all.push(this)
    //debugger
  }

//Template
  htmlifyExperiment(){

    return(`
      <div class="card">

        <div class="card-content" id="${this.id}">
          <h3><span class="card-title"> ${this.title}</span></h3>
          <h4>Hypothesis:</h4>
          <p><span> ${this.hypothesis}</span></p>
          <p><span> Created at: ${this.created_at}</span></p>
          <span>Successes: </span><br>
          <span>Failures: </span><br><br>
          <button class="edit">Edit</button>
          <button class="delete">Delete</button><br><br>

        </div>

      </div>

    `)
  }



  renderExperiment(){
    experimentList.innerHTML += this.htmlifyExperiment()

  }



//showPage tempate
  static renderShowExperiment(data){

    expDataContent.innerHTML = (`
      <h3>${data.title}</h3>
      Created: ${data.created_at}<br>
      Hypothesis: <p>${data.hypothesis}</p>
      `)

  }


  static renderExperiments(){

    experimentList.innerHTML = "<h3>List of Experiments</h3>"

    Experiment.all.forEach(experiment => experiment.renderExperiment())
    newExpModal.style.display = "none";
    clearForm()
  }

  static loadExperiments(){

    //Send request and then go ahead and create all Experiments from data
    API.get() //This will create all experiments

    .then(experiments =>{
      experiments.forEach(experiment => new Experiment(experiment))
      //debugger
      Experiment.renderExperiments()
    })//render all experiments

  }

/*
  //load show page

  static loadShow(){

    Experiment.renderShowExperiment()
  }
  */

}
