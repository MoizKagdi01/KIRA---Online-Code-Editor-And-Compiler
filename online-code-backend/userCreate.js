// Load the required modules
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

function createFolder(username) {

const parentFolderPath = join('users'); 
const newFolderPath = join(parentFolderPath, username); 
  // Check if the parent folder exists, if not, create it
  if (!existsSync(parentFolderPath)) {
    mkdirSync(parentFolderPath, { recursive: true });
  }
  // Check if the new folder already exists
  if (!existsSync(newFolderPath)) {
    // Create the new folder
    mkdirSync(newFolderPath);
  } else {
  }
}
export default createFolder
