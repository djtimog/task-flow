import mongoose from "mongoose";

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
  },
  verified: { type: Boolean, default: false },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

schema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret.password;
    delete ret._id;
    delete ret.__v;

    return ret;
  },
});

export default mongoose.model("User", schema);
