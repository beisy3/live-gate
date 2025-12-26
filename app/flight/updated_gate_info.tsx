'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import flightentry from '@/Type/flight_database_entry';
export default function UpdateGate({flight_id, gate_status, queue_status, crowd_status} : {flight_id : string, gate_status: string, queue_status: string, crowd_status: string}) {
    const [gateStatus, setGateStatus] = useState(gate_status);
    const [queueStatus, setQueueStatus ] = useState(queue_status);
    const [ crowdStatus, setCrowdStatus ] = useState(crowd_status);
    
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
    const boarding_states = ['Not Boarding', 'Boarding', 'Closed Boarding'];
    const queue_states = [ 'Queues 45min+', 'Queues 30-45min', 'Queues 15-30min', 'Queues 10-15min', 'Short queue 5-10min', 'Very short less then 5min', 'Almost Finished' ];
    const crowd_states = ['Lots of People (300+)', 'Not so Many People (150)', 'Few people (50)'];
    return (
        <>
        <div className="flex justify-between bg-gray-200 rounded-md px-4 py-6">
            <div>Current Gate Status:</div><div className='font-bold'>{gateStatus}</div>
        </div>
        {gateStatus === 'Boarding' ? (
            <div className="flex justify-between bg-gray-200 rounded-md px-4 py-6 mt-4">
                <div>Current Queue Status:</div><div className='font-bold'>{queueStatus}</div>
            </div>
        ) : null}
        {gateStatus === 'Not Boarding' ? (
            <div className="flex justify-between bg-gray-200 rounded-md px-4 py-6 mt-4">
                <div>Current Crowd Status:</div><div className='font-bold'>{crowdStatus}</div>
            </div>
        ) : null}
        <div className='mt-12'>
            <div className='mb-6'>Let people know what the boarding status is</div>
            <div className='grid gap-8'>
            {boarding_states.map((state) => (
                <Button key={state} onClick={() => updateGateStatus({new_gate_status: state, flight_id: flight_id})} >
                    {state}
                </Button>
            ))}
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