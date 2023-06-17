const express = require('express')
const EmailStructure = require('./models/emailmodel')
const mail = require('./Services/emailService')
const cors = require('cors');
const app = express()

app.use(express.json())
app.use(cors())
//routes
app.get('/',(req,res)=>{
    res.send("Email Server is Running")
})

app.post('/SendMail',async (req,res)=>{
    const emailTOSend = new EmailStructure(req.body)
    emailTOSend.toAddresses.forEach(mailID => {
        console.log(mailID)
    });
    var mailResp = await mail(req.body)
    res.send(mailResp)
})

app.listen(3000,()=>{
    console.log("Node API is running on port 3000")
})


