export interface User {
    id: string;
    isForeman: boolean;
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
    cost: number;
}