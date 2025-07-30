import express from "express";
import {config} from "dotenv";
import cors from "cors";
import {sendEmail} from "./utils/sendEmail.js"

const app =  express()
const router = express.Router();
config({path: "./config.env"});

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true
  })
);
 app.use(express.json());
 app.use(express.urlencoded({extended: true}));

router.get("/",(req,res,next) => {
    res.json({sucess:true,message: "HABIBI COME TO DUBAI"});
}) 

router.post("/send/mail", async(req,res,next) =>{
    const{name,email,message} = req.body;
    if(!name || !email || !message) {
        return next(
          res.status(400).json({
            sucess:false,
            message: "Please provide all details"
          })
        );
    }
    try {
        await sendEmail({
            email: "altafrazaraza037@gmail.com",
            subject: "GYM WEBSITE CONTACT",
            message,
            userEmail: email,
        });
        res.status(200).json({
            sucess:true,
            message:"Message Sent Sucessfully."
        })
        
    } catch (error) {
        res.status(500).json({
            sucess:false,
            message:'Internal Server Error.'
        })
    }
})
app.use(router);


app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`);
})