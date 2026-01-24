import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "partner", "customer"],
      required: true,
      default: "customer",
    },
    dob: {
      type: String,
      required: true,
      default: "N/A",
    },
    gender: {
      type: String,
      enum: ["male", "female", "others", "N/A"],
      required: true,
      default: "N/A",
    },
    address: {
      type: String,
      required: true,
      default: "N/A",
    },
    city: {
      type: String,
      required: true,
      default: "N/A",
    },
    pin: {
      type: String,
      required: true,
      default: "N/A",
    },
    photo: {
      url: {
        type: String,
        default: "",
      },
      publicID: {
        type: String,
        default: "",
      },
    },

    geoLocation: {
      lat: {
        type: String,
        required: true,
        default: "N/A",
      },
      lon: {
        type: String,
        required: true,
        default: "N/A",
      },
    },

    PaymentDetails: {
      UPI: {
        type: String,
        required: true,
        default: "N/A",
      },
      account_number: {
        type: String,
        required: true,
        default: "N/A",
      },
      ifs_Code: {
        type: String,
        required: true,
        default: "N/A",
      },
    },

    restaurantName: {
      type: String,
      required() {
        return this.role === "manager";
      },
      default() { return this.role === "manager" ? "N/A" : null }
    },

    cuisine: {
      type: String,
      required() {
        return this.role === "manager";
      },
      default() { return this.role === "manager" ? "N/A" : null }

    },


  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema)
export default User;