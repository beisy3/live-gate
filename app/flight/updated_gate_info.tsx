'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import flightentry from '@/Type/flight_database_entry';
import DisplayChangable from './changable_info';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function UpdateGate({flight_id, gate_status, queue_status, crowd_status} : {flight_id : string, gate_status: string, queue_status: string, crowd_status: string}) {
    const [gateStatus, setGateStatus] = useState(gate_status);
    const [queueStatus, setQueueStatus ] = useState(queue_status);
    const [ crowdStatus, setCrowdStatus ] = useState(crowd_status);
    const [showUpdateboarding, setShowUpdateboarding] = useState(false);
    
    function updateGateStatus({new_gate_status, flight_id} : {new_gate_status: string, flight_id: string}) {
        fetch('/flight/api/updateGate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                flight_id: flight_id,
                gate_status: new_gate_status,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            const updated : flightentry[] = data.result
            setGateStatus(updated[0].gate_status);
            setQueueStatus(updated[0].queue_status);
            setCrowdStatus(updated[0].crowd_status);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    function updateQueueStatus(new_queue_status: string){
        fetch('/flight/api/updateQueueStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                flight_id: flight_id,
                queue_status: new_queue_status,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            const updated : flightentry[] = data.result
            setGateStatus(updated[0].gate_status);
            setQueueStatus(updated[0].queue_status);
            setCrowdStatus(updated[0].crowd_status);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    function updateCrowdStatus(new_crowd_status: string){
        fetch('/flight/api/updateCrowdStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                flight_id: flight_id,
                crowd_status: new_crowd_status,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            const updated : flightentry[] = data.result
            setGateStatus(updated[0].gate_status);
            setQueueStatus(updated[0].queue_status);
            setCrowdStatus(updated[0].crowd_status);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    const boarding_states = ['Boarding not yet commenced', 'Currently boarding', 'Boarding complete'];
    const queue_states = [ 'Queues 45min+', 'Queues 30-45min', 'Queues 15-30min', 'Queues 10-15min', 'Short queue 5-10min', 'Very short less then 5min', 'Almost Finished' ];
    const crowd_states = ['Lots of People (300+)', 'Not so Many People (150)', 'Few people (50)'];
    return (
        <>
        <DisplayChangable
            tag="Gate Status:"
            display={gateStatus}
            classes='font-semibold'
        />

        {gateStatus === boarding_states[0] || gateStatus === boarding_states[1] ? (
            <DisplayChangable
                tag="Crowd Status:"
                display={crowdStatus}
                classes='font-semibold'
            />
        ) : <DisplayChangable
                tag="Crowd Status:"
                display={'Boarding already complete'}
                classes='italic'
        />}

        {gateStatus === boarding_states[0] || gateStatus === boarding_states[1] ? (
            <>
            <DisplayChangable
                tag="Queue Status:"
                display={queueStatus}
                classes='font-semibold'
            />
            </>
        ) : <DisplayChangable
                tag="Queue Status:"
                display={'Boarding already complete'}
                classes='italic'
        />}
        <div className='grid gap-5 w-full pl-3 mt-12'>
            <div className='py-4'>Share updates about the gate your flying from</div>
        <div>                
            <Drawer>
            <DrawerTrigger asChild><Button>Update boarding status</Button></DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                <DrawerTitle>Update Boarding Status</DrawerTitle>
                <DrawerDescription>Give people live status of boarding.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    {boarding_states.map((state) => (
                        <DrawerClose key={state} asChild>
                        <Button key={state} className='w-64 m-auto' onClick={() => updateGateStatus({new_gate_status: state, flight_id: flight_id})} >
                            {state}
                        </Button>
                        </DrawerClose>
                    ))}
                <DrawerClose asChild>
                    <Button className='w-64 m-auto' variant="outline">Close</Button>
                </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
            </Drawer>
        </div>
        <div>
            <Drawer>
            {
            gateStatus === boarding_states[0] || gateStatus === boarding_states[1] ? (
            <DrawerTrigger asChild><Button>Update crowd status</Button></DrawerTrigger>
            ):(
            <   DrawerTrigger asChild><Button disabled>Update crowd status</Button></DrawerTrigger>
            )
            }
            <DrawerContent>
                <DrawerHeader>
                <DrawerTitle>Update Crowd Status</DrawerTitle>
                <DrawerDescription>Give people live status of crowd.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    {crowd_states.map((state) => (
                        <DrawerClose key={state} asChild>
                        <Button key={state} className='w-64 m-auto' onClick={() => updateCrowdStatus(state)} >
                            {state}
                        </Button>
                        </DrawerClose>
                    ))}
                <DrawerClose asChild>
                    <Button className='w-64 m-auto' variant={'secondary'}>Close</Button>
                </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
            </Drawer>
        </div>
        <div>
            <Drawer>
            {gateStatus === boarding_states[0] || gateStatus === boarding_states[1] ? (
            <DrawerTrigger asChild><Button>Update queue status</Button></DrawerTrigger>
            ):(
            <   DrawerTrigger asChild><Button disabled>Update queue status</Button></DrawerTrigger>
            )
            }
            <DrawerContent>
                <DrawerHeader>
                <DrawerTitle>Update Queue Status</DrawerTitle>
                <DrawerDescription>Give people live status of queue.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    {queue_states.map((state) => (
                        <DrawerClose key={state} asChild>
                        <Button key={state} className='w-64 m-auto' onClick={() => updateQueueStatus(state)} >
                            {state}
                        </Button>
                        </DrawerClose>
                    ))}
                <DrawerClose asChild>
                    <Button className='w-64 m-auto' variant={'secondary'}>Close</Button>
                </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
            </Drawer>
        </div>
        </div>
        </>
    )

}