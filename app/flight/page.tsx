import flightresponse from '@/Type/flight_data';

export default async function Page({searchParams} : {searchParams: Promise<{flight_number: string, departure_city: string}>}) {

    const params = await searchParams;
    const { flight_number, departure_city } = params;

    const response = await fetch(`https://api.aviationstack.com/v1/timetable?iataCode=${departure_city}&type=departure&airline_iata=${flight_number}&access_key=f5994424a847443c2b6bfc9582bfb8f1`)
    const data  : flightresponse = await response.json();
    const gate = data.data[0].departure.gate;
     
    console.log('flight Number:', flight_number);
    console.log('departure City:', departure_city);
    return <div>Flight Page</div>;
}

let x= {"pagination":{"limit":null,"offset":null,"count":1,"total":1},"data":[{"aircraft":{"icao24":"010245","icaoCode":"A21N","regNumber":"SU-GFU"},"airline":{"iataCode":"MS","icaoCode":"MSR","name":"EgyptAir"},"arrival":{"actualRunway":null,"actualTime":null,"baggage":null,"delay":null,"estimatedRunway":null,"estimatedTime":null,"gate":null,"iataCode":"CAI","icaoCode":"HECA","scheduledTime":"2025-12-24T20:45:00.000","terminal":"3"},"codeshared":null,"departure":{"actualRunway":null,"actualTime":null,"baggage":null,"delay":"65","estimatedRunway":null,"estimatedTime":"2025-12-24T14:35:00.000","gate":"D2","iataCode":"MAN","icaoCode":"EGCC","scheduledTime":"2025-12-24T13:30:00.000","terminal":"2"},"flight":{"iataNumber":"MS782","icaoNumber":"MSR782","number":"782"},"status":"active","type":"departure"}]}
