const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    console.log(req.body);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const mailId = req.body.mailId;

    const data = {
        members: [{
            email_address: mailId,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/50c512336b";
    const options = {
        method: "POST",
        auth: "sameer:0331cbf5102c5de4ba054dfccf88da1e-us21"
    }

    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            // response.on("data", function (data) {
            //     console.log(JSON.parse(data));
            // })
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

    })

    request.write(jsonData);
    request.end();

})

app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is runnig on port 3000!!!!");
})


//API Key
//0331cbf5102c5de4ba054dfccf88da1e-us21

//Unique Id
//50c512336b
