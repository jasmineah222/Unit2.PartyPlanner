const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FTB-ET-WEB-FT/events`;
const state =[];
const eventsForm = document.getElementById("addEvents");
const eventsList = document.getElementById("events");
const eventDate = document.getElementById("date")
eventsForm.addEventListener("submit",addEvent)

//for adding events 

async function reRender() {
    await getEvents();
    renderEvents();
}

reRender();


async function getEvents() {
    try{
        
    const response = await fetch(API_URL);
    const json = await response.json();
    state.events = json.data; // replaces empty array
    console.log(json.data)
    // function renderEvents()

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
        const deleteBtn = document.createElement("button")
        deleteBtn.addEventListener("click",deleteEvent)
        deleteBtn.innerText = "Delete"
        li.innerHTML = `
        <h2>${event.name}</h2>
        <p>${event.date}</p>
        <p>${event.location}</p>
        <p>${event.description}</p>
        `;
        li.append(deleteBtn)
        return li;
    });

    eventsList.replaceChildren(...eventCards);

}
// gonna attempt to do it this way soon
// function convertISO() {
//     const dateEvent = new date(eventDate)
//     let dateB = dateEvent.ISOString()
//     console.log(dateB)
// }

// convertISO()

// process of adding event to page using Post method
async function addEvent(event) {
    event.preventDefault()

    const name = eventsForm.name.value
    const date = eventDate
    const location = eventsForm.location.value
    const description = eventsForm.description.value
    
    try {
        const response = await fetch (API_URL,{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            name:name, 
            date:`${date.value}:00.000Z`,
            location:location,
            description:description,
        }),
      });
      reRender()

        if (!response.ok) {
            throw new Error("Nah, try again!")
        }
        renderEvents();
        } catch (error) {
            console.log(error.message);
        }    
    }

async function deleteEvent() {
    const response = await fetch(API_URL,
        {
            method: "DELETE"
        });
        console.log(response)
       reRender()

    }