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

    function UpdateDrawer({trigger, title, subtitle, options} : { trigger: string, title: string, subtitle: string, options: string[]}, callback) {
        return (
            <Drawer>
                <DrawerTrigger>{trigger}</DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>{subtitle}</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        {options.map((state) => (
                            <DrawerClose key={state}>
                            <Button className='w-64 m-auto' onClick={() => callback} >
                                {state}
                            </Button>
                            </DrawerClose>
                        ))}
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>           
        )
    }
    const boarding_states = ['Boarding not yet commenced', 'Currently boarding', 'Boarding complete'];
    const queue_states = [ 'Queues 45min+', 'Queues 30-45min', 'Queues 15-30min', 'Queues 10-15min', 'Short queue 5-10min', 'Very short less then 5min', 'Almost Finished' ];
    const crowd_states = ['Lots of People (300+)', 'Not so Many People (150)', 'Few people (50)'];
    return (
        <>
        <DisplayChangable
            tag="Current Gate Status:"
            display={gateStatus}
        />
        {gateStatus === 'Boarding' ? (
            <DisplayChangable
                tag="Current Queue Status:"
                display={queueStatus}
            />
        ) : null}
        {gateStatus === 'Not Boarding' ? (
            <DisplayChangable
                tag="Current Crowd Status:"
                display={crowdStatus}
            />
        ) : null}
        <div className='mt-12'>
            <div className='mb-6'>Let people know what the boarding status is</div>
            <div className='grid gap-8'>
                
            <Drawer>
            <DrawerTrigger>Update boarding status</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                <DrawerTitle>Update Boarding Status</DrawerTitle>
                <DrawerDescription>Give people live status of boarding.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    {boarding_states.map((state) => (
                        <DrawerClose key={state}>
                        <Button className='w-64 m-auto' onClick={() => updateGateStatus({new_gate_status: state, flight_id: flight_id})} >
                            {state}
                        </Button>
                        </DrawerClose>
                    ))}
                <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
            </Drawer>
            </div>
        </div>
        <div className='mt-12'>
            <div className='mb-6'>Let people know the current queue is upto</div>
            <div className='grid gap-8'>
            {queue_states.map((state) => (
                <Button key={state} onClick={() => updateQueueStatus(state)}>
                    {state}
                </Button>
            ))}
            </div>
        </div>
        <div className='mt-12'>
            <div className='mb-6'>Let people know how many people are still by the gate</div>
            <div className='grid gap-8'>
            {crowd_states.map((state) => (
                <Button key={state} onClick={() => updateCrowdStatus(state)}>
                    {state}
                </Button>
            ))}
            </div>
        </div>
        </>
    )

}