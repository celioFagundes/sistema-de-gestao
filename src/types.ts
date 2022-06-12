export interface Phone{
    ddd: string
    ddi: string
    number: string
}
export interface Document{
    type: string
    number: string
}
export enum Status{
    Active ='active',
    Inactive ='inactive'
}
export interface Agent {
    name: string
    email: string
    phones: Phone
    document: Document
    birth_date: Date
    image: string
    department: string
    branch: string
    role: string
    status: Status
}