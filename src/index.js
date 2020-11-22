// On page load, make a fetch to get all of the pup objects. 
// Why the rocket notation below?
document.addEventListener("DOMContentLoaded", () => {
    
    const pupURL = "http://localhost:3000/pups"

    dogBar = document.getElementById("dog-bar")
    dogInfo = document.getElementById("dog-info")

    function showInfo(event, obj){
        const pup = event.target
        // name = pup.innerText
        // id = pup.id
        const div = document.createElement("div")

        const image = document.createElement("img")
        image.src = obj.image
        div.appendChild(image)   

        const h1 = document.createElement("h1")
        h1.innerText = obj.name
        div.appendChild(h1)

        const btn = document.createElement("button")
        obj.isGoodDog ? btn.innerText = "Good Dog" : btn.innerText = "Bad Dog"
        // btn.innerText = obj.isGoodDog
        div.appendChild(btn)
        
        dogInfo.innerHTML = ""
        dogInfo.appendChild(div)
    
    }

    // When you have this information, you'll need to add a span with the pup's name to the dog bar (ex: <span>Mr. Bonkers</span>).
    function makeSpans(pups){
        //console.log(pups)
        for (const pup of pups){
            //console.log(pup.name)
            const mySpan = document.createElement("span")
            mySpan.setAttribute("id", pup.id)
            mySpan.innerText = pup.name
            mySpan.addEventListener("click", (event) => showInfo(event, pup))
            dogBar.appendChild(mySpan)
        }
    }

    //When a user clicks on a pup's span in the dog bar, that pup's info (image, name, and isGoodDog status) should show up in the div with the id of "dog-info"


    function getAllPups(){
        fetch(pupURL)
        //why is response in parens below?
        //Why do a => a.json instead of a =. b.json?
        .then(response => response.json())
        .then(myJSON => {
            //console.log(myJSON)
            makeSpans(myJSON)
        });
    }

    getAllPups()

})
