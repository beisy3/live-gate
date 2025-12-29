'use client'

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { CommandItem } from '@/components/ui/command';

export default function SearchAirports({airports}: {airports: string}) {
    type airportbyname = 
    {
      _id  : string,
      iata : string,
      name : string,
    }
    type airportbynameonly = 
    {
        _id  : string,
        name : string,
    }
    type airportbyiata =
    {
      _id  : string,
      iata : string,
    }

    const airports_parsed : airportbyname[] = JSON.parse(airports);
    const [searchedAirports, setSearchedAirports] = useState<airportbyname[]>([]);
    const [airport, setAirport] = useState<{visible: string, value: string}>({visible: '', value: ''});
    
    function handle_input(usr_inp: string){
        if(usr_inp.length === 0){
            setSearchedAirports([])
            return
        }
        const possible_airport_names : string[] = []
        airports_parsed.forEach((air)=>{
            if(air.name.toUpperCase().indexOf(usr_inp.toUpperCase()) === 0){
                possible_airport_names.push(air._id)
            }
        })
        const possible_airport_iatas : string[] = []
        airports_parsed.forEach((air)=>{
            if(air.iata.toUpperCase().indexOf(usr_inp.toUpperCase()) === 0){
                possible_airport_iatas.push(air._id)
            }
        })
        const sorted_array_of_ids = new Set()
        possible_airport_iatas.forEach((id)=>{
            sorted_array_of_ids.add(id)
        })
        possible_airport_names.forEach((id)=>{
            sorted_array_of_ids.add(id)
        })
        const final_possible_airport : airportbyname[] = []
        airports_parsed.forEach((air)=>{
            if(sorted_array_of_ids.has(air._id)){
                final_possible_airport.push(air)
            }
        })
        setSearchedAirports(final_possible_airport)
    }
    const max_visible : airportbyname[] = []
    for(let i=0; i<5; i++){
        if(i >= searchedAirports.length){
            break
        }
        max_visible.push(searchedAirports[i])
    }
    console.log('max visible', max_visible)


    return (
        <>
        <input required type='hidden' name='departure_city' value={airport.value}/>
        <Input required onChange={(usr_inp)=>{handle_input(usr_inp.target.value), setAirport({visible: usr_inp.target.value, value: ''})}} placeholder="Search Airports"  value={airport.visible}/>
        {searchedAirports.length > 0 ?
        <div className='grid gap-1'>
            {max_visible.map((air)=>(
                <div onClick={()=>{setAirport({visible:`${air.name} (${air.iata})`,  value : air._id}), setSearchedAirports([])}} className='bg-gray-50 hover:bg-gray-100 pl-4 py-3' key={air._id}>
                    {air.name} ({air.iata})
                </div>
            ))}
        </div>
        : null
        }
    </>
    )
}