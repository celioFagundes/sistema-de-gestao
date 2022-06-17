import { Schema, model, PaginateModel } from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { Permissions, Role } from '../types'

const RoleSchema = new Schema<Role>({
  name: {
    type: String,
    required: true,
  },
  department: String,
  permissions: {
    type: [String],
    enum: Permissions,
  },
})
RoleSchema.plugin(paginate)
const Roles = model<Role, PaginateModel<Role>>('Roles', RoleSchema)

export default Roles
