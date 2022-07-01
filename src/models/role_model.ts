import { Schema, model, PaginateModel } from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { Permission,  Role } from '../types'

const PermissionSchema = new Schema<Permission>({
  area: String,
  enabled: [String]
})
const RoleSchema = new Schema<Role>({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  permissions: [PermissionSchema],
})
RoleSchema.plugin(paginate)
const Roles = model<Role, PaginateModel<Role>>('Roles', RoleSchema)

export default Roles
