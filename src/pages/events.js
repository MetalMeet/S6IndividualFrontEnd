import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import axios from "axios";
import {loggedIn, firebaseObserver} from "../config/firebase";


const Events = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState(null);
    const[selectedEvent, setSelectedEvent] = useState(null);
    const[error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
        const authenticated = props.authenticated;
        const token = await auth.currentUser.getIdToken();
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        axios
        .get(`https://localhost:44337/api/event?start=0&end=10`, config)
        .then((res) => {
            const events = res.data;
            setEvents(events);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setError(error);
        });
        }
        if(auth.currentUser){
            fetchData();
        }
    }, [auth.currentUser]);

    const changeEvent = (index) => {
        setSelectedEvent(events[index]);
    };

    if(error) {
        return <div>Something went wrong: {error.message}</div>;
    }
    else if(isLoading) {
        return <div>Loading...</div>;
    }
    else if(events) {
        return (
            <div>
                <select class="ml-2" onChange={evt=>changeEvent(evt.target.selectedIndex)}>
                                {events.map(function(event,i){
                                    return <option id={i}>{event.bands[0].name}</option>
                                })}
                </select>
                {selectedEvent? 
                <div>
                    {selectedEvent.bands[0].name}
                    <br/>
                    {selectedEvent.startTime}
                </div>
                :null}
            </div>
        );
    }
    else {
        return <div>No events found</div>;
    }
}
export default Events;