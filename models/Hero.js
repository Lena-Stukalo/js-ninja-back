const { Schema, model } = require("mongoose");

const heroShcema =new Schema({
nickname: String,
real_name: String,
origin_description: String,
superpowers: String,
catch_phrase:String,
})
const Hero = model("hero", heroShcema);

module.exports={
  Hero
}