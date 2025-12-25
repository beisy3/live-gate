import flightresponse from '@/Type/flight_data';
import dummy_data from '@/dummy.js';
import clientPromise from '@/lib/mongodb';
import flightentry from '@/Type/flight_database_entry'
import generate_flight_data from '@/generate_flight_data';
  
export default async function Page({searchParams} : {searchParams: Promise<{flight_number: string, departure_city: string}>}) {

    const params = await searchParams;
    const { flight_number, departure_city } = params;

    let x
    try{
      const client = await clientPromise;
      if(!client){
        return <div>Error connecting to database</div>
      }
      const db = client.db('live-gate');
      x = await db.collection('gate').find({'flight_number': flight_number, 'departure_airport' : departure_city}).toArray()
      if(!x.length){
        console.log('fetching_data')
        const data : flightresponse = generate_flight_data({departure_airport: departure_city, flight_number: flight_number});
        const new_entry : flightentry = {
            date : data.data[0].departure.scheduledTime,
            airport_code : data.data[0].departure.iataCode,
            departure_airport : data.data[0].departure.iataCode,
            flight_number : data.data[0].flight.iataNumber,
            gate : data.data[0].departure.gate ? data.data[0].departure.gate : 'Not Known',
        }
        const re = await db.collection('gate').insertOne(
          new_entry
        )
        console.log('Inserted new entry:', re);
        //const response = await fetch(`https://api.aviationstack.com/v1/timetable?iataCode=${departure_city}&type=departure&airline_iata=${flight_number}&access_key=f5994424a847443c2b6bfc9582bfb8f1`)
        //const data  : flightresponse = await response.json();        
        const gate = data.data[0].departure.gate;
      }
      else{
        console.log(x[0].departure_airport)
        console.log('x', x)
      }
    } catch(err){
      console.log(err)
      return(
        <div>Error connecting to database</div>
      )
    }
    
    console.log('flight Number:', flight_number);
    console.log('departure City:', departure_city);

    return (
      <>
        <div>Flight Page</div>
        <div>Flight Number: {flight_number}</div>
        <div>Departure City: {departure_city}</div>
        <div>Gate: {x[0].gate}</div>
        <div>Boarding status: {x[0].status}</div>
      </>
    );
}