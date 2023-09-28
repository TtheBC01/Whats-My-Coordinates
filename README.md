# Whats My Coordinates?

This is a simple [progressive web application](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) that relies on the
[React](https://react.dev/) library for creating dynamic components. 

This tutorial repo is meant to demonstrate two userful web resources:

1. the [GeoLocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) for determining a user's location
2. [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) which is used in this application to store a user's location history on their device

## GeoLocation

A user's location is a valuable data point for many user applications to access and in some cases it is a mission critical piece of information to have in order to
deliver a service to a customer. This repo demonstrates the use of the GeoLocation API that is available in most modern browsers including Chrome and Safari. Depending on the user's device, the GeoLocation API determines location by wifi signal triangulation or by GPS (if such hardware is available on the device). You'll notice that if you use [whatsmycoordinates.com](https://whatsmycoordinates.com) on a regular laptop you'll get fairly large error bounds on your latitude and longitude accuracy and probably no estimate of your altitude. However, if you use it on your smart phone instead (assuming it has GPS) you'll get very tight accuracy estimates for latitude, longitutude, and altitude. 

You can find the utilization of the GeoLocation API inside [`Coordinates.tsx`](/src/Coordinates.tsx). Specifically, see [`handleOnClick()`](/src/Coordinates.tsx#L63) and [`getPosition()`](/src/Coordinates.tsx#L73). The function `getPosition()` is called on the successful handling of the dispatch of `navigator.geolocation.getCurrentPosition()`. In the scenario where the browser is unable to determine a user's position (for instance when a user disallows access to their location in their devices permission settings), then an error will be thrown and [`showError()`](/src/Coordinates.tsx#L119) will be called an error code that reveals more information about the nature of the error. 

## IndexedDB

Modern browsers offer the capability of storing significant amounts of data client-side on a user's own device via an unstructured database technology, supported by most major browsers, called IndexedDB. IndexedDB supports many concepts you would expect from a database technology, like versioning, schemas, cursors, and atomic transactions, but lacks traditional concepts from structured databases like tables (instead indexedDB uses a similar idea called [objectStores](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore)).

In this example application, indexedDB is used to store a user's location history in a searchable database on their device. The first time a user loads the web application, an indexedDB objectStore is created via an [`onupgradeneeded`](/src/Coordinates.tsx#L32) event. Every time a user requests that their location be calculated, the result is stored in an objectStore called [`Locations`](/src/Coordinates.tsx#L90). This objectStore persists between app visits, so a user can log their location over time and revisit where they were at a given timestamp. 
