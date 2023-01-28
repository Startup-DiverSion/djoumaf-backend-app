"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer = require("multer");
var moment = require("moment");
var ImageConfig = /** @class */ (function () {
    function ImageConfig() {
    }
    ImageConfig.prototype.uploadFile = function () {
        // If we be in developpent
        return this.local();
        // If we be in production
        // this.online()
    };
    ImageConfig.prototype.local = function () {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './public/storage');
            },
            filename: function (req, file, cb) {
                cb(null, "".concat(moment().toDate().getTime().toString() + '_' + file.originalname).replace(/\s/g, ""));
            }
        });
        var upload = multer({
            storage: storage,
            fileFilter: function (req, file, cb) {
                if (file.mimetype === 'image/jpeg' || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
                    cb(null, true);
                }
                else {
                    cb(null, false);
                }
            }
        });
        return upload;
    };
    ImageConfig.prototype.online = function () {
    };
    return ImageConfig;
}());
exports.default = new ImageConfig();
