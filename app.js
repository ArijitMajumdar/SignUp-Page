
const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require('@mailchimp/mailchimp_marketing');
 
//------MailChimp Config-------//
 

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); //for including static files like css and image in a dir called public

mailchimp.setConfig({
    server:"server", //your server can be found at the end of your API-key.
    apiKey:"key",
});

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    const firstName =req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const listId = "95996f0885";

    
   
    async function run ()
    {
         try{
    const response =await mailchimp.lists.addListMember(listId, {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }     
                });
                res.sendFile(__dirname + "/success.html");
         }
            catch(err)
            {
                res.sendFile(__dirname + "/failure.html");
            }
        }
        run();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("server is running at port 3000");
});


//api key: 8e514228152cce44128f8fc7fd7041b4-us17
//list id or audience key 95996f0885
