import { useState } from "react";

export default function Coordinates() {

    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    function handleOnClick() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Error: Geolocation not available")
        }
    }

    function showPosition(position: GeolocationPosition) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    }

    return (
        <>
            <button onClick={handleOnClick}>
                What's my Coordinates?
            </button>
            <div>
                <p>
                    Latitude: {latitude}
                </p>
                <p>
                    Longitude: {longitude}
                </p>
            </div>
        </>
    );
}