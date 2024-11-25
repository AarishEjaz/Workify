import userModel from "../models/userModel.js";

// export const updateUserController = async(req,res,next) =>{
//     const{name,email,lastName,location} = req.body

//     if(!name || !email || !lastName || !location){
//         return next("please provide all the fields")
//     }
//     try{
//     const user = await userModel.findOne({_id:req.user.userId})
//     user.name = name
//     user.lastName = lastName
//     user.email = email
//     user.location = location

//     await user.save()
//     const token = user.createJWT()
//     res.status(200).json({

//         user:user,
//         token:token
//     })
// }catch(error){
//     res.status(500).json({message:error.message})
// }
// }

//

export const updateUserController = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return next("provide all the fields");
  }
  const user = await userModel.findOne({ _id: req.user.userId });

  user.name = name;
  user.email = email;
  user.save();
  user.createJWT();
  res.status(200).json({
    user: user,
    token: token,
  });
};

export const getUserController = async (req, res, next) => {
  try {
    const user = await userModel.findById({ _id: req.body.user.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};

export default { updateUserController };
