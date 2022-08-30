import Express from 'express';
import fetch from 'node-fetch';

const app = Express();
const port = 3000;


app.use(Express.static('client'))
app.use(Express.json())

let likeCocktailsList = []


// GET
app.get("/favCocktails", async (req, res) => {
    try {

        if(likeCocktailsList == ""){
            throw new Error("You need to like something to call it a favorite!")
        }

        let updatedLikedDrinks = likeCocktailsList.map((drink) => {

            const drinkExists = likeCocktailsList.find(cocktail => cocktail.idDrink === drink.idDrink)

            if (!!drinkExists && drinkExists.idDrink == drink.idDrink) {
                return { ...drink, ...{ isFav: true } }
    
            } else {
                return drink
                
            }
        })



        res.json(updatedLikedDrinks)

    } catch (err) {
        res.status(404).json(err.message)
    }
  

})

app.get("/favCocktails/:id", async (req, res) => {
    try {
        const drinkExists = likeCocktailsList.find(cocktail => cocktail.idDrink === req.params.id)

        if(!drinkExists){
            throw new Error("Cant finde matching ID in your favoritelist")
        }

        res.json({ ...drinkExists, ...{ isFav: true } })

    } catch (err) {
        res.status(404).json(err.message)
    }
  

})

app.get("/keyword/:drinks", async (req, res) => {
    try {
        
        if (req.params.drinks === "") {
            throw new Error("The coctail do not exist, please use a diffrent search word!")
        }
    
        let response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + req.params.drinks)

        const data = await response.json();

        if (!data.drinks) {
            throw new Error("The coctail do not exist, please use a diffrent search word!")
        }


        let updatedLikedDrinks = data.drinks.map((drink) => {

            const drinkExists = likeCocktailsList.find(cocktail => cocktail.idDrink === drink.idDrink)

            if (!!drinkExists && drinkExists.idDrink == drink.idDrink) {
                return { ...drinkExists, ...{ isFav: true } }

            } else {
                return drink
            }
        })


        res.json(updatedLikedDrinks)
    } catch (err) {
        res.status(404).json(err.message)
    }


})




// POST 
app.post("/saveCocktails", async (req, res) => {
    try {
        if (!req.body) {
            throw new Error("Need more data to save the cocktail")
        }

        const drinkExists = likeCocktailsList.find(drink => drink.idDrink === req.body.idDrink)

        if (drinkExists) {
            console.log("drink already exists")
            throw new Error("drink already exists")
        }

        likeCocktailsList.push(req.body)

        res.json("Sparat")

    } catch (err) {
        res.status(400).json(err.message)
    }
})


// PUT

app.put("/changeCocktails/:id", async (req, res) => {
    try {
        
        if (req.body.strDrink === "") {
            throw new Error("You need atleast one word!")
        }
        const drinkExists = likeCocktailsList.find(drink => drink.idDrink === req.params.id)

        if (!drinkExists) {
            throw new Error("No saved cocktails")
        } else {
            drinkExists.strDrink = req.body.strDrink
        }

        res.json(drinkExists)
    } catch (err) {
        res.status(404).json(err.message)
    }
})

// delete
app.delete("/delCocktails/:id", async (req, res) => {
    try {

        const drinkExists = likeCocktailsList.findIndex(drink => drink.idDrink === req.params.id)

        if (drinkExists == -1) {
            throw new Error("Didnt find the cocktail you wanted to delete from your favorite list")
        } else {

            likeCocktailsList.splice(drinkExists, 1)

        }

        res.json("Cocktail is deleted!")
    } catch (err) {
        res.status(404).json(err.message)
    }
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})