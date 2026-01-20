import { exec } from "node:child_process";

const run = (cmd) => new Promise((resolve, reject) => exec(
  cmd,
  (error, stdout, stderr) => {
    if (error) reject(error);
    if (stderr) reject(stderr);
    resolve(stdout);
  }
));

const changeset = await run('git diff --cached --name-only --diff-filter=ACMR');
const modifiedFiles = changeset.split('\n').filter(Boolean);

// check if there are any model files staged
const modifiedPartials = modifiedFiles.filter((file) => file.match(/(^|\/)_.*.json/));
if (modifiedPartials.length > 0) {
    const output = await run('npm run build:json --silent');
    console.log(output);
    await run('git add component-models.json component-definition.json component-filters.json');
}
