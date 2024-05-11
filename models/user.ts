import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    maxlength: [60, "Password's Name cannot be more than 60 characters"],
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
