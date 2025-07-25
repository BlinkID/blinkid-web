module.exports = {
  // "*.{js,cjs,mjs,jsx,ts,mts,tsx}": ["eslint --fix --max-warnings=0"],
  "*.{ts,mts,tsx}": [
    () => "tsc --skipLibCheck --emitDeclarationOnly false --noEmit",
  ],
  "src/**/*.{js,cjs,mjs,jsx,ts,mts,tsx,css,md}": ["prettier --write"],
  "*.{js,ts}": "vitest related --run",
};
