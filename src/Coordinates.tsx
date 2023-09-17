import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import './App.css';
import logo from './compass.png';

export default function Coordinates() {

    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [accuracy, setAccuracy] = useState<number | null>(null);
    const [altitude, setAltitude] = useState<number | null>(null);
    const [altitudeAccuracy, setAltitudeAccuracy] = useState<number | null>(null);
    

    function handleOnClick() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            toast.error('Location functionality not available, check your privacy settings.')
        }
    }

    function showPosition(position: GeolocationPosition) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setAccuracy(position.coords.accuracy);
        setAltitude(position.coords.altitude);
        setAltitudeAccuracy(position.coords.altitudeAccuracy);
        toast.success('Location determined!')
    }

    function showError(error: GeolocationPositionError) {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            toast.error("User denied the request for Geolocation. Check browser privacy settings.")
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error("Location information is unavailable.")
            break;
          case error.TIMEOUT:
            toast.error("The request to get user location timed out.")
            break;
        }
      }

    return (
        <>
            <button className="button-85">
                <img src={logo} className="App-logo" alt="logo" onClick={handleOnClick} />
            </button>
            <Toaster />
            <div>
                <p>
                    Latitude: {latitude}
                </p>
                <p>
                    Longitude: {longitude}
                </p>
                <p>
                    Accuracy: {accuracy}
                </p>
                <p>
                    Altitude (meters): {altitude}
                </p>
                <p>
                    Altitude Accuracy (meter): {altitudeAccuracy}
                </p>
            </div>
        </>
    );
}