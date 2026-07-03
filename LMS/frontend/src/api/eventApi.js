const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/events`;

//get all events
export const getAllEvents = async () => {
    const res=await fetch(BASE_URL);
    return res.json();

};


//add event
export const addEvent = async (eventData) => {
    const res=await fetch(BASE_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(eventData)
    });
    return res.json();
};

//delete event
export const deleteEvent = async (Id) => {
    await fetch(`${BASE_URL}/${Id}`,{
        method:"DELETE"
    });
    return res.ok;
}

//update event
export const updateEvent = async (Id, eventData) => {
    const res=await fetch(`${BASE_URL}/${Id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(eventData)
    });
    return res.json();
};


