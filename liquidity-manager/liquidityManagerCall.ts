require('dotenv').config();
import { tokenConfig, createPosition, Network, removeLiquidityAndBurn, getPositionDetails } from './300k-utils';

async function testAddLiquidity() {
  const network = Network.celo;
  const postBody = {
    traderAddress: process.env.traderAddress!,
    walletAddress: process.env.walletAddress!,
    token0: tokenConfig[network].CELO.address,
    token1: tokenConfig[network].cUSD.address,
    amount0Desired: 0.001,
    amount1Desired: 0,
    priceLower: '0.705',
    priceUpper: '0.95',
    fee: 3000,
    gasPrice: (5e9).toString(),
    // uncomment this to actually send tx
    estimateGasOnly: true,
  };
  try {
    const res = await createPosition({
      network,
      postBody,
      apiKey: process.env.apiKey!,
      apiSecret: process.env.apiSecret!,
    });
    console.log(`res`, res.data);
  } catch (e) {
    console.error(e);
  }
}
// testAddLiquidity();

async function testRemoveLiquidity() {
  const network = Network.celo;

  const postBody = {
    traderAddress: process.env.traderAddress!,
    walletAddress: process.env.walletAddress!,
    positionId: 2884,
    gasPrice: (5e9).toString(),
    estimateGasOnly: false,
  };
  try {
    const positionRes = await getPositionDetails({
      walletAddress: postBody.walletAddress,
      network,
      apiKey: process.env.apiKey!,
      apiSecret: process.env.apiSecret!,
    });

    console.log(`position detail`, positionRes.data);
    /* response:
    * [
  {
    tokenId: 2884,
    nonce: '0',
    operator: '0x0000000000000000000000000000000000000000',
    token0: '0x471EcE3750Da237f93B8E339c536989b8978a438',
    token1: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
    fee: 3000,
    tickLower: -3480,
    tickUpper: -540,
    liquidity: '6147082578963113',
    feeGrowthInside0LastX128: '9153906580564455529790611989312187166',
    feeGrowthInside1LastX128: '6958813514387584897927998814939182663',
    tokensOwed0: '0',
    tokensOwed1: '0',
    token0Symbol: 'CELO',
    token1Symbol: 'cUSD',
    token0Decimals: 18,
    token1Decimals: 18,
    priceLower: '0.70611',
    priceUpper: '0.94743',
    priceLowerInvert: '1.0555',
    priceUpperInvert: '1.4162',
    amount0: '0.00099999',
    amount1: '0'
  }
]*/
    const res = await removeLiquidityAndBurn({
      network,
      postBody,
      apiKey: process.env.apiKey!,
      apiSecret: process.env.apiSecret!,
    });
    console.log(`res`, res.data);
  } catch (e) {
    console.error(e);
  }
}
// testRemoveLiquidity();
