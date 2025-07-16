# 1. Make sure Node.js 18+ is installed

node -v

# 2. Create project folder (optional)

mkdir my-puppeteer-bot
cd my-puppeteer-bot

# 3. Initialize package.json

npm init -y

# 4. Install dependencies

npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth
npm install --save-dev typescript ts-node @types/node

# 5. Create TypeScript config

npx tsc --init

# 6. Create folder for source files

mkdir src

# 7. Place your index.ts file in the src/ folder

# (Copy your own code into src/index.ts using your editor)

# 8. Edit package.json to add "type": "module" and the script

# Open package.json and make sure it looks like this:

# Example content you can copy into package.json:

# {

# "name": "my-puppeteer-bot",

# "version": "1.0.0",

# "type": "module",

# "scripts": {

# "dev": "node --loader ts-node/esm src/index.ts"

# },

# "dependencies": {

# "puppeteer": "^21.0.0",

# "puppeteer-extra": "^3.3.0",

# "puppeteer-extra-plugin-stealth": "^2.11.1"

# },

# "devDependencies": {

# "ts-node": "^10.9.1",

# "typescript": "^5.0.4",

# "@types/node": "^20.4.2"

# }

# }

# 9. Install again to make sure all dependencies match

npm install

# 10. Run the bot

npm run dev
