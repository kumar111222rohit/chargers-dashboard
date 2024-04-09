import { Connectors, Params } from '../types/charger';
/**
 * @export
 * @param {Params} obj
 * @return {*}  {string}
 */
export function objectToQueryParams(obj: Params): string {
  // here we are handling multiple  values for a param
  // by repeating the param name as it seems the backedn is accepting like that
  // stationName=paris&&stationName=nice
  const queryParams: string[] = [];

  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (value !== null && value !== undefined) {
      if (typeof value === 'string' && value.includes(',')) {
        const values = value.split(',');
        values.forEach(val =>
          queryParams.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(val.trim())}`
          )
        );
      } else {
        const valuesArray = Array.isArray(value) ? value : [value];
        valuesArray.forEach(val =>
          queryParams.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
          )
        );
      }
    }
  });
  return queryParams.join('&');
}

export const getUpdatedQueryParams = (
  previousParams: Params,
  newParams: string
) => {
  // get the previous and current params and form a new updated query param for url
  const existingParams = objectToQueryParams(previousParams);
  const decodedExistingParams = decodeURIComponent(existingParams);
  const updatedParams = decodedExistingParams.length
    ? decodedExistingParams.concat('&', newParams)
    : newParams;
  return updatedParams;
};

export function generateErrorResponse(message: string): {
  status: 'error';
  message: string;
} {
  return {
    status: 'error',
    message,
  };
}

export const generateSerialNumber = () => {
  // this generates a unique serial number for each new charger to be added
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 9;
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
};

export const getConnectorStatusChipProps = (info: Connectors) => {
  // this will return the class and data config for a connector status chips
  const connectorStatusProps = {
    labelClass: '',
    icon: '',
    standard: '',
    label: '',
    iconClass: '',
    container: 'container',
  };

  switch (info.status) {
    case 'AVAILABLE':
      connectorStatusProps.labelClass = 'available';
      connectorStatusProps.icon = getIconPath(info.standard);
      connectorStatusProps.standard = info.standard;
      connectorStatusProps.label = 'AVAILABLE';
      connectorStatusProps.iconClass = 'icon-available';
      break;

    case 'UNAVAILABLE':
      connectorStatusProps.labelClass = 'unavailable';
      connectorStatusProps.icon = getIconPath(info.standard);
      connectorStatusProps.standard = info.standard;
      connectorStatusProps.label = 'UNAVAILABLE';
      connectorStatusProps.iconClass = 'icon-unavailable';
      break;

    case 'CHARGING':
      connectorStatusProps.labelClass = 'charging';
      connectorStatusProps.icon = getIconPath(info.standard);
      connectorStatusProps.standard = info.standard;
      connectorStatusProps.label = 'CHARGING';
      connectorStatusProps.iconClass = 'icon-charging';
      break;

    default:
      break;
  }

  return connectorStatusProps;
};

const getIconPath = (standard: string) => {
  // based on the standard we are returning differnt icons
  let iconPath = '';
  switch (standard) {
    case 'CCS':
      iconPath = '/static/assets/ccs.svg';
      break;
    case 'CHADEMO':
      iconPath = '/static/assets/cha.svg';

      break;
    case 'AC':
      iconPath = '/static/assets/ac.svg';

      break;
    default:
  }
  return iconPath;
};

export const getChargerStatusChipProps = (info: string) => {
  // this will return the class and data config for a charger status chips
  const chipProps = {
    label: '',
    labelClass: '',
    container: 'status-container',
  };

  switch (info) {
    case 'CONNECTED':
      chipProps.labelClass = 'connected';
      chipProps.label = 'CONNECTED';
      break;
    case 'DISCONNECTED':
      chipProps.labelClass = 'disconnected';
      chipProps.label = 'DISCONNECTED';
      break;
    case 'REMOVED':
      chipProps.labelClass = 'removed';
      chipProps.label = 'REMOVED';
      break;
    default:
  }
  return chipProps;
};
