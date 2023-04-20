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

export interface Event {
    id: string;
    name: string;
    date: string;
    participants: User[];
    capacity: number;
}

export interface User1 {    
    id: 0,
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
    passwordSalt: string
}
