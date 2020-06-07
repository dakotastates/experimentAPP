class Trial {

  static all = []

  constructor({id, experiment_id, observation}){
    //Trial.all=[]
    this.id = id
    this.expId = experiment_id
    this.observation = observation
    Trial.all.push(this)
  }


  //Template
    htmlifyTrial(){

      return(`
        <div class="trialCard">

          <div class="trialCard-content" id="${this.id}">
            <div class="inCard">
              <h4>Observation</h4>
              <p><span> ${this.observation}</span></p>
            </div>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button><br><br>
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
      })//render all trials


    }


}
