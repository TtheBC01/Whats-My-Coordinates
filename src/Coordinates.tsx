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
            console.log("line17")
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
        switch (error.code) {
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
            <p>
                Click the compass to get your coordinates.
            </p>
            <button className="button-85" onClick={handleOnClick}>
                <img src={logo} className="App-logo" alt="logo" />
            </button>
            <Toaster />
            <div>
                <div></div>
                <table>
                    <tr>
                        <th>Long</th>
                        <th>Lat</th>
                        <th>Alt</th>
                    </tr>
                    <tr>
                        <td>{longitude?.toFixed(3)}&deg; &plusmn; {accuracy?.toFixed(1)}m</td>
                        <td>{latitude?.toFixed(3)}&deg; &plusmn; {accuracy?.toFixed(1)}m</td>
                        <td>{altitude?.toFixed(1)}m &plusmn; {altitudeAccuracy?.toFixed(1)}m</td>
                    </tr>
                </table>
            </div>
        </>
    );
}