// Get the modal
let newExpModal = document.getElementById("newExpModal");
let showExpModal = document.getElementById("showExpModal");
// Get the button that opens the modal
let newExpBtn = document.getElementById("newExpBtn");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
let span2 = document.getElementsByClassName("close")[1];
//let expCard = document.getElementsByClassName("card-content")

// When the user clicks within the card, open the modal
//expCard.addEventListener("click", function(){

//})

// When the user clicks the button, open the modal
newExpBtn.onclick = function() {
  newExpModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  newExpModal.style.display = "none";
  clearForm();


}

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
  showExpModal.style.display = "none";
  clearTrialForm();
}



// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == newExpModal) {
    newExpModal.style.display = "none";
    clearForm();

  } else if (event.target == showExpModal){
    showExpModal.style.display = "none";
    clearTrialForm();
  }
}
