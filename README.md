# js-logger

Simple JS logger written in Typescript that works client and server side

## Installation

```sh
git clone git@github.com:HuffmanTree/js-logger.git
cd js-logger
npm i && npm run build
```

## Usage

```typescript
import { Logger } from "js-logger";
import { LoggerLevel } from "js-logger/levels";
import { ConsoleTransport } from "js-logger/transports";

const logger = new Logger({
  maxLevel: LoggerLevel.INFO,
  transports: [new ConsoleTransport()],
});

logger.info("Hello World!");
```
