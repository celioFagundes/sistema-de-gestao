import { Schema, model } from 'mongoose'
import { Permissions, Role } from '../types'

const RoleSchema = new Schema<Role>({
  name: {
    type: String,
    required: true,
  },
  department: String,
  agents_count: {
    type: Number,
    default: 0,
  },
  permissions: {
    type: [String],
    enum: Permissions
  },
})
const Roles = model<Role>('Roles', RoleSchema)
export default Roles
