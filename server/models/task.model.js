import mongoose from "mongoose";

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
  },
  description: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  isDone: Boolean,
});

schema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Task", schema);
