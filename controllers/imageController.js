const sharp = require('sharp');
const fs = require('fs');
// const { saveImage } = require('../models/imageModel');

const Image = require('../models/imageModel'); 

// Upload image controller
const uploadImage = async (req, res) => {
    const format = req.body.format || 'jpeg';
    const width = parseInt(req.body.width) || null;
    const height = parseInt(req.body.height) || null;

    const filePath = req.file.path;
    const newFileName = `converted-${Date.now()}.${format}`;
    const outputFile = `uploads/${newFileName}`;

    try {
        // Convert and resize the image
        let image = sharp(filePath);
        if (width || height) {
            image = image.resize(width, height);
        }
        await image.toFormat(format).toFile(outputFile);

        // Read image data as buffer
        const imageBuffer = fs.readFileSync(outputFile);
        const imageBase64 = imageBuffer.toString('base64'); // Convert to base64 for saving in DB

        const savedImage = await Image.create({
            image_name: newFileName,
            image_data: imageBase64 || 'No Title'
        });

        res.download(outputFile, (err) => {
            if (err) {
                return res.status(500).send({ error: 'Error in downloading the file' });
            }
        });


        // Save image in DB
        // saveImage(newFileName, imageBuffer, (err, result) => {
        //     if (err) {
        //         return res.status(500).send({ error: 'Failed to insert image into the database' });
        //     }
        //     res.download(outputFile, (err) => {
        //         if (err) {
        //             res.status(500).send({ error: 'Error in downloading the file' });
        //         }
        //     });
        // });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to process the image' });
    }
};

async function getAllImage(req, res) {
    console.log("/////////");
    return true;
}


module.exports = {
    uploadImage,
    getAllImage
};
