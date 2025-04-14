const fs = require('fs');
const path = require('path');

const projectType = process.argv[2];

if (!projectType || !['doc', 'xwalk'].includes(projectType)) {
  console.error('Please specify project type: "doc" or "xwalk"');
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

// Handle xwalk scenario
if (projectType === 'xwalk') {
  // Overwrite fstab.yaml with fstab.yaml.xwalk-sample and then delete the original
  copyFile('fstab.yaml.xwalk-sample', 'fstab.yaml');
  deleteFile('fstab.yaml.xwalk-sample');
} else if (projectType === 'doc') {
  // Delete models directory
  deleteDirectory('models');

  // Process blocks directory
  const blocksDir = 'blocks';
  if (fs.existsSync(blocksDir)) {
    // Delete block JSON files
    const blockDirs = fs.readdirSync(blocksDir);
    blockDirs.forEach((blockDir) => {
      const blockPath = path.join(blocksDir, blockDir);
      if (fs.statSync(blockPath).isDirectory()) {
        const jsonFile = path.join(blockPath, `_${blockDir}.json`);
        deleteFile(jsonFile);
      }
    });

    // Remove moveInstrumentation lines from JavaScript files
    const processDirectory = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      entries.forEach((entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          processDirectory(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.js')) {
          const content = fs.readFileSync(fullPath, 'utf8');
          const lines = content.split('\n');
          const filteredLines = lines.filter((line) => !line.includes('moveInstrumentation'));
          if (lines.length !== filteredLines.length) {
            fs.writeFileSync(fullPath, filteredLines.join('\n'));
            console.log(`Removed moveInstrumentation lines from ${fullPath}`);
          }
        }
      });
    };
    processDirectory(blocksDir);
  }

  // Delete root JSON files
  deleteFile('paths.json');
  deleteFile('component-filters.json');
  deleteFile('component-models.json');
  deleteFile('component-definition.json');
  deleteFile('fstab.yaml.xwalk-sample');

  // Remove build:json scripts from package.json
  const packageJsonPath = 'package.json';
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const { scripts } = packageJson;
    Object.keys(scripts).forEach((key) => {
      if (key.startsWith('build:json')) {
        delete scripts[key];
      }
    });
    fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
    console.log('Removed build:json scripts from package.json');
  }
}

// Delete this script
deleteFile(__filename);

console.log(`Setup completed for ${projectType} project type.`);
