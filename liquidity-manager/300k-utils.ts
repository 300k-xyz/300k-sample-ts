import { create300kSignature } from '@300k/ts-sdk';
import axios from 'axios';
export const BASE_URL_300K_API = process.env.TK_BASE_URL || `https://api.300k.xyz`;
export declare enum Network {
  'ethereum' = 'ethereum',
  'arbitrum' = 'arbitrum',
  'polygon' = 'polygon',
  'bsc' = 'bsc',
  'celo' = 'celo',
  'optimism' = 'optimism',
  'avalanche' = 'avalanche',
}

export const tokenConfig: Record<string, Record<string, { address: string; decimals: number; symbol: string }>> = {
  celo: {
    CELO: { address: '0x471ece3750da237f93b8e339c536989b8978a438', decimals: 18, symbol: 'CELO' },
    cUSD: { address: '0x765de816845861e75a25fca122bb6898b8b1282a', decimals: 18, symbol: 'cUSD' },
  },
};

export interface CreateOrderParams {
  routeHashes: string[];
  expireTimestamp?: number;
  gasPrice?: string;
  maxPriorityFeePerGas?: string;
  walletAddress: string;
  amountIn: number;
  amountInRaw?: string;
  amountOutMin: number;
  nonce?: number;
  strategyId?: number;
  strategyType?: number;
  traderAddress: string;
  newClientOrderId?: string;
  dynamicGasPrice?: boolean;
  estimateGasOnly?: boolean;
}
export async function createOrder({
  network,
  postBody,
  apiKey,
  apiSecret,
}: {
  apiKey: string;
  apiSecret: string;
  network: Network;
  postBody: CreateOrderParams;
}) {
  const ts = Date.now();
  const path = `/api/${network}/v1/order`;
  const url = `${BASE_URL_300K_API}${path}`;
  const headers = {
    'X-APIKEY': apiKey,
    'X-TS': ts,
    'X-SIGNATURE': create300kSignature({ ts, method: 'POST', path, apiSecret, postData: postBody }),
  };
  const res = await axios.post(url, postBody, {
    timeout: 120 * 1000,
    headers,
  });
  return res;
}

export async function createPosition({
  network,
  postBody,
  apiKey,
  apiSecret,
}: {
  apiKey: string;
  apiSecret: string;
  network: Network;
  postBody: {
    traderAddress: string;
    walletAddress: string;
    token0: string;
    token1: string;
    amount0Desired: number;
    amount1Desired: number;
    priceLower: string;
    priceUpper: string;
    fee: number;
    burnPositionId?: number;
    newClientOrderId?: string;
    gasPrice?: string;
    maxPriorityFeePerGas?: string;
    estimateGasOnly?: boolean;
    strategyId?: number;
    strategyType?: number;
  };
}) {
  const ts = Date.now();
  const path = `/api/${network}/v1/v3-position`;
  const url = `${BASE_URL_300K_API}${path}`;
  const headers = {
    'X-APIKEY': apiKey,
    'X-TS': ts,
    'X-SIGNATURE': create300kSignature({ ts, method: 'POST', path, apiSecret, postData: postBody }),
  };
  const res = await axios.post(url, postBody, {
    timeout: 120 * 1000,
    headers,
  });
  return res;
}

export async function getPositionDetails({
  network,
  walletAddress,
  apiKey,
  apiSecret,
}: {
  network: string;
  walletAddress: string;
  apiKey: string;
  apiSecret: string;
}) {
  const ts = Date.now();
  const path = `/api/${network}/v1/v3-position`;
  const url = `${BASE_URL_300K_API}${path}?walletAddress=${walletAddress}`;
  const headers = {
    'X-APIKEY': apiKey,
    'X-TS': ts,
    'X-SIGNATURE': create300kSignature({ ts, method: 'POST', path, apiSecret, postData: {} }),
  };
  const res = await axios.get(url, {
    timeout: 120 * 1000,
    headers,
  });
  return res;
}

export async function removeLiquidityAndBurn({
  network,
  postBody,
  apiKey,
  apiSecret,
}: {
  apiKey: string;
  apiSecret: string;
  network: Network;
  postBody: {
    positionId: number;
    walletAddress: string;
    traderAddress: string;
    newClientOrderId?: string;
    nonce?: number;
    gasPrice?: string;
    maxPriorityFeePerGas?: string;
    estimateGasOnly?: boolean;
    strategyId?: number;
    strategyType?: number;
  };
}) {
  const ts = Date.now();
  const path = `/api/${network}/v1/remove-v3-position`;
  const url = `${BASE_URL_300K_API}${path}`;
  const headers = {
    'X-APIKEY': apiKey,
    'X-TS': ts,
    'X-SIGNATURE': create300kSignature({ ts, method: 'POST', path, apiSecret, postData: postBody }),
  };
  const res = await axios.post(url, postBody, {
    timeout: 120 * 1000,
    headers,
  });
  return res;
}
