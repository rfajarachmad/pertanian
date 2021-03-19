import { Input } from '@angular/core';

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    role: string;
    status: string;
}
