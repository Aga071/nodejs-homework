// import multer from "multer";
import path from "path";
import { nanoid } from "nanoid";
import * as fs from "node:fs/promises";
import User from "../../models/User.js";
import Jimp from "jimp";

const AVATAR_WIDTH = 250;
const AVATAR_HEIGHT = 250;

const isImageTransform = async (path) =>
  new Promise((resolve) => {
    Jimp.read(path, async (err, image) => {
      if (err) resolve(false);

      try {
        const w = image.getWidth();
        const h = image.getHeight();

        const cropWidth = w > AVATAR_WIDTH ? AVATAR_WIDTH : w;
        const cropHeight = h > AVATAR_HEIGHT ? AVATAR_HEIGHT : h;

        const centerX = Math.round(w / 2 - AVATAR_WIDTH / 2);
        const centerY = Math.round(h / 2 - AVATAR_HEIGHT / 2);

        await image
          .crop(
            centerX < 0 ? 0 : centerX,
            centerY < 0 ? 0 : centerY,
            cropWidth,
            cropHeight
          )
          .write(path);

        resolve(true);
      } catch (err) {
        console.log(err);
        resolve(false);
      }
    });
  });

const updateAvatar = async (req, res, next) => {
  const storeAvatar = path.join(process.cwd(), "public/avatars");
  const bearerToken = req.headers.authorization.split(" ")[1];

  const updateUser = await User.findOne({ token: bearerToken });

  if (!req.file) {
    return res.status(400).json({ status: 400, message: "File isn't a photo" });
  }

  const { path: temporaryPath } = req.file;
  const extension = path.extname(temporaryPath);
  const newAvatarURL = `${nanoid()}${extension}`;
  const filePath = path.join(storeAvatar, newAvatarURL);

  try {
    await fs.rename(temporaryPath, filePath);
    updateUser.avatarURL = `/avatars/${newAvatarURL}`;
    await updateUser.save();
    isImageTransform(filePath);
    return res
      .status(200)
      .json({ status: 200, message: { avatarURL: updateUser.avatarURL } });
  } catch (err) {
    console.log(err);
    await fs.unlink(temporaryPath);
    return next(err);
  }
};

export { updateAvatar };
