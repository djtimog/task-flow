import mongoose from "mongoose";

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
  },
  description: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  members: [
    {
      member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      inviteStatus: { type: Boolean, default: false },
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

schema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Project", schema);
