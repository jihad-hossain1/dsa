# Node.js Scripts Project

This project is set up with Node.js v23.11.0 and uses path aliases for clean imports.

## Setup

1. Make sure you have Node.js v23.11.0 or higher installed
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

- Run the project:

  ```bash
  npm start
  ```

- Run in development mode with watch:

  ```bash
  npm run dev
  ```

- Run tests:
  ```bash
  npm test
  ```

## Path Aliases

The project uses Node.js native path aliases. You can import files using the `#` prefix:

```javascript
import { something } from '#/utils/something.js';
```

This will resolve to `./src/utils/something.js`.
