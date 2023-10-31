const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FTB-ET-WEB-FT/events`;
let state =[];
const eventsForm = document.getElementById("addEvents");
const eventsList = document.getElementById("events");
eventsForm.addEventListener("submit",addEvent)

//for adding events 

async function reRender() {
    await getEvents
    renderEvents()
}


async function getEvents() {
    try{
        
    const response = await fetch(API_URL);
    const json = await response.json();
    state.events = json.data; // replaces empty array

    } catch (error) {
      console.log(error.message)
    }

}


// function getEvents() {

// } I think we need a regular function for this??? not sure

function renderEvents(){

    if (!state.events.length) {
        eventsList.innerHTML = "<li> No events! :( <li>";
        return;
    }

    const eventCards = state.events.map((event) => {
        const li = document.createElement("li")

        li.innerHTML = `
        <h2>${event.name}</h2>
        <p>${event.date}</p>
        <p>${event.time}</p>
        <p>${event.location}</p>
        <p>${event.description}</p>
        `;

        return li;
    });

    eventsList.replaceChildren(...eventCards)

}



// process of adding event to page using Post method
async function addEvent() {
    event.preventDefault()

    let name = eventsForm.name.value
    let date = eventsForm.date.value
    let time = eventsForm.time.value
    let location = eventsForm.location.value
    let description = eventsForm.description.value
    
    try {
        const response = await (API_URL,{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            name, 
            date,
            time,
            location,
            description,
        }),
      });

        if (!response.ok) {
            throw new Error("Nah, try again!")
        }
        renderEvents();
        } catch (error) {
            console.log(error.message);
        }    
    }