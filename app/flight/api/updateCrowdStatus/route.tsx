import clientPromise from "@/lib/mongodb";
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
    const req = await request.json();
    const { flight_id, crowd_status } = req;
    console.log(req);
    try{
        const client = await clientPromise;
        if(!client){
            return new Response('Error connecting to database', { status: 500 });
        }
        const db = client.db('live-gate');
        const id = new ObjectId(flight_id);
        const result = await db.collection('gate').updateOne({ _id: new ObjectId(flight_id) }, {
            $set: { crowd_status: crowd_status },
            $currentDate: { lastModified: true }
        });
        const updated  = await db.collection('gate').find({_id: id}).toArray();
        return new Response(JSON.stringify({ message: 'Gate status updated successfully', result: updated }), { status: 200 });
    } catch(err){
        console.log(err);
        return new Response('Error updating gate status', { status: 500 });
    }
}