import { Document } from "mongoose"


export interface Phone{
    ddd: string
    ddi: string
    number: string
}
export interface Identification{
    type: string
    number: string
}
export enum Status{
    Active ='active',
    Inactive ='inactive'
}
export enum Permissions{
    Read ='read',
    Write ='write',
    Delete = 'delete'
}
export interface Agent extends Document{
    name: string
    email: string
    phones: Phone[]
    identification: Identification[]
    birth_date: Date
    image: string
    department: string
    branch: string
    role: string
    status: Status
}
export interface Department extends Document{
    name: string
    branches: string[]
}
export interface Role extends Document{
    name:string
    permissions: Permissions[]
}