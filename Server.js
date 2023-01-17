/********************* Import The Required Pakages *********************/
require("dotenv").config();
const Express = require("express");
const BodyParser = require("body-parser");
const cors = require("cors")
const Mongoose = require("mongoose");

/********************* Import The Routes *********************/
const UserRouter = require("./Routers/UsersRouter");

/********************* Initialise The Libraries *********************/
const App = Express();
App.use(BodyParser.json());

/********************* Handle The CORS *********************/
App.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

/********************* Start Using The Routes *********************/
App.use("/", UserRouter);

/********************* Declare The PORT *********************/
const PORT = process.env.PORT || 7000;

/********************* Connect To MongoDB *********************/
const URI = process.env.MONGODB_URL;

Mongoose.set('strictQuery', true);
Mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(Success => {
    if (Success) {
        console.log("Connected to MongoDB");

        ///**************** Start The Server ****************///

        App.listen(PORT, () => {
            console.log(`Server is listening at Port : ${PORT}`)
        });
    }

}).catch(Error => {
    console.log("Connection Error" + Error);
});