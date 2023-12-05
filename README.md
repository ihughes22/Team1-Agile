# Virtual Memory Book Software - Final Chapter

**Introduction:**

  - A collaborative platform for families to build a digital timeline of memories with their loved ones in their final chapter of life. A slideshow of all the memories can be viewed at any time by all family membres. When a loved one closes their final chapter, the memories family members added can be turned into a book to celebrate their life at a funeral or memorial.

# Testing React Page/Installation Instructions

1. `git clone https://github.com/ihughes22/Team1-Agile.git`
2. `cd Team1-Agile/digital-memory-book`
3. `npm start`


## React Pageflip

1. `npm i react-pageflip`

## React Scripts

1. `npm i react-scripts`

## React Router

1. `npm i react-router-dom`

## React Bootstrap

1. `npm install react-bootstrap bootstrap`

## Firebase Setup

1. `npm install firebase`

## Optional: JS Formatting

1. to install prettier locally
   1. run `npm install --save-dev --save-exact prettier`
   2. to format all files: `npx prettier . --write`
   3. to check which files to format: `npx prettier . --check`
2. or just run prettier on a file/ format on save

   1. install prettier from VSCode Extensions
   2. follow this for more info: https://www.robinwieruch.de/how-to-use-prettier-vscode/
   3. CTRL SHIFT P and open user preferences (json)
   4. add the follow to your json file

      ```json
      "editor.formatOnSave": true
      // enable per-language (here: Prettier as formatter)
      "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
      }
      ```
