var utility = (function () {
  const path = require("path");
  const fs = require("fs");

  let image_path = path.join(__dirname, "../", "assests", "images", "event");
  let service_image_path = path.join(__dirname, "../", "assests", "images", "services");

  function writeFile(file, type) {
    if (type == 'services') {
      console.log('11111', file.name)
      const image_name = Date.now() + "_" + file.name;
      return new Promise((resolve, reject) => {
        return fs.writeFile(`${service_image_path}/${image_name}`, file.data, err => {
          if (err) {
            reject(err);
          }
          resolve({ imageName: image_name, upload: true });
        });
      });
    } else if (type == 'event') {
      const image_name = Date.now() + "_" + file.name;
      return new Promise((resolve, reject) => {
        return fs.writeFile(`${image_path}/${image_name}`, file.data, err => {
          if (err) {
            reject(err);
          }
          resolve({ imageName: image_name, upload: true });
        });
      });
    }
  }

  function unlinkFile(fileName) {
    return new Promise((resolve, reject) => {
      fs.unlink(`${image_path}/${fileName}`, err => {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });
  }

  return {
    writeFile: writeFile,
    unlinkFile: unlinkFile
  };
})();

module.exports = utility;
