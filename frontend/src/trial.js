class Trial {

  static all = []

  constructor({id, experiment_id, observation, created_at, updated_at, success, failure}){
    //Trial.all=[]
    this.id = id
    this.expId = experiment_id
    this.observation = observation
    this.created_at = created_at
    this.success = success
    this.failure = failure
    Trial.all.push(this)
  }


  //Template
    htmlifyTrial(){

      return(`
        <div class="trialCard">

          <div class="trialCard-content" id="${this.id}">
            <div class="inCard" id="${this.expId}">
              <h4>Observation</h4>
              <p><span> ${this.observation}</span></p>
              <p><span>Created at: ${this.created_at}</span></p>
              <p class="successes"> ${this.success}</p>
              <p class="failures"> ${this.failure}</p>
            </div>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button><br><br>
            What the Trial Successful?<br>
            <button class="success">Yes</button>
            <button class="failure">No</button><br><br>
          </div>
        </div>
      `)
    }

/*
  //showPage tempate
    static renderShowExperiment(data){
      showContent.innerHTML = (
        ``
        renderTrials()
      )
    }
*/
/*
  expId(){
    return `${this.expId}`
    //debugger
  }
  */

    renderTrial(){
      trialList.innerHTML += this.htmlifyTrial()

    }

    static renderTrials(){
      trialList.innerHTML = "<h3>List of Trials</h3>"

      Trial.all.forEach(trial => trial.renderTrial())
      success()
      failure()
      clearTrialForm()
    }

/*
    static showExpData(data){

      expData.innerHTML = `
      <div class="showExp" id = ${data.id}></div>`
      debugger
    }

*/

    static loadTrials(){

      //pass through the Experiment id
      TrialAPI.getTrials()

       //This will create all trials for the experiment

      .then(trials =>{
        trials.forEach(trial => new Trial(trial))
        //debugger
        Trial.renderTrials()
        //success()
      })//render all trials


    }


}
