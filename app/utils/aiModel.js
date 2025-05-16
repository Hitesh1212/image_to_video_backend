const axios = require('axios');
const dotenv = require('dotenv').config();
const {OpenAI} = require('openai');

const url = process.env.AIML_URL;

const headers = {
    Authorization: `Bearer ${process.env.AIML_API_KEY}`,
    'Content-Type': 'application/json',
}

// genrate video
const generateVideo = async(prompt, imageUrl) => {

  const payload = {
    model: process.env.AIML_MODEL_NAME,
    prompt: prompt,
    ratio: '16:9',
    duration: 5,
    image_url: imageUrl,
  };

  try {
    const response = await axios.post(url, payload, {
      headers: headers,
    });
    console.log('Generation initiated:', response.data);
    return response.data.id;
  } catch (error) {
    console.error('Error initiating generation:', error.response ? error.response.data : error.message);
    return null;
  }
}

// retrive video
const retrieveVideo = async(genId) =>{
  try {
    const response = await axios.get(url, {
      headers,
      params: {
        generation_id: genId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving video:', error.response ? error.response.data : error.message);
    return null;
  }
}

//   const videoGenerate = async(prompt, image) => {
    
//     try{
//         if(!image){
//             console.log('No image uploaded')
//             return ;
//         }

//         const genId = await generateVideo(prompt, image);
//         if (!genId) {
//             console.log('Id not generated')
//             return;
//         };

//         const timeout = 120000; // 2 minutes in milliseconds
//         const intervalTime = 5000; // 5 seconds in milliseconds
//         const startTime = Date.now();

//         const interval = setInterval(async () => {
//             if (Date.now() - startTime >= timeout) {
//             console.log('Timeout reached. Stopping.');
//             clearInterval(interval);
//             return;
//             }

//             const responseData = await retrieveVideo(genId);
//             if (!responseData) {
//             console.log('No response from API.');
//             clearInterval(interval);
//             return;
//             }

//             const status = responseData.status;
//             console.log(`Status: ${status}`);

//             if (status !== 'generating' && status !== 'queued' && status !== 'waiting') {
//             console.log('Generation complete:', responseData);
//             clearInterval(interval);
//             return responseData;
//             }
//         }, intervalTime);

//     }catch(err){
//         return err
//     }

// }



module.exports ={
    //videoGenerate,
     generateVideo,
      retrieveVideo
    }



