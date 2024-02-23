import config from 'configs/app';

import request from './request';

const baseURL = config.app.baseUrl as string;
// eslint-disable-next-line no-console
console.log(baseURL, 'baseURL');
export function fetchTransactionShow(address: string) {
  return request({
    url: `${ baseURL }/explorer/api/v1/worker/transaction/show`,
    data: {
      transaction_hash: address,
      chain_id: 1988,
    },
    method: 'POST',
  });
}
