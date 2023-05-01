require('dotenv').config();
import { getOrderHistory, Network } from '@300k/ts-sdk';

getOrderHistory({
  apiKey: process.env.apiKey!,
  apiSecret: process.env.apiSecret!,
  network: Network.celo,
  query: {
    walletAddress: process.env.walletAddress!,
  },
})
  .catch((e) => {
    console.error(e);
  })
  .then((r) => {
    console.log('res', r);
  });
