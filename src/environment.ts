export const environment = {
  port: process.env['PORT'] ?? 3000,
  dublinBikesUrl:
    process.env['DUBLIN_BIKES_URL'] ??
    'https://app-media.noloco.app/noloco/dublin-bikes.json',
  timeoutMs: process.env['TIMEOUT_MS'] ?? 10000,
};
