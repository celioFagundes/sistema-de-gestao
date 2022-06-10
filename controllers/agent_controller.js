const AgentsModel = require('../models/agent_model')
console.log('called routes')

/*const index = async (req, res) => {
  console.log('called index')
  console.log(AgentsModel.db)
  try {
    const agents = await AgentsModel.find({})
    
    res.send(agents)
  } catch (e) {
    res.send({ success: false, errors: e })
  }
}*/
const index = async (req, res) => {
  console.log('called index')
  console.log(AgentsModel.db)
  
    
    res.send('hellou')
}
const create = async (req, res) => {
  try {
    const newAgent = await AgentsModel.create({ ...req.body })
    res.send(newAgent)
  } catch (e) {
    res.send({ success: false, errors: e })
  }
}
const update = async (req, res) => {
  try {
    const updateAgent = await AgentsModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { runValidators: true }
    )
    res.send(updateAgent)
  } catch (e) {
    res.send({ success: false, errors: e })
  }
}
const remove = async (req, res) => {
  try {
    await AgentsModel.findByIdAndDelete(req.params.id)
    res.send({
      success: true,
    })
  } catch (e) {
    res.send({ success: false, errors: e })
  }
}
module.exports = {
  index,
  create,
  update,
  remove,
}
