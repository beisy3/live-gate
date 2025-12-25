import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Form from 'next/form';
import { dbConnectionStatus } from "@/db/connection-status";
import clientPromise from '@/lib/mongodb';


export default async function HomePage() {
  let st
  async function Status(){
    st = await dbConnectionStatus()
    return(
      <div>{st}</div>
    )
  }
  let x
  try{
    const client = await clientPromise;
    const db = client.db('Gate-data');
    x = await db.collection('flight-info').find({}).toArray()
    console.log('x', x)
  } catch(err){
    console.log(err)
    return(
      <div>Error connecting to database</div>
    )
  }
  return (
    <div>
      <div>departure airport: {x[0].departure_airport}</div>
      <Status/>
      <Form action={'/flight/'}>
      <Label htmlFor="flight-number">Please enter your flight number:</Label>
      <Input id="flight-number" name="flight_number" placeholder="Flight Number"/>
      <Label htmlFor="departure-city">Where are you departing from?</Label>
      <Input id="departure-city" name="departure_city" placeholder="Departure City"/>
      <Button type="submit">Find details</Button>
      </Form>
    </div>
  );
}