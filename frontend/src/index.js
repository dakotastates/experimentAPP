document.addEventListener("DOMContentLoaded",function(){
  Experiment.loadExperiments()
  mountExpFormListener()
  eventExpDelegation()
  //success()
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
var elements = document.getElementsByClassName("classname");
const successBtns = document.getElementsByClassName("success");
const failBtns = document.getElementsByClassName("failure")



function success(){

  for (successBtn of successBtns){
    //console.log(successBtn)
    successBtn.addEventListener("click", sendSuccess)
  }
}

function failure(){

  for (failBtn of failBtns){
    //console.log(successBtn)
    failBtn.addEventListener("click", sendFail)
  }
}

async function sendSuccess(e){
  const trialId = e.target.parentElement.id
  const expId = e.target.parentElement.querySelector(".inCard").id
  let success = parseInt(e.target.parentElement.querySelector(".successes").innerText)

  //debugger
  success ++
  const postObj = {
    success
  }
  TrialAPI.patch(postObj, expId, trialId)
  //console.log(trialId)
}

async function sendFail(e){
  const trialId = e.target.parentElement.id
  const expId = e.target.parentElement.querySelector(".inCard").id
  let failure = parseInt(e.target.parentElement.querySelector(".failures").innerText)
  failure --
  const postObj = {
    failure
  }
  TrialAPI.patch(postObj, expId, trialId)
  console.log(trialId)
}


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

      //successAndFail(showId)
      //success()
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

    } else if (e.target.className === "success") {
      success()
    }else if (e.target.className === "failure") {
      failure()
    }
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
