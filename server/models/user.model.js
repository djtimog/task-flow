import mongoose from "mongoose";

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    unique: true,
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
    unique: true,
  },
  verified: { type: Boolean, default: false },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  participatingProjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  assignedTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
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
