import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: {type: String},
  name: {type: String, required: true},
  email: {type: String, required: true}
});

// Check if the model already exists before compiling
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;