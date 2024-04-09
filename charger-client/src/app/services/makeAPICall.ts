import { BASE_URL, VERSION_1 } from '../constants/genericConstants';
import { Params, RequestMethod, RequestOptions } from '../types/charger';
import { generateErrorResponse, objectToQueryParams } from '../utils/helper';

const apiHostV1 = BASE_URL + `/api${VERSION_1}`;

async function request(
  url: string,
  params?: Params,
  method: RequestMethod = 'GET'
): Promise<any> {
  const options: RequestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (params) {
    if (method === 'GET') {
      url += '?' + objectToQueryParams(params);
    } else {
      options.body = JSON.stringify(params);
    }
  }

  try {
    const response = await fetch(apiHostV1 + url, options);

    if (response.status !== 200) {
      return generateErrorResponse(
        'The server responded with an unexpected status.'
      );
    }

    let result;
    if (response.headers.get('Content-Length') !== '0') {
      result = await response.json();
    } else {
      result = { message: 'Success' };
    }

    return result;
  } catch (e) {
    console.log(e);
    // we can show error in some toast notifation can log in some logger as well here
  }
}

const get = (url: string, params?: Params): Promise<any> => {
  return request(url, params, 'GET');
};

const create = (url: string, params: Params): Promise<any> => {
  return request(url, params, 'POST');
};

const update = (url: string, params: Params): Promise<any> => {
  return request(url, params, 'PUT');
};

const remove = (url: string, params?: Params): Promise<any> => {
  return request(url, params, 'DELETE');
};

const options = (url: string, params?: Params): Promise<any> => {
  return request(url, params, 'OPTIONS');
};

export default {
  get,
  create,
  update,
  remove,
  options,
};
