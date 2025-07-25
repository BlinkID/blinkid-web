export default {
  "*.{js,cjs,mjs,jsx,ts,mts,tsx}": [() => "eslint --max-warnings=0"],
  "*.{ts,mts,tsx}": [
    () => "tsc --skipLibCheck --emitDeclarationOnly false --noEmit",
  ],
  "src/**/*.{js,cjs,mjs,jsx,ts,mts,tsx,css,md}": ["prettier --write"],
};
