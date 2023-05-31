const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { hendleSave } = require("../helpers");

const heroShcema = new Schema(
  {
    nickname: { type: String, required: true, unique: true },
    real_name: { type: String, required: true },
    origin_description: { type: String, maxLength: 500, required: true },
    superpowers: { type: String, required: true },
    catch_phrase: { type: String, required: true },
    images: {
      type: [String],
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  nickname: Joi.string().required(),
  real_name: Joi.string().required(),
  origin_description: Joi.string().required(),
  superpowers: Joi.string().required(),
  catch_phrase: Joi.string().required(),
  images: Joi.array().items(Joi.string()),
});
const updateSchema = Joi.object({
  nickname: Joi.string(),
  real_name: Joi.string(),
  origin_description: Joi.string(),
  superpowers: Joi.string(),
  catch_phrase: Joi.string(),
  images: Joi.string(),
});
const addImageSchema = Joi.object({
  image: Joi.string().required(),
});
const schemas = {
  addSchema,
  updateSchema,
  addImageSchema,
};
heroShcema.post("save", hendleSave);
const Hero = model("hero", heroShcema);

module.exports = {
  Hero,
  schemas,
};
