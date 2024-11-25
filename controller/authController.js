import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const registerController = async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;

    if (!name) {
      next("name is required");
    }
    if (!email) {
      next("email is required");
    }
    if (!password) {
      next("password is required and greater than 6 character");
    }
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      next("Email Already Register Please Login");
    }

    const user = await userModel.create({ name, email, password, lastName });
    //  const userWithoutPassword = await userModel.findById(user._id).select('-password') fore displaying user without password
    const token = user.createJWT();
    res.status(201).send({
      success: true,
      message: "user created successfully",
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
      },
      token: token,
    });
  } catch (error) {
    // res.status(400).send(error.message);
    next(error);
  }
};

// export const loginController = async(req,res,next) =>{                      //this is better for me
//   const {email,password} = req.body

//   try{
//     if(!email || !password){
//       res.status(400).send("provide all the fields")
//     }
//     const user = await userModel.findOne({email})
//     const isMatch = await bcrypt.compare(password,user.password)
//     if(isMatch){
//       const token = user.createJWT()
//       res.status(200).json({
//         user:user,
//         message:"login successful",
//         token:token
//       })
//     }else{
//       res.status(400).json({message:"wrong password"})
//     }
//   }catch(error){
//     res.status(500).json({message:error.message})
//   }
// }

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  //validate
  if (!email || !password) {
    next("Please Provide All Fields");
  }
  //find
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    next("Invalid Useraname or password");
  }
  //compare
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "wrong password" });
  }
  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login SUccessfully",
    user,
    token,
  });
};
// export const loginController = async (req, res, next) => {
//   const { email, password } = req.body;

//   try {
//     // Validate input
//     if (!email || !password) {
//       return res.status(400).send("Provide all the fields"); // Ensure to return
//     }

//     // Find user
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid username or password" }); // Handle user not found
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (isMatch) {
//       const token = user.createJWT();
//       return res.status(200).json({
//         user: user,
//         message: "Login successful",
//         token: token,
//       });
//     } else {
//       return res.status(400).json({ message: "Wrong password" }); // Password mismatch
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error.message }); // Handle server errors
//   }
// };

export default { registerController, loginController };
