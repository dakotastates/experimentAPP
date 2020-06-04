document.addEventListener("DOMContentLoaded",function(){

  Experiment.loadExperiments()
  mountFormListener()
  eventDelegation()

})

const formTitle = document.querySelector("#title")
const formHypothesis = document.querySelector("#hypothesis")
const expForm = document.getElementById("newExp-form")
const experimentList = document.querySelector(".exp-lists")
//let newExpModal = document.getElementById("newExpModal");

function eventDelegation(){
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
    }
  })
}


function getExpData(){

  return {
    title: formTitle.value,
    hypothesis: formHypothesis.value
  }
}

function clearForm(){
  delete expForm.dataset.idea
  expForm.dataset.action = "create"
  formTitle.value = ""
  formHypothesis.value = ""
}

function mountFormListener(){
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
