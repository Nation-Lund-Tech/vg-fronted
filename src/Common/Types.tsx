export interface User {
    id: number;
    isForeman: boolean;
    department: string;
    isAdmin: boolean;
    firstName: string;
    lastName: string;
    email: string;
    foodPreferences: string[];
    balance: number;
}

export interface WorkEvent {
    foreman: string,
    workers: User1[],
    id: number,
    name: string,
    date: string,
}

export interface User1 {    
    id: 0,
    firstName: string,
    lastName: string,
    email: string,
    foodPref: string,
    passwordHash: string,
    passwordSalt: string,
    bank: number,
}
