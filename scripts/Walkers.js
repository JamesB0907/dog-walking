import { getWalkers } from "./database.js"
import { getCities } from "./database.js"
import { getWalkerCities } from "./database.js"

const walkers = getWalkers()
const cities = getCities()
const walkerCities = getWalkerCities()

const filterWalkerCitiesByWalker = (walker) => {
    
    const assignments = []

    for (const assignment of walkerCities) {
        
        if (assignment.walkerId === walker.id){

            assignments.push(assignment)
        }
    }
    
    return assignments
}

const assignedCityNames = (assignments) => {

    let matchingCities = []

    for (const assignment of assignments) {

        for (const city of cities) {

            if (assignment.cityId === city.id) {

                matchingCities.push(city.name)
            }
        }
    }
    
    return matchingCities.join(" and ")
}



document.addEventListener(
    "click",  
    (clickEvent) => {
        const itemClicked = clickEvent.target

        if (itemClicked.id.startsWith("walker")) {

            const [,walkerId] = itemClicked.id.split("--")

            for (const walkerObject of walkers) {

                if (walkerObject.id === parseInt(walkerId)) {
                    
                    const assignments = filterWalkerCitiesByWalker(walkerObject)
                    
                    const cities = assignedCityNames(assignments)
                   
                    { window.alert(`${walkerObject.name} services ${cities}`)
                
                    }
                }
            }
        }
    }
)



export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walkerObject of walkers) {
        walkerHTML += `<li id="walker--${walkerObject.id}">${walkerObject.name}</li>`

    }

    walkerHTML += "</ul>"

    return walkerHTML
}

