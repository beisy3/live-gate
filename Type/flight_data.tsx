export default interface Root {
  pagination: Pagination
  data: Daum[]
}

export interface Pagination {
  limit: any
  offset: any
  count: number
  total: number
}

export interface Daum {
  aircraft: Aircraft
  airline: Airline
  arrival: Arrival
  codeshared: any
  departure: Departure
  flight: Flight
  status: string
  type: string
}

export interface Aircraft {
  icao24: string
  icaoCode: string
  regNumber: string
}

export interface Airline {
  iataCode: string
  icaoCode: string
  name: string
}

export interface Arrival {
  actualRunway: any
  actualTime: any
  baggage: any
  delay: any
  estimatedRunway: any
  estimatedTime: any
  gate: string | null
  iataCode: string
  icaoCode: string
  scheduledTime: string
  terminal: string
}

export interface Departure {
  actualRunway: any
  actualTime: any
  baggage: any
  delay: string
  estimatedRunway: any
  estimatedTime: string
  gate: string | null
  iataCode: string
  icaoCode: string
  scheduledTime: string
  terminal: string
}

export interface Flight {
  iataNumber: string
  icaoNumber: string
  number: string
}