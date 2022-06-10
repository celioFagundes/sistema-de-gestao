const mongoose = require('mongoose')

const PhoneSchema = mongoose.Schema({
    ddd: String,
    ddi: String,
    number: String
})
const DocumentSchema = mongoose.Schema({
    type: String,
    number: String
})
const AgentSchema = mongoose.Schema({
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
const Agents = mongoose.model('Agents', AgentSchema)
module.exports = Agents