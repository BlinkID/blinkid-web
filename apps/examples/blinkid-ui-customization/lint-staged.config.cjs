module.exports = {
  "*.{js,jsx,ts,tsx}": [() => "eslint --max-warnings=0"],
  "*.{ts,tsx}": [
    () => "tsc-files --skipLibCheck --emitDeclarationOnly false --noEmit",
  ],
  "*.{js,jsx,ts,tsx,css,md}": ["prettier --write"],
};
