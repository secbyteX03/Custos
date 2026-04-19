const { logger } = require('../utils/logger');

async function broadcastTransaction(txHex) {
  logger.info('[Bitcoin] Broadcasting transaction to network...');
  // Use bitcoind RPC
  // const { RPCClient } = require('rpc-bitcoin');
  // const client = new RPCClient({ url: process.env.BITCOIN_RPC_URL, auth: process.env.BITCOIN_RPC_AUTH });
  // const txid = await client.sendrawtransaction({ hexstring: txHex });
  // return txid;
  return 'stub-txid';
}

async function waitForConfirmations(txid, requiredConfs = 6) {
  logger.info(`[Bitcoin] Waiting for ${requiredConfs} confirmations on ${txid}`);
  // Poll bitcoind every 10 min until confirmed
}

module.exports = { broadcastTransaction, waitForConfirmations };
