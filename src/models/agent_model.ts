import {Schema, model} from 'mongoose'
import { Agent, Document, Phone } from '../types'


const PhoneSchema = new Schema<Phone>({
    ddd: String,
    ddi: String,
    number: String
})
const DocumentSchema = new Schema<Document>({
    type: String,
    number: String
})
const AgentSchema = new Schema<Agent>({
    name: {
        type: String,
        required:true
    },
    email: String,
    phones: [PhoneSchema],
    document: DocumentSchema,
    birth_date: Date,
    image: String,
    department: String,
    branch: String,
    role: String,
    status: {
        type:String,
        enum:['active', 'inactive']
    }

})
const Agents = model<Agent>('Agents', AgentSchema)
export default  Agents