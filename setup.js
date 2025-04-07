const fs = require('fs');
const path = require('path');

const projectType = process.argv[2];

if (!projectType || !['docbased', 'crosswalk'].includes(projectType)) {
  console.error('Please specify project type: "docbased" or "crosswalk"');
  process.exit(1);
}

// Function to recursively delete a directory
function deleteDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`Deleted directory: ${dirPath}`);
  }
}

// Function to delete a file
function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted file: ${filePath}`);
  }
}

// Function to copy a file
function copyFile(source, target) {
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, target);
    console.log(`Copied ${source} to ${target}`);
  }
}

// Handle crosswalk scenario
if (projectType === 'crosswalk') {
  // Overwrite fstab.yaml with fstab.yaml.crosswalk and then delete the original
  copyFile('fstab.yaml.crosswalk', 'fstab.yaml');
  deleteFile('fstab.yaml.crosswalk');
} else if (projectType === 'docbased') {
  // Delete models directory
  deleteDirectory('models');

  // Delete block JSON files
  const blocksDir = 'blocks';
  if (fs.existsSync(blocksDir)) {
    const blockDirs = fs.readdirSync(blocksDir);
    blockDirs.forEach(blockDir => {
      const blockPath = path.join(blocksDir, blockDir);
      if (fs.statSync(blockPath).isDirectory()) {
        const jsonFile = path.join(blockPath, `_${blockDir}.json`);
        deleteFile(jsonFile);
      }
    });
  }

  // Delete root JSON files
  deleteFile('paths.json');
  deleteFile('component-filters.json');
  deleteFile('component-models.json');
  deleteFile('component-definition.json');
  deleteFile('fstab.yaml.crosswalk');

  // Remove build:json scripts from package.json
  const packageJsonPath = 'package.json';
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const scripts = packageJson.scripts;
    Object.keys(scripts).forEach(key => {
      if (key.startsWith('build:json')) {
        delete scripts[key];
      }
    });
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log('Removed build:json scripts from package.json');
  }
}

// Delete this script
deleteFile(__filename);

console.log(`Setup completed for ${projectType} project type.`); 