// On page load, make a fetch to get all of the pup objects. 
// Why the rocket notation below?
document.addEventListener("DOMContentLoaded", () => {
    
    const pupURL = "http://localhost:3000/pups"
    jsonObj = ""
    let filterOn = false

    dogBar = document.getElementById("dog-bar")
    dogInfo = document.getElementById("dog-info")
    filterBtn = document.getElementById("good-dog-filter")

    filterBtn.addEventListener("click", toggleFilter)

    function updateDB(obj, property){
        let patchURL = `${pupURL}/${obj.id}`
        fetch(patchURL, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify({
                "isGoodDog": property
            })
        })
    }

    function toggleGoodness(obj, btn){
        obj.isGoodDog = !obj.isGoodDog
        updateDB(obj, obj.isGoodDog)
        obj.isGoodDog ? btn.innerText = "Good Dog" : btn.innerText = "Bad Dog"
    }

    function toggleFilter(){
        if(filterOn == false){
            filterOn = true
            filterBtn.innerText = "Filter good dogs: ON"
        }else {
            filterOn = false
            filterBtn.innerText = "Filter good dogs: OFF"
        }
        makeSpans()
    }

    function showInfo(event, obj){
        const div = document.createElement("div")

        const image = document.createElement("img")
        image.src = obj.image
        div.appendChild(image)   

        const h1 = document.createElement("h1")
        h1.innerText = obj.name
        div.appendChild(h1)

        const btn = document.createElement("button")
        obj.isGoodDog ? btn.innerText = "Good Dog" : btn.innerText = "Bad Dog"
        btn.addEventListener("click", (event) => toggleGoodness(obj, btn))
        div.appendChild(btn)
        
        dogInfo.innerHTML = ""
        dogInfo.appendChild(div)
    
    }

    function makeSpans(){
        dogBar.innerHTML = ""
        let pups = jsonObj
        for (const pup of pups){
            const mySpan = document.createElement("span")
            mySpan.setAttribute("id", pup.id)
            mySpan.innerText = pup.name
            mySpan.addEventListener("click", (event) => showInfo(event, pup))
            if(filterOn == false){
            dogBar.appendChild(mySpan)
            }else{
                if(pup.isGoodDog == true){
                    dogBar.appendChild(mySpan)
                }
            }
        }
    }

    function getAllPups(){
        fetch(pupURL)
        .then(function (response) {
            return response.json();
            })       
        .then(function (response) {
            jsonObj = response
            return makeSpans(response)
        });
    }

    getAllPups()

})
