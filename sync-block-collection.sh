#!/bin/bash
set -e
ORG=adobe
REPO=aem-block-collection
FILES=(scripts/aem.js scripts/scripts.js head.html)
SHA=$(git rev-parse --short HEAD)
BRANCH=sync-boilerplate-$SHA

cd ..
echo "Using gh version: $(gh --version)"
gh repo clone $ORG/$REPO
for f in "${FILES[@]}"; do
  cp "aem-boilerplate/$f" "$REPO/$f"
done

cd $REPO

git config --local user.email "helix@adobe.com"
git config --local user.name "AEM Bot"

echo "Creating branch $BRANCH"
git checkout -b $BRANCH
git add "${FILES[@]}"

if git diff --cached --quiet; then
  echo "No drift detected — skipping PR"
  exit 0
fi

echo "Committing changes"
git commit -m "chore: sync scripts/aem.js, scripts/scripts.js, head.html from aem-boilerplate@$SHA

Source: https://github.com/$ORG/aem-boilerplate/commit/$SHA
Test URL: https://$BRANCH--$REPO--$ORG.aem.live/
"

echo "Ready to create PR"
gh repo set-default $ORG/$REPO

git remote add token-authed-github https://${GITHUB_TOKEN}@github.com/$ORG/$REPO

echo "Successfully added remote"

echo git push --set-upstream token-authed-github $BRANCH
git push --set-upstream token-authed-github $BRANCH
echo gh pr create -f --head $BRANCH --base main
gh pr create -f --head $BRANCH --base main
