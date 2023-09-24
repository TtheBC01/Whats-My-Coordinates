import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import './App.css';
import logo from './compass.png';

export default function Coordinates() {

    const IDBVersion: number = 1; 

    // when the application is loaded, initialize an IndexedDB instance
    // and create and objectStore for location data
    useEffect(() => {
        const request: IDBOpenDBRequest = window.indexedDB.open('LocationHistory', IDBVersion)

        // happy path: log successful db connection
        request.onsuccess = function (event: Event) {
            if (!event.target) return;
            const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
            console.log("IndexDB Initialized!");
            db.close();
        }

        // sad path: log failure to connect
        request.onerror = function (event: Event) {
            if (!event.target) return;
            const target = event.target as any;
            console.log(`Database error: ${target.errorCode}`)
            toast.error('Error finding location history, see console.')
        }

        // callback for when a change must be applied to the IDB schema
        request.onupgradeneeded = (event: Event) => {
            if (!event.target) return;
            console.log("Upgrading DB Version.")
            const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;

            // create an objectStore using timestamp as the keyPath since it will be unique
            db.createObjectStore("Locations", { autoIncrement: true });
        };
    }, [])

    // primary user location datatype
    interface Location {
        timestamp: number;
        longitude: number;
        latitude: number;
        accuracy: number;
        altitude: number;
        altitudeAccuracy: number;
    }

    // primary state hook
    const [location, setLocation] = useState<Location>({
        timestamp: 0,
        longitude: 0,
        latitude: 0,
        accuracy: 0,
        altitude: 0,
        altitudeAccuracy: 0
    });

    // called when user clicks the primary button on the web application
    function handleOnClick() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition, showError);
        } else {
            toast.error('Location functionality not available, check your privacy settings.')
        }
    }

    // GeoLocation API handler for successful call 
    // saves your location history to your device via IndexedDB
    function getPosition(position: GeolocationPosition) {
        let myLocation: Location = {
            timestamp: position.timestamp,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude ? position.coords.altitude : 0,
            altitudeAccuracy: position.coords.altitudeAccuracy ? position.coords.altitudeAccuracy : 0
        };
        setLocation(myLocation);

        const request: IDBOpenDBRequest = window.indexedDB.open('LocationHistory', IDBVersion)

        // happy path: save the location to user's location history
        request.onsuccess = function (event: Event) {
            if (!event.target) return;
            const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
            const transaction: IDBTransaction = db.transaction(["Locations"], "readwrite");
            transaction.oncomplete = (event: Event) => {
                console.log("Location stored!")
            }

            transaction.onerror = (event: Event) => {
                toast.error("Problem saving location history.")
            }

            const objectStore: IDBObjectStore = transaction.objectStore("Locations");
            const txRequest = objectStore.add(myLocation);
            txRequest.onsuccess = (event: Event) => {
                console.log("Successfully saved location!")
            }
            db.close();
        }

        // sad path: log failure to connect
        request.onerror = function (event: Event) {
            if (!event.target) return;
            const target = event.target as any;
            console.log(`Database error: ${target.errorCode}`)
            toast.error('Error finding location history, see console.')
        }

        toast.success('Location determined!')
    }

    // GeoLocation API Error Handler
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
                    <tbody>
                        <tr>
                            <th>Long.</th>
                            <th>Lat.</th>
                            <th>Alt.</th>
                        </tr>
                        <tr>
                            <td>{location.longitude?.toFixed(3)}&deg; &plusmn; {location.accuracy?.toFixed(1)}m</td>
                            <td>{location.latitude?.toFixed(3)}&deg; &plusmn; {location.accuracy?.toFixed(1)}m</td>
                            <td>{location.altitude?.toFixed(1)}m &plusmn; {location.altitudeAccuracy?.toFixed(1)}m</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}