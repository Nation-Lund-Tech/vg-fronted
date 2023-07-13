export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
    passwordSalt: string
}

export interface Worker {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
    passwordSalt: string
    foodPref: string,
    bank: number,
    lastUpdate: string ,
}

export interface Foreman {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
    passwordSalt: string
}

export interface WorkEvent {
    id: number,
    name: string,
    date: string,
    reward: number,
    workers: Worker[],
}

export interface ThankEvent {
    particpants: Worker[],
    id: number,
    name: string,
    date: string,
    price: number,
    isTack: boolean,
}