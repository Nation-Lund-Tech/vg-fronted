export interface User {
    id: 0,
    firstName: string,
    lastName: string,
    email: string,
    foodPref: string,
    passwordHash: string,
    passwordSalt: string,
    bank: number,
}

export interface WorkEvent {
    foreman: string,
    workers: User[],
    id: number,
    name: string,
    date: string,
}