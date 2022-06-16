import { Schema, model } from 'mongoose'
import { Permissions, Role } from '../types'

const RoleSchema = new Schema<Role>({
  name: {
    type: String,
    required: true,
  },
  department: String,
  permissions: {
    type: [String],
    enum: Permissions
  },
})
const Roles = model<Role>('Roles', RoleSchema)
export default Roles
