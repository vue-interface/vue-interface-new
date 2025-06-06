import fs from 'fs';
import path from 'path';

const cachePath = path.resolve('node_modules/.cache/storybook');

function deleteFolderRecursive(folder) {
  if (fs.existsSync(folder)) {
    fs.readdirSync(folder).forEach((file) => {
      const curPath = path.join(folder, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        try {
          fs.unlinkSync(curPath);
        } catch (err) {
          console.error(`❌ Failed to delete file: ${curPath}`, err.message);
        }
      }
    });
    try {
      fs.rmdirSync(folder);
      console.log('✅ Storybook cache cleared.');
    } catch (err) {
      console.error(`❌ Failed to remove folder: ${folder}`, err.message);
    }
  }
}

deleteFolderRecursive(cachePath);
