class Experiment {
  static all = []

  constructor({id, title, hypothesis}){

    this.id = id
    this.title = title
    this.hypothesis = hypothesis

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
          <span>Successes: </span>
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


/*
//showPage tempate
  static renderShowExperiment(data){
    showContent.innerHTML = (`
      <div class="showContainer">
      <h3>${data.title}</h3>
      <div class="expData">
      Created: ${data.created_at}<br>
      Hypothesis: <p>${data.hypothesis}</p>
      </div>
      <div class="trial">
      Trials
      </div>
      </div>
      `)

  }
  */

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
