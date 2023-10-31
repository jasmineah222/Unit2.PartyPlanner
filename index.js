const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FTB-ET-WEB-FT/events`;
let state =[];
const eventsForm = document.getElementById('addEvents');
const events = document.getElementById('events');
eventsForm.addEventListener("submit",addEvent)

//for adding events 
// async function reRender() {
//     await getEvents
//     renderEvents()
// }


async function getEvents() {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.events = json.data; // replaces empty array
}


// function getEvents() {

// }

// function renderEvents(){

// }



// process of adding event to page using Post method
async function addEvent() {
    event.preventDefault()

    let name = eventsForm.name.value
    let date = eventsForm.date.value
    let time = eventsForm.time.value
    let location = eventsForm.location.value
    let description = eventsForm.description.value
    
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
    })
            
}