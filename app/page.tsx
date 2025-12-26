import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Form from 'next/form';
import clientPromise from '@/lib/mongodb';

export default async function HomePage() {
  let x
  try{
    const client = await clientPromise;
    if(!client){
      return <div>Error connecting to database</div>
    }
    const db = client.db('Gate-data');
    x = await db.collection('flight-info').find({}).toArray()
  } catch(err){
    console.log(err)
    return(
      <div>Error connecting to database</div>
    )
  }
  return (
    <div className="max-w-96 m-auto mt-16">
      <Form action={'/flight/'}>
      <div className="grid gap-8">
        <div className="grid gap-3">
          <Label htmlFor="flight-number">Please enter your flight number:</Label>
          <Input id="flight-number" name="flight_number" placeholder="Flight Number"/>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="departure-city">Where are you departing from?</Label>
          <Input id="departure-city" name="departure_city" placeholder="Departure City"/>
        </div>
      </div>
      <Button className="mt-7 w-full" type="submit">Find gate information</Button>
      </Form>
    </div>
  );
}