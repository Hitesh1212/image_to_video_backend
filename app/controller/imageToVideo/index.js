const UserModel = require('../../model/userModel');
const VideoGeneratedModal = require('../../model/videoGeneratedModel');

const { generateVideo, retrieveVideo} = require('../../utils/aiModel');

const cloudinary = require('../../utils/cloudinary');


const uploadImage = async (req, res) => {

    try{


        const file = req.file.path;

       const {prompt} = req.body;

        if(file){

            let file_url='';

          const cloudRes=  await cloudinary.uploader.upload(file, (err, result) => {
            if(err){
                return res.status(400).json({
                    status: 'fail',
                    message: err.message
                })
            }
           //console.log('result', result)

            file_url = result?.secure_url

          })
          // console.log('file_url', file_url)
          // we can save image in cloud database and send that image url in this file_url

        const genId = await generateVideo(prompt, file_url);

        if (!genId) {
            console.log('Id not generated')
            res.status(422).json({
                    status: 'fail',
                    message: ' video not generated',
                    data: {}
                });
        };

        const timeout = 120000; // 2 minutes in milliseconds
        const intervalTime = 5000; // 5 seconds in milliseconds
        const startTime = Date.now();

        const interval = setInterval(async () => {
            if (Date.now() - startTime >= timeout) {
            console.log('Timeout reached. Stopping.');
            clearInterval(interval);
             res.status(422).json({
                    status: 'fail',
                    message: ' Timeout reached. Stoping.',
                    data: {}
                });
            }

            const responseData = await retrieveVideo(genId);
            if (!responseData) {
            console.log('No response from API.');
            clearInterval(interval);
             res.status(422).json({
                    status: 'fail',
                    message: 'no response from Api.',
                    data: {}
                });
            }

            const status = responseData.status;
            console.log(`Status: ${status}`);

            if (status !== 'generating' && status !== 'queued' && status !== 'waiting') {
            console.log('Generation complete:', responseData);
            clearInterval(interval);

             const genId = responseData.id;
            const videoUri = responseData.video[0];
                
             const saveData = await VideoGeneratedModal.create(
                {
                    generated_id: genId,
                    video_url: videoUri,
                    user_id: req.user._id
                }
            )

              res.status(200).json({
                    status: 'success',
                    message: 'response data',
                    data: saveData
                });


            }
        }, intervalTime);

        }

        

    }catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

const getAllVideo = async (req, res) => {
    try {

        const allData = await VideoGeneratedModal.find({user_id: req.user?._id})
        

        res.status(200).json({
            status: 'success',
            message: 'video data',
            data: allData,
        });

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

module.exports = {
    uploadImage,
    getAllVideo,
}