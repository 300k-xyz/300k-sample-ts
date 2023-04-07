# getting started with 300k liquidity manager

You can setup .env file based on .env.sample

```
cp .env.sample .env
```
edit .env, fill in your address and api key information


refer to file liquidityManagerCall.ts for contract calls


### build and run it
```
# uncomment the function in liquidityManagerCall.ts
npm run build
node dist/liquidityManagerCall.js
```
