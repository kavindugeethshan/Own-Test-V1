import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true
    },

    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    isAdmin: {
      type: Boolean,
      default: false
    },

    isBlocked: {
      type: Boolean,
      default: false
    },

    isEmailVerified: {
      type: Boolean,
      default: false
    },

    image: {
      type: String,
      default: "/default-profile.png"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;