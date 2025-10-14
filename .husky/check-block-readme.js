#!/usr/bin/env node

/**
 * Script to check if changes were made to blocks/ and warn about README updates
 * This script is designed to be run as a pre-commit hook via husky
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

function log(message, color = 'reset') {
  // eslint-disable-next-line no-console
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function getChangedFiles() {
  try {
    // Get staged files
    const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter((file) => file.length > 0);

    return stagedFiles;
  } catch (error) {
    log('Error getting staged files:', 'red');
    // eslint-disable-next-line no-console
    console.error(error.message);
    return [];
  }
}

function checkBlockChanges(changedFiles) {
  const blockChanges = changedFiles.filter((file) => file.startsWith('blocks/')
    && !file.endsWith('README.md')
    && (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')));

  if (blockChanges.length === 0) {
    return { hasChanges: false, changedBlocks: [] };
  }

  // Group changes by block directory
  const changedBlocks = new Set();
  blockChanges.forEach((file) => {
    const blockDir = file.split('/')[1]; // Get the block name (e.g., 'commerce-cart' from 'blocks/commerce-cart/...')
    if (blockDir) {
      changedBlocks.add(blockDir);
    }
  });

  return {
    hasChanges: true,
    changedBlocks: Array.from(changedBlocks),
    changedFiles: blockChanges,
  };
}

function checkReadmeExists(blockName) {
  const readmePath = path.join('blocks', blockName, 'README.md');
  return fs.existsSync(readmePath);
}

function main() {
  log('\n🔍 Checking for block changes...', 'blue');

  const changedFiles = getChangedFiles();

  if (changedFiles.length === 0) {
    log('✅ No staged files found.', 'green');
    return 0;
  }

  const blockCheck = checkBlockChanges(changedFiles);

  if (!blockCheck.hasChanges) {
    log('✅ No block changes detected.', 'green');
    return 0;
  }

  log(`\n⚠️  ${colors.bold}Block changes detected!${colors.reset}`, 'yellow');
  log(`Changed blocks: ${blockCheck.changedBlocks.join(', ')}`, 'yellow');

  // Check which blocks have READMEs
  const blocksWithoutReadme = blockCheck.changedBlocks.filter((block) => !checkReadmeExists(block));

  log('\n📝 README status for changed blocks:', 'yellow');
  blockCheck.changedBlocks.forEach((block) => {
    const readmeStatus = checkReadmeExists(block) ? '✅' : '❌';
    log(`  ${readmeStatus} blocks/${block}/README.md`, checkReadmeExists(block) ? 'green' : 'red');
  });

  // If there are blocks without READMEs, prevent the commit
  if (blocksWithoutReadme.length > 0) {
    log(`\n❌ ${colors.bold}COMMIT BLOCKED: Missing README.md files${colors.reset}`, 'red');
    log(`Missing READMEs for: ${blocksWithoutReadme.join(', ')}`, 'red');

    log('\n💡 README should include:', 'blue');
    log('  - Overview of the block\'s purpose', 'blue');
    log('  - Configuration options and their effects', 'blue');
    log('  - Integration details (URL parameters, localStorage, events)', 'blue');
    log('  - Behavior patterns and user interaction flows', 'blue');
    log('  - Error handling strategies', 'blue');

    log('\n🔧 To fix this:', 'yellow');
    log('  1. Create missing README.md files in the block directories', 'yellow');
    log('  2. Add the files to git: git add blocks/*/README.md', 'yellow');
    log('  3. Commit again', 'yellow');

    log('\n⚡ If you really need to skip this check, you can force with:', 'red');
    log('  git commit --no-verify', 'red');

    return 1; // Fail the commit
  }

  log('\n✅ All changed blocks have README.md files!', 'green');
  return 0; // Allow the commit
}

if (require.main === module) {
  process.exit(main());
}

module.exports = { main, checkBlockChanges, checkReadmeExists };
