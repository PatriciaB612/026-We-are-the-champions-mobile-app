import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import {
  getDatabase,
  ref,
  push,
  onValue,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
  databaseURL: 'https://realtime-database-50b9d-default-rtdb.firebaseio.com/',
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsListInDB = ref(database, 'endorsementsList')
const inputEl = document.getElementById('input-el')
const publishBtn = document.getElementById('publish-btn')
const UlEl = document.getElementById('ul-el')

publishBtn.addEventListener('click', function () {
  push(endorsementsListInDB, inputEl.value)
  appendItemToEndorsementsList()
  inputEl.value = ''
})

onValue(endorsementsListInDB, function (snapshot) {
  let itemsArray = Object.values(snapshot.val())
  UlEl.innerHTML = ''
  for (let i = 0; i < itemsArray.length; i++) {
    let itemValue = itemsArray[i]
    appendItemToEndorsementsList(itemValue)
  }
  console.log(itemsArray)
})

function appendItemToEndorsementsList(itemValue) {
  UlEl.innerHTML += `<li>${itemValue}</li>`
}
