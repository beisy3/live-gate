import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Form from 'next/form';


export default function HomePage() {
  return (
    <div>
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