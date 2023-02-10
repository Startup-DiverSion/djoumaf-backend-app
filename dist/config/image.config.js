"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const moment = require("moment");
class ImageConfig {
    constructor() {
    }
    uploadFile() {
        // If we be in developpent
        return this.local();
        // If we be in production
        // this.online()
    }
    local() {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, './public/storage');
            },
            filename: (req, file, cb) => {
                cb(null, `${moment().toDate().getTime().toString() + '_' + file.originalname}`.replace(/\s/g, ""));
            }
        });
        const upload = multer({
            storage: storage,
            fileFilter: (req, file, cb) => {
                if (file.mimetype === 'image/jpeg' || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
                    cb(null, true);
                }
                else {
                    cb(null, false);
                }
            }
        });
        return upload;
    }
    online() {
    }
}
exports.default = new ImageConfig();
