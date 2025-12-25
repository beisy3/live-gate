import flightresponse from '@/Type/flight_data';
import dummy_data from '@/dummy.js';
      

export default async function Page({searchParams} : {searchParams: Promise<{flight_number: string, departure_city: string}>}) {

    const params = await searchParams;
    const { flight_number, departure_city } = params;

    /*const response = await fetch(`https://api.aviationstack.com/v1/timetable?iataCode=${departure_city}&type=departure&airline_iata=${flight_number}&access_key=f5994424a847443c2b6bfc9582bfb8f1`)
    const data  : flightresponse = await response.json();*/
    const data : flightresponse = dummy_data;
    const gate = data.data[0].departure.gate;
    console.log(gate)
    console.log('flight Number:', flight_number);
    console.log('departure City:', departure_city);


    return <div>Flight Page</div>;
}