import {Schema, model, PaginateModel,} from 'mongoose'
import  paginate  from 'mongoose-paginate-v2'
import { Department} from '../types'



const DepartmentSchema = new Schema<Department>({
    name: {
        type: String,
        required:true
    },
    branches: [String],

})
DepartmentSchema.plugin(paginate)
const Departments = model<Department, PaginateModel<Department>>('Departments', DepartmentSchema)

export default  Departments