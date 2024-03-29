require('dotenv').config();

import { Network, CreateOrderParams, getOrderBook, createOrder, getQuote } from '@300k/ts-sdk';

async function testBuy() {
  const network = Network.celo;
  const symbol = 'WETH/USDC';
  const amountIn = 200;
  const traderAddress = process.env.traderAddress!;
  const walletAddress = process.env.walletAddress!;

  const orderbook = await getOrderBook({
    network,
    query: {
      symbol,
      side: 'ask',
      amountUSD: amountIn,
    },
    apiKey: process.env.apiKey!,
    apiSecret: process.env.apiSecret!,
  });
  console.log(`got orderbook`, orderbook);

  const askPrice = orderbook.asks![0][0];
  const allowedSlippage = 0.001;
  const postBody: CreateOrderParams = {
    routeHashes: [orderbook.asks![0][2]],
    expireTimestamp: Math.floor(Date.now() / 1000 + 12),
    // gasPrice: override gas price,
    // maxPriorityFeePerGas: override maxPriorityFeePerGas,
    walletAddress,
    // nonce,
    amountIn,
    // amountInRaw,
    amountOutMin: (amountIn / askPrice) * (1 - allowedSlippage),
    strategyId: 1,
    strategyType: 2,
    traderAddress,
    newClientOrderId: `test-${Date.now()}`,
    dynamicGasPrice: false,
    // set estimateGasOnly = false to actually execute transaction
    estimateGasOnly: true,
  };

  try {
    const res = await createOrder({
      network,
      postBody,
      apiKey: process.env.apiKey!,
      apiSecret: process.env.apiSecret!,
    });
    console.log(`swap buy res`, res);
  } catch (e) {
    const responseBody = e && (e as any).response?.data;
    const status = e && (e as any).response?.status;
    console.log(`error status=${status} responseBody`, responseBody);
  }
}

// testBuy();

async function testSell() {
  const network = Network.celo;
  const symbol = 'CELO/cUSD';

  const traderAddress = process.env.traderAddress!;
  const walletAddress = process.env.walletAddress!;
  const amountUSD = 10;
  const orderbook = await getOrderBook({
    network,
    query: {
      symbol,
      side: 'bid',
      amountUSD: 100,
    },
    apiKey: process.env.apiKey!,
    apiSecret: process.env.apiSecret!,
  });
  console.log(`walletAddress`, walletAddress);
  console.log(`sell got orderbook`, orderbook);
  const bidPrice = orderbook.bids![0][0];
  const amountIn = amountUSD / bidPrice;
  const allowedSlippage = 0.001;
  const postBody: CreateOrderParams = {
    routeHashes: [orderbook.bids![0][2]],
    expireTimestamp: Math.floor(Date.now() / 1000 + 12),
    // gasPrice: override gas price,
    // maxPriorityFeePerGas: override maxPriorityFeePerGas,
    walletAddress,
    // nonce,
    amountIn,
    // amountInRaw,
    amountOutMin: amountIn * bidPrice * (1 - allowedSlippage),
    strategyId: 1,
    strategyType: 2,
    traderAddress,
    newClientOrderId: `test-${Date.now()}`,
    dynamicGasPrice: false,
    // set estimateGasOnly = false to actually execute transaction
    estimateGasOnly: true,
  };

  console.log(`postBody`, postBody);

  try {
    const res = await createOrder({
      network,
      postBody,
      apiKey: process.env.apiKey!,
      apiSecret: process.env.apiSecret!,
    });
    console.log(`swap sell res`, res);
  } catch (e) {
    const responseBody = e && (e as any).response?.data;
    const status = e && (e as any).response?.status;
    console.log(`error status=${status} responseBody`, responseBody);
  }
}

// testSell();

async function testGetQuote() {
  const network = Network.ethereum;
  console.log(`getQuote started`);
  const res = await getQuote({
    network,
    query: {
      tokenInAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      tokenOutAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      amount: '1000000000', // 1000 USDC
    },
    apiKey: process.env.apiKey!,
    apiSecret: process.env.apiSecret!,
  });
  console.log(`res`, JSON.stringify(res));
}
// testGetQuote();

// node dist/swapCall.js
