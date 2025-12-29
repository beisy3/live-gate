import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Form from 'next/form';
import clientPromise from '@/lib/mongodb';
import SearchAirports from "./search_airports";


export default async function HomePage() {
  type airportbyname = 
    {
      _id  : string,
      iata : string,
      name : string,
    }
  
  let airports
  try{
    const client = await clientPromise;
    if(!client){
      return <div>Error connecting to database</div>
    }
    const db = client.db('live-gate');
    airports  = await db.collection('airports').find().project<airportbyname>({'name':1, 'iata':2}).toArray()
  } catch(err){
    console.log(err)
    return(
      <div>Error connecting to database</div>
    )
  }
  console.log('airports', airports)
  return (
  <>
    <div className='bg-gray-300 text-center py-2'>Flying? Get highly detailed updates about the gate you are flying from</div>
    <div className="max-w-96 m-auto mt-16">
      <Form action={'/flight/'}>
      <div className="grid gap-8">
        <div className="grid gap-3">
          <Label htmlFor="flight-number">Please enter your flight number:</Label>
          <Input required id="flight-number" name="flight_number" placeholder="Flight Number"/>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="departure-city">Where are you departing from?</Label>
          <SearchAirports airports={JSON.stringify(airports)} />
        </div>
      </div>
      <Button className="mt-7 w-full" type="submit">Find gate information</Button>
      </Form>
    </div>
    </>
  );
}