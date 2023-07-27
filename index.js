import { initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://we-are-the-champions-52463-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListDB = ref(database, "ednorsementList")


const inputFieldEl = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const endorsementList = document.getElementById("endorsement")


addButton.addEventListener("click", function(){
    
    let inputValue = inputFieldEl.value
    
    push(endorsementListDB, inputValue)
    
    clearInputValue() 
})

onValue(endorsementListDB, function(snapshot){
    
    
    if(snapshot.exists()){
        let endorsementLisArray = Object.entries(snapshot.val())
        
        clearEndorsementList()
        
          for(let i = 0; i < endorsementLisArray.length; i ++){
              let currentItem = endorsementLisArray[i]
              let currentItemID = currentItem[0]
              let currentItemValue = currentItem[1]
              
              appendEndorsementList(currentItem)
          }

    } else {
        endorsementList.innerHTML = `<p class="no-items">No items here... yet</p>`
    }
})

function clearInputValue(){
    inputFieldEl.value = ""
}

function clearEndorsementList(){
    endorsementList.innerHTML = ""
}


function appendEndorsementList(item) {
   let itemID = item[0]
   let itemValue = item[1]
   let newEl = document.createElement("li")
   
   newEl.textContent = itemValue
   
   newEl.addEventListener("click", function(){
       let exactLocationOfItemInDB = ref(database, `ednorsementList/${itemID}`)
       
       remove(exactLocationOfItemInDB)
   })
   
   endorsementList.append(newEl)
   
}


