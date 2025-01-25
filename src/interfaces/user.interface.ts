export interface User { 
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    isActive: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface UserCreateDto {
    name: string;
    email: string;
    password: string;
    role: string;
}