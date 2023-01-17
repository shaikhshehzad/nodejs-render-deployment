const UsersModel = require("../Models/UsersModel");

exports.RegisterNewUser = (Request, Response) => {
    const { Name, Email, Password, DateOfBirth, Avatar, isAdmin, } = Request.body;

    if (!Name) {
        Response.status(400).json({
            status: false,
            message: "Name is missing...!"
        });
    } else if (!Email) {
        Response.status(400).json({
            status: false,
            message: "Email is missing...!"
        });
    } if (!Password) {
        Response.status(400).json({
            status: false,
            message: "Password is missing...!"
        });
    } else {

        UsersModel.find({Email}).then((User) => {
            if(User.length > 0){
                Response.status(400).json({
                    status: false,
                    message: "This user already exist...!"
                });

            } else {
                const NewUser = new UsersModel({
                    Name,
                    Email,
                    Password,
                    DateOfBirth,
                    Avatar,
                    isAdmin,
                    Verified: false
                });
        
                NewUser.save().then((Result) => {
                    if (Result) {
                        Response.status(200).json({
                            status: true,
                            message: "Registered successfully...!",
                            id: Result._id
                        })
                    }
        
                }).catch((Error) => {
                    Response.status(500).json({
                        status: false,
                        message: Error.message
                    })
                });
            }

        }).catch((Error) => {
            Response.status(500).json({
                status: false,
                message: Error.message
            })
        });
    };
};