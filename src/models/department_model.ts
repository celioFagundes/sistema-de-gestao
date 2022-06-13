import {Schema, model,} from 'mongoose'
import { Department} from '../types'



const DepartmentSchema = new Schema<Department>({
    name: {
        type: String,
        required:true
    },
    branches: [String],

})
const Departments = model<Department>('Departments', DepartmentSchema)
export default  Departments