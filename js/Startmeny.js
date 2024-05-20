// import { store } from './store/StoreData.js'

const startButton = document.getElementById('start-button');
document.getElementById("start-button").addEventListener("click", function () {
  window.location.href = "index-branch2.html"
});

// fetch api data
// async function fetchData(url) {
//   const resp = await fetch(url)
//   if (resp.ok) {
//     const json = await resp.json()
//     const str = JSON.stringify(json)
//     return str
//   }
//   throw Error('Error fetching data')
// }

// fetchData('https://data.riksdagen.se/personlista/?rdlstatus=tjanst&utformat=json')
//   .then(str => {
//     sessionStorage.setItem('questionTwoStorage', str)
//     console.log(str)
//   })
//   .catch(err => {
//     console.log(err)
//   })

// fetchData(`https://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&sort=sorteringsnamn&sortorder=asc&termlista=`)
//   .then(str => {
//     sessionStorage.setItem('questionThreeStorage', str)
//   })
//   .catch(err => {
//     console.log(err)
//   })

// fetchData('https://data.riksdagen.se/personlista/?utformat=json&sort=parti')
//   .then(str => {
//     console.log(str)
//     //sessionStorage.setItem('questionFourStorage', str)

//   })
//   .catch(err => {
//     console.log(err)
//   })

// store.health = 3
// store.score = 0

