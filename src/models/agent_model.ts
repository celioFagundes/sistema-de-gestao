import { Schema, model,  PaginateModel, Model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { Agent, Identification, Phone, Status } from '../types'

const PhoneSchema = new Schema<Phone>({
  ddd: String,
  ddi: String,
  number: String,
})
const IdentificationSchema = new Schema<Identification>({
  type: String,
  number: String,
})
const AgentSchema = new Schema<Agent>({
  name: {
    type: String,
    required: true,
  },
  email: String,
  phones: [PhoneSchema],
  identification: IdentificationSchema,
  birth_date: Date,
  image: String,
  department: String,
  branch: String,
  role: String,
  status: {
    type: String,
    enum: Status,
  },
})

AgentSchema.plugin(paginate)

const Agents = model<Agent, PaginateModel<Agent>>('Agents', AgentSchema)
export default Agents
