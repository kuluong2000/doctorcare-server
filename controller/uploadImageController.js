const AppError = require("./../utils/appError"); // giống try catch
const catchAsync = require("./../utils/catchAysnc"); // giống try catch
const multer = require("multer");
const sharp = require("sharp");
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("No an Image! Please upload only images.", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadImage = upload.single("image");
exports.resizeImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `image-${Date.now()}.jpeg`;
  await sharp(req.file.buffer).toFormat("png").png({ palette: true }).toFile(`public/assets/image/${req.file.filename}`);
  res.send({
    status: "success",
    data: req.file.filename,
  });
});
