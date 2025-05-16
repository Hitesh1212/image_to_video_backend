
const UserModel = require('../../model/userModel');
 
const generateToken = require('../../utils/generateToken');


const register = async(req, res) => {
    try{
        const {email,
             password,
             name
            } = req.body;


            const emailCheck = await UserModel.find({email});

            if(emailCheck.length > 0){
                return res.status(422).json(
                    {
                        status: 'fail',
                        message: 'Email Address already registered',
                        data: {}
                    }
                )
            };


            const createUser = await UserModel.create({
                email,
                password,
                name
            });


            res.status(201).json(
                {
                    status: 'success',
                    message: ' New User Register',
                    token: generateToken(createUser._id),
                    data: createUser,
                    
                }
            )
            

    }catch(error){
        res.status(500).json(
            {
                status: 'fail',
                message: error.message
            }
        )
    }
};


const login = async(req, res) => {
    try{
        console.log(req.body);
        const {email, password} = req.body;

        const getUser = await UserModel.findOne({email});
         
        if(getUser && (await getUser.matchPassword(password))){
            let newData = await UserModel.findOne({_id: getUser._id})
            

            res.status(200).json(
                {
                    status: 'success',
                    message: 'Login Successful',
                    token: generateToken(newData._id),
                    data: newData
                }
            )
        }else{
            res.status(422).json(
                {
                    status: 'fail',
                    message: 'Invalid Email Or Password',
                    
                }
            )
        }


    }catch(error){
        res.status(500).json(
            {
                status:'fail',
                message: error.message
            }
        )
    }
};

const getSingleUser = async (req, res) => {
    try {

        const getUser = await UserModel.findOne({_id: req.user?._id})
        

        res.status(200).json({
            status: 'success',
            message: 'Single User',
            data: getUser,
        });

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

module.exports = {
    register,
    login,
    getSingleUser,
};