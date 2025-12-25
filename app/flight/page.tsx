import flightresponse from '@/Type/flight_data';
import dummy_data from '@/dummy.js';
import clientPromise from '@/lib/mongodb';
  
export default async function Page({searchParams} : {searchParams: Promise<{flight_number: string, departure_city: string}>}) {

    const params = await searchParams;
    const { flight_number, departure_city } = params;

    let x
    try{
      const client = await clientPromise;
      //const db = client.db('live-gate');
      //x = await db.collection('gate').find({'flight_number': flight_number, 'departure_airport' : departure_city}).toArray()
      //if(!x.length){
      /*  console.log('fetching_data')
        //find new information
      }
      else{
        console.log(x[0].departure_airport)
        console.log('x', x)
      }*/
      
    } catch(err){
      console.log(err)
      return(
        <div>Error connecting to database</div>
      )
    }
    /*const response = await fetch(`https://api.aviationstack.com/v1/timetable?iataCode=${departure_city}&type=departure&airline_iata=${flight_number}&access_key=f5994424a847443c2b6bfc9582bfb8f1`)
    const data  : flightresponse = await response.json();*/
    const data : flightresponse = dummy_data;
    const gate = data.data[0].departure.gate;
    console.log(gate)
    console.log('flight Number:', flight_number);
    console.log('departure City:', departure_city);

    return <div>Flight Page</div>;
}