const multer = require('multer');

const profile_images_storage = multer.diskStorage({
    destination: 'uploads/profile_images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    },
});

const blog_image_storage = multer.diskStorage({
    destination: 'uploads/blogs_images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    },
});

const car_image_storage = multer.diskStorage({
    destination: 'uploads/cars_images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    },
});

const profile_upload = multer({ storage: profile_images_storage });
const blog_upload = multer({ storage: blog_image_storage });
const car_upload = multer({ storage: car_image_storage });

module.exports = { profile_upload, blog_upload, car_upload};
