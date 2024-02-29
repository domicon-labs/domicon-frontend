import config from 'configs/app';

import { getEnvValue } from '../../configs/app/utils';
import request from './request';

const baseURL = config.app.baseUrl as string;
const networkId = getEnvValue('NEXT_PUBLIC_NETWORK_ID');
// eslint-disable-next-line no-console
console.log(baseURL, networkId, 'baseURL');
export function fetchTransactionShow(address: string) {
  return request({
    url: `${ baseURL }/explorer/api/v1/worker/transaction/show`,
    data: {
      transaction_hash: address,
      chain_id: networkId,
    },
    method: 'POST',
  });
}
