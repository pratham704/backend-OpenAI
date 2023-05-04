const express = require('express');
const cors = require('cors')
const app = express();
const dotenv = require('dotenv')
dotenv.config();

app.use(cors());
app.use(express.json());

const { Configuration, OpenAIApi } = require('openai')


const config = new Configuration({



    apiKey: `${process.env.API_KEY}`
})


const openai = new OpenAIApi(config);


app.post("/hello", async(req, res) => {



    const hlo = req.body.username;

    const ans = await openai.createChatCompletion({

        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: hlo }]

    }).then(e => {



        res.json(e.data.choices[0].message.content)
    })



})



app.post("/hello2", async(req, res) => {
    const hlo = req.body.username;




    const imgans = await openai.createImage({

        prompt: hlo,
        n: 1,
        size: "256x256"

    }).then(e => {



        res.json(e.data)
    })



})




















app.use("/", (req, res) => {

    res.json("heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")

})




if (process.env.API_Port) {


    app.listen(process.env.API_Port);



}

module.exports = app;
