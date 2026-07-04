const BASE_URL = "http://localhost:8080/api/events";

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
    const res = await fetch(`${BASE_URL}/${Id}`, {
        method: "DELETE"
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to delete event");
    }

    return true;
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


