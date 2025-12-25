import { randomInt } from "node:crypto";

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function generate_flight_data({departure_airport, flight_number}) {
    return {
        "pagination":
        {"limit":null,"offset":null,"count":1,"total":1},
        "data":
        [{"aircraft":{"icao24":"010245","icaoCode":"A21N","regNumber":"SU-GFU"},
            "airline":{"iataCode":"MS","icaoCode":"MSR","name":"EgyptAir"},
        "arrival":
        {
            "actualRunway":null,
            "actualTime":null,
            "baggage":null,
            "delay":null,
            "estimatedRunway":null,
            "estimatedTime":null,
            "gate":null,
            "iataCode":"CAI",
            "icaoCode":"HECA",
            "scheduledTime":"2025-12-24T20:45:00.000",
            "terminal":"3"
        },
        "codeshared":null,
        "departure":{
            "actualRunway":null,
            "actualTime":null,
            "baggage":null,
            "delay":"65",
            "estimatedRunway":null,
            "estimatedTime":"2025-12-24T14:35:00.000",
            "gate": alphabet[randomInt(0, alphabet.length)] + randomInt(1, 30).toString(),
            "iataCode":departure_airport,
            "icaoCode":"EGCC",
            "scheduledTime":new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            "terminal": randomInt(1, 4).toString()
        },
        "flight":{
            "iataNumber":flight_number,
            "icaoNumber":flight_number,
            "number":flight_number.replace(/[A-Za-z]/g, "")
        },
        "status":"active",
        "type":"departure"
    }]
    }
}