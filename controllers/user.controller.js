import { User } from "../models/user.model.js";
const generateaccesstoken = (loggeduser) => {
  try {
    const refreshtoken = loggeduser.generateRefreshToken();
    const accesstoken = loggeduser.generateAccessToken();
    loggeduser.refreshtoken = refreshtoken; // Corrected variable name 'token' to 'refreshtoken'
    loggeduser.save({ validateBeforeSave: false }); // Added missing semicolon
    return { refreshtoken, accesstoken,loggeduser }; // Removed 'loggeduser' from the return object
  } catch (error) {
    console.log(`Failed during generate the accesstoken and refreshtoken: ${error}`); // Included error in the log message
    throw new Error("Failed to generate access and refresh tokens"); // Throwing error to be caught by caller
  }
};
const userRegister = async (req, res) => {
  const { username, fullname, email, password, confirmpassword,mobilenumber,address,admin } = req.body;
  if([username,fullname,email,password,confirmpassword,mobilenumber,address].some((x)=>x?.trim()===""))
    {
      throw new Error(400, "All fields are required");
    }
  if (password !== confirmpassword) {
    return res.status(400).send("Passwords do not match");
  }
  try {
    const existUser = await User.findOne({ username }).select(
      "-confirmpassword -password -_id"
    );
    if (existUser) {
      return res.status(409).send(`User ${existUser} already exists`);
    }

    
    const newUser = await User.create({
      fullname,
      password,
      username,
      email,
      mobilenumber,
      address,
      admin
    });
    res.status(201).send(`User created successfully: ${newUser}`);

    console.log(fullname);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send(`An error occurred while creating the user ${error}`);
  }
};
const getInformation = async (req, res) => {
  try {
    const user=await User.findById(req.user._id).select("-_id  -createdAt -updatedAt -refreshtoken");
     return res.status(200).send({ message: "true", user: user, });
  } catch (err) {
     console.error("Error in getInformation:", err);
     return res.status(500).send("Internal Server Error");
  }
}

const updateUser=async(req,res)=>{
   return res.status(501);
}
const LoginUser = async (req, res) => {
  const {username,password}=req.body;
  if(!(username && password))
    {
      return res.status(401).send(`both field are required`);
    }
    const isUser=await User.findOne({username});
    if(!isUser)
      {
        return res.status(401).send(`User is not found`);
      }

    const {refreshtoken,accesstoken,loggeduser}=await generateaccesstoken(isUser);
    const {admin}=(loggeduser)
    const options={
      httpOnly:true,
      secure:true,
     }
     return res.status(200).cookie("accesstoken",accesstoken,options).cookie("refreshtoken",refreshtoken,options).json({username,accesstoken,admin})
};
const LogoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      refreshtoken: null 
    });
    res.clearCookie("accesstoken").clearCookie("refreshtoken").status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error occurred during logout:", error);
    res.status(500).json({ error: "Error occurred during logout" });
  }
};

export { userRegister, LoginUser,LogoutUser,updateUser,getInformation};
