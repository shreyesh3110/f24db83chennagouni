const mongoose = require("mongoose")
const carSchema = mongoose.Schema({
car_name: String,
model: String,
power: Number
})
module.exports = mongoose.model("Car",
carSchema)