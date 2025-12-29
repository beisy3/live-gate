import flightresponse from '@/Type/flight_data';
import clientPromise from '@/lib/mongodb';
import flightentry from '@/Type/flight_database_entry'
import generate_flight_data from '@/generate_flight_data';
import UpdateGate from './updated_gate_info';
import { ObjectId } from 'mongodb';
import DisplayChangable from './changable_info';

export default async function Page({searchParams} : {searchParams: Promise<{flight_number: string, departure_city: string}>}) {

    const params = await searchParams;
    const { flight_number, departure_city } = params;
    console.log('Params received at page.tsx', params);
    let flight_document
    let airport
    try{
      const client = await clientPromise;
      if(!client){
        return <div>Error connecting to database</div>
      }
      const db = client.db('live-gate');
      airport = (await db.collection('airports').find({_id: new ObjectId(departure_city)}).toArray())[0]
      flight_document = await db.collection('gate').find({'flight_number': flight_number, 'airport_data.id' : new ObjectId(departure_city)}).toArray()
      console.log('flight document fetched from db', flight_document)
      if(!flight_document.length){
        console.log('fetching_data')
        const data : flightresponse = generate_flight_data({iata_code: airport.iata, flight_number: flight_number});
        const new_entry = {
            date : data.data[0].departure.scheduledTime,
            flight_number : data.data[0].flight.iataNumber,
            gate : data.data[0].departure.gate ? data.data[0].departure.gate : 'Not Known',
            gate_status : 'Not known',
            queue_status : 'Not known',
            crowd_status : 'Not known',
            airport_data : {
              id : airport._id,
              airport_code : data.data[0].departure.iataCode,
              departure_airport : airport.name,
            },
        }
        console.log('new entry to be added', new_entry)
        const re = await db.collection('gate').insertOne(
          new_entry
        )
        const new_record = await db.collection('gate').find(re.insertedId).toArray()
        flight_document = new_record
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

    function FlightInformation({ tag, display } : { tag: string, display: string}) {
      return (
        <div className='p-2 flex justify-between'>
          <div>{tag}:</div><div className="font-bold">{display}</div>
        </div>
      )
    }

    return (
      <>
      <div className="m-auto pt-16 max-w-96 pb-24">
        <div className='mb-8 grid gap-4'>
          <FlightInformation tag="Flight Number" display={flight_number} />
          <FlightInformation tag="Departure City" display={airport.name} />
        </div>
        <DisplayChangable
            tag="Current Gate:"
            display={flight_document[0].gate}
        />
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