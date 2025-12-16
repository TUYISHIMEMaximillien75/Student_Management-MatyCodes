export interface UserInterface{
    name: string,
    email: string,
    password: string,
    role: "admin" | "student"
}

export interface LeaveInterface{
    user_id: string,
    description: string,
    isPresent: boolean
}