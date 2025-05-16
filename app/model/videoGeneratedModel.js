const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoGeneratedSchema = Schema(
    {
        generated_id: {
            type: String
        },
        video_url: {
            type: String,   
        },
       user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
       }
    },
     {
        timestamps: true,
    }
);

const VideoGenerated = mongoose.model('VideoGenerated', VideoGeneratedSchema);

module.exports = VideoGenerated;