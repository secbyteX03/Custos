/**
 * Legacy Guard — Lightning Watchtower
 *
 * Monitors the user's LND node channels for:
 *   - Breach attempts (counterparty broadcasting old channel state)
 *   - Forced closes (peer goes offline, closes unilaterally)
 *   - Channel health (capacity, balance, connectivity)
 *
 * Integrated with LND via gRPC.
 */

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');
const path = require('path');

class LightningWatchtower {
  constructor({ lndHost, macaroonPath, certPath }) {
    this.lndHost = lndHost;
    this.macaroon = fs.readFileSync(macaroonPath).toString('hex');
    this.cert = fs.readFileSync(certPath);
  }

  getLNDClient() {
    const packageDef = protoLoader.loadSync(
      path.join(__dirname, 'proto/lightning.proto'),
      { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true }
    );
    const lnrpc = grpc.loadPackageDefinition(packageDef).lnrpc;
    const sslCreds = grpc.credentials.createSsl(this.cert);
    const macaroonCreds = grpc.credentials.createFromMetadataGenerator((_, cb) => {
      const meta = new grpc.Metadata();
      meta.add('macaroon', this.macaroon);
      cb(null, meta);
    });
    return new lnrpc.Lightning(
      this.lndHost,
      grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds)
    );
  }

  async getChannels() {
    return new Promise((resolve, reject) => {
      this.getLNDClient().listChannels({}, (err, res) => {
        if (err) reject(err);
        else resolve(res.channels);
      });
    });
  }

  /**
   * Subscribe to channel events — breach attempts, closes, etc.
   * In production this runs as a long-lived gRPC stream.
   */
  subscribeToChannelEvents(onEvent) {
    const stream = this.getLNDClient().subscribeChannelEvents({});
    stream.on('data', (event) => {
      if (event.type === 'CLOSED_CHANNEL') {
        const detail = event.closed_channel;
        if (detail.close_type === 'BREACH_CLOSE') {
          onEvent({ type: 'BREACH_ATTEMPT', channelId: detail.channel_id, detail });
        } else if (detail.close_type === 'REMOTE_FORCE_CLOSE') {
          onEvent({ type: 'FORCED_CLOSE', channelId: detail.channel_id, detail });
        }
      }
    });
    stream.on('error', (err) => onEvent({ type: 'STREAM_ERROR', err }));
  }

  async closeChannel(channelPoint, force = false) {
    // Cooperatively close a channel (or force-close if peer is unreachable)
    return new Promise((resolve, reject) => {
      const [fundingTxId, outputIndex] = channelPoint.split(':');
      const stream = this.getLNDClient().closeChannel({
        channel_point: { funding_txid_str: fundingTxId, output_index: parseInt(outputIndex) },
        force,
      });
      stream.on('data', resolve);
      stream.on('error', reject);
    });
  }
}

module.exports = { LightningWatchtower };
