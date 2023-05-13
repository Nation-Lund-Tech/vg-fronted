export interface User {
    id: 0,
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
    passwordSalt: string
}

export interface Worker {
    id: 0,
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
    passwordSalt: string
    foodPref: string,
    bank: number,
}

interface Foreman {
    id: 0,
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
    workers: string[],
}

export interface ThankEvent {
    id: number,
    name: string,
    date: Date,
    price: number,
}