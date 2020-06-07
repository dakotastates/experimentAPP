document.addEventListener("DOMContentLoaded",function(){

  Experiment.loadExperiments()
  mountExpFormListener()
  eventExpDelegation()
  //Trial.loadTrials()
  //mountTrialFormListener()
  //eventTrialDelegation()
  //Experiment.loadShow()
  //Trial.loadShow()
  //Trial.loadTrials()

})

const formTitle = document.querySelector("#title")
const formHypothesis = document.querySelector("#hypothesis")
const expForm = document.getElementById("newExp-form")
const experimentList = document.querySelector(".exp-lists")
const showContent = document.querySelector(".showContent")
const trialList = document.querySelector(".trial-lists")
const trialForm = document.getElementById("newTrial-form")
const formObservation = document.querySelector("#observation")
const expData = document.querySelector(".expData")
const expDataContent = document.querySelector(".expDataContent")
//const formExpId = document.querySelector("#experiment_id")


//let newExpModal = document.getElementById("newExpModal");


function eventExpDelegation(){
  experimentList.addEventListener("click", function(e){
    if (e.target.className === "edit"){
      console.log("edit")
      //open Modal Form
      newExpModal.style.display = "block";
      //grab all the data from this card
      const [title, hypothesis] = e.target.parentElement.querySelectorAll("span")
      //populate the form with said values
      formTitle.value = title.innerText
      formHypothesis.value = hypothesis.innerText
      expForm.dataset.id = e.target.parentElement.id
      //make changes to form to identify if its edit or delete DOMContentLoaded

      document.querySelector(".btn").value = "Edit"
        expForm.dataset.action = "update"
        //change the type of fetch sent!

    }else if (e.target.className === "delete"){
      const Id = e.target.parentElement.id
      console.log("delete", Id)
      API.delete(Id)

    } else if (e.target.className === "card-content") {
      const showId = e.target.id
      const showExp = e.target
      showExpModal.style.display = "block";
      API.getShow(showId)
      TrialAPI.getTrials(showId)
      mountTrialFormListener(showId)
      getTrialData(showId)
      eventTrialDelegation(showId)
      //Experiment.renderShowExperiment(showExp)
      //debugger
      //getExpData(showId)
      //getExpId(showId)
      //Trial.showExpData(showExp)

      //Trial.loadTrials(showId)
       //Trial.expId = showId
      // console.log(showId)

    }
  })
}


function eventTrialDelegation(showId){
  trialList.addEventListener("click", function(e){
    //debugger
    if (e.target.className === "edit"){
      console.log("edit")

      //open Modal Form
      //newExpModal.style.display = "block";
      //grab all the data from this card
      const [observation] = e.target.parentElement.querySelectorAll("span")

      //populate the form with said values
      formObservation.value = observation.innerText
      //formHypothesis.value = hypothesis.innerText
      trialForm.dataset.id = e.target.parentElement.id
      //make changes to form to identify if its edit or delete DOMContentLoaded

      document.querySelector(".trialBtn").value = "Edit"
        trialForm.dataset.action = "update"
        //change the type of fetch sent!

    }else if (e.target.className === "delete"){
      const Id = e.target.parentElement.id
      console.log("delete", Id)
      //debugger
      TrialAPI.delete(showId, Id)
    } //else if (e.target.className === "card-content") {
      //const showId = e.target.id
      //showExpModal.style.display = "block";
      //API.getShow(showId)
      //TrialAPI.getTrials(showId)
      //Trial.loadTrials(showId)
       //Trial.expId = showId
      // console.log(showId)

    //}
  })
}


function getExpData(){

  return {
    title: formTitle.value,
    hypothesis: formHypothesis.value
  }
}

function getTrialData(id){
//debugger
  return {
    experiment_id: id,
    observation: formObservation.value
  }

}


function clearForm(){
  delete expForm.dataset.id
  expForm.dataset.action = "create"
  formTitle.value = ""
  formHypothesis.value = ""
}

function clearTrialForm(){
  delete trialForm.dataset.id
  trialForm.dataset.action = "create"

  formObservation.value = ""
}

/*
function getExpId(data){
console.log(data)
}
*/

function mountExpFormListener(){
  //Identify the element you want to target
  expForm.addEventListener("submit", function(event){
    event.preventDefault()
    //grab the text from each field
    const expObj = getExpData()

    if (expForm.dataset.action === "create"){
      API.post(expObj)
    }else if (expForm.dataset.action === "update"){
      const Id = event.target.dataset.id
      API.patch(expObj, Id)
    }
  })
}

function mountTrialFormListener(showId){
  //Identify the element you want to target
  trialForm.addEventListener("submit", function(event){
    event.preventDefault()
    //grab the text from each field
    const trialObj = getTrialData(showId)
    //const exId = showId

    if (trialForm.dataset.action === "create"){
      TrialAPI.post(trialObj, showId)
    }else if (trialForm.dataset.action === "update"){
      const Id = event.target.dataset.id
      TrialAPI.patch(trialObj, showId, Id)
    }
  })
}
