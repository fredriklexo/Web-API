let container = document.getElementById("container")

// ---------------- Get favorite list ---------------
async function getMyFavoriteCocktails(event) {

    let response = await fetch("http://localhost:3000/favCocktails")
    const data = await response.json();

    renderCoctailsCard(data)
}

// ---------------- Get cocktail by search word ---------------
async function getCoctailByKeyword(event) {

    event.preventDefault()

    let drink = document.getElementsByClassName("form-control")[0]
    if (drink.value === "") {
        container.innerHTML = ""
        let errorMsg = document.createElement("h1")
        errorMsg.innerHTML = "You need to use words to search.."
        return container.append(errorMsg)
    } else {

        let response = await fetch("http://localhost:3000/keyword/" + drink.value)
        const data = await response.json();

        renderCoctailsCard(data)
    }

}


// ---------------- rendering controller ---------------
async function renderCoctailsCard(data) {

    container.innerHTML = ""

    if (typeof data === "string") {
        return errorMsg(data)
    }

    data.map((cocktail) => {

        cocktailCard(cocktail)
    })

}
// ---------------- render card ---------------
function cocktailCard(cocktail) {

    let cardContainer = document.createElement("div")
    cardContainer.classList = "cardContainer"

    let name = document.createElement("h1")
    name.innerHTML = cocktail.strDrink
    name.classList = ""

    let changeInputContainer = document.createElement("div")
    changeInputContainer.classList = "changeInputContainer"


    let category = document.createElement("h2")
    category.innerHTML = cocktail.strCategory

    let instruction = document.createElement("h3")
    instruction.innerHTML = cocktail.strInstructions

    let thumbnail = document.createElement("img")
    thumbnail.className = "img"
    thumbnail.src = cocktail.strDrinkThumb

    let heartContainer = document.createElement("div")
    heartContainer.classList = "h_container"

    let heart = document.createElement("i")
    heart.id = "heart"
    heart.classList = "far fa-heart toggel"

    if (cocktail.isFav) {
        heart.style.color = "red"
        name.style.cursor = "pointer"
    }

    heartContainer.append(heart)
    container.append(cardContainer)
    cardContainer.append(name, changeInputContainer, thumbnail, category, instruction, heartContainer)

    //--------------------------------------------------------------------------------

    heartContainer.addEventListener("click", async function (event) {
        event.preventDefault()

        if (cocktail.isFav) {
            heart.style.color = "black"
            const response = await fetch("http://localhost:3000/delCocktails/" + cocktail.idDrink, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cocktail) // body data type must match "Content-Type" header
            });

            return response.json(); // parses JSON response into native JavaScript objects
        }

        if (!cocktail.isFav) {
            heart.style.color = "red"
            const response = await fetch("http://localhost:3000/saveCocktails", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cocktail) // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
        }

    })
    //--------------------------------------------------------------------------------

    name.addEventListener("click", async function (event) {
        event.preventDefault()
        if (cocktail.isFav) {
            let response = await fetch("http://localhost:3000/favCocktails/" + cocktail.idDrink)
            const data = await response.json();

            await renderCoctailsCard([data])
            changeMyCocktailName(data)
        }
    })

}

// ---------------- render out error msg ---------------
function errorMsg(cocktailList) {
    //if favorite list is an empty array
    if (cocktailList === "You need to like something to call it a favorite!") {
        let errorMsg = document.createElement("h1")
        errorMsg.innerHTML = "You need to add somthing to call it your favorite!"
        return container.append(errorMsg)
    }

    // if the search word cant find any endpoints, err msg
    if (cocktailList === "The coctail do not exist, please use a diffrent search word!") {
        let errorMsg = document.createElement("h1")
        errorMsg.innerHTML = "The coctail do not exist, please use a diffrent search word!"
        return container.append(errorMsg)

    }
}

// ---------------- Change name on one cocktail from you favoritlist ---------------
async function changeMyCocktailName(data) {

    let cardContainer = document.getElementsByClassName("cardContainer")[0]
    let changeInputContainer = document.getElementsByClassName("changeInputContainer")[0]

    let icon = document.createElement("img")
    icon.src = "https://img.icons8.com/ios-filled/50/000000/gear.png"
    icon.classList = "gearIcon"

    console.log(data.idDrink)
    cardContainer.append(icon)

    icon.addEventListener("click", async function (event) {
        if (changeInputContainer.innerHTML === "") {

            div = document.createElement("div")
            inputfield = document.createElement("input")
            inputfield.placeholder = "change name"

            btn = document.createElement("button")
            btn.classList = "changeBtn btnStyle"
            btn.innerText = "change"

            changeInputContainer.append(div)
            div.append(inputfield, btn)

            btn.addEventListener("click", async function (event) {

                data.strDrink = inputfield.value

                const response = await fetch("http://localhost:3000/changeCocktails/" + data.idDrink, {
                    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data) // body data type must match "Content-Type" header
                });
                return response.json(); // parses JSON response into native JavaScript objects 
            })


        } else {
            changeInputContainer.innerHTML = ""
        }
    })


}



let myFavoriteBtn = document.getElementsByClassName("myFavoriteBtn")[0]
myFavoriteBtn.addEventListener("click", function (event) {

    getMyFavoriteCocktails(event)
})


let inputfield = document.getElementsByClassName("inputfield")[0]
inputfield.addEventListener("click", function (event) {

    getCoctailByKeyword(event)
})

