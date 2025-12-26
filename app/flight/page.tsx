import flightresponse from '@/Type/flight_data';
import clientPromise from '@/lib/mongodb';
import flightentry from '@/Type/flight_database_entry'
import generate_flight_data from '@/generate_flight_data';
import UpdateGate from './updated_gate_info';

export default async function Page({searchParams} : {searchParams: Promise<{flight_number: string, departure_city: string}>}) {

    const params = await searchParams;
    const { flight_number, departure_city } = params;

    let flight_document
    try{
      const client = await clientPromise;
      if(!client){
        return <div>Error connecting to database</div>
      }
      const db = client.db('live-gate');
      flight_document = await db.collection('gate').find({'flight_number': flight_number, 'departure_airport' : departure_city}).toArray()
      if(!flight_document.length){
        console.log('fetching_data')
        const data : flightresponse = generate_flight_data({departure_airport: departure_city, flight_number: flight_number});
        const new_entry : flightentry = {
            date : data.data[0].departure.scheduledTime,
            airport_code : data.data[0].departure.iataCode,
            departure_airport : data.data[0].departure.iataCode,
            flight_number : data.data[0].flight.iataNumber,
            gate : data.data[0].departure.gate ? data.data[0].departure.gate : 'Not Known',
            gate_status : 'Not known',
            queue_status : 'Not known',
            crowd_status : 'Not known',
        }
        const re = await db.collection('gate').insertOne(
          new_entry
        )
        const new_record = await db.collection('gate').find(re.insertedId).toArray()
        flight_document = new_record
        console.log('Inserted new entry:', re);
        //const response = await fetch(`https://api.aviationstack.com/v1/timetable?iataCode=${departure_city}&type=departure&airline_iata=${flight_number}&access_key=f5994424a847443c2b6bfc9582bfb8f1`)
        //const data  : flightresponse = await response.json();        
        const gate = data.data[0].departure.gate;
      }
      else{
        console.log(flight_document[0].departure_airport)
        console.log('flight_document', flight_document)
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
      <div className="m-auto pt-16 max-w-96 pb-24">
        <div className='flex justify-between mb-8'>
          <div className='p-2 bg-gray-100 rounded-md'>
          <div>Flight Number:</div><div className="font-bold">{flight_number}</div>
          </div>
          <div className='p-2 bg-gray-100 rounded-md'>
          <div>Departure City:</div><div className="font-bold">{departure_city}</div>
          </div>
          <div className='p-2 bg-gray-100 rounded-md'>
          <div>Gate:</div><div className="font-bold">{flight_document[0].gate}</div>
          </div>
        </div>
        <UpdateGate 
         flight_id={flight_document[0]._id.toString()}
         gate_status={flight_document[0].gate_status} 
         queue_status={flight_document[0].queue_status} 
         crowd_status={flight_document[0].crowd_status}
        />
      </div>
      </>
    );
}