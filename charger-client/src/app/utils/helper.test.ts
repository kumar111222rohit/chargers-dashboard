import {
  generateErrorResponse,
  generateSerialNumber,
  getChargerStatusChipProps,
  objectToQueryParams,
} from './helper';

describe('objectToQueryParams', () => {
  it('should convert object to query params', () => {
    const params = {
      stationName: 'paris,nice',
      chargerStatus: 'CONNECTED',
    };
    const result = objectToQueryParams(params);
    expect(result).toBe(
      'stationName=paris&stationName=nice&chargerStatus=CONNECTED'
    );
  });
});

describe('generateErrorResponse', () => {
  it('should create error response object', () => {
    const message = 'Error occurred';
    const result = generateErrorResponse(message);
    expect(result).toEqual({ status: 'error', message });
  });
});

describe('generateSerialNumber', () => {
  it('should generate a serial number of correct length', () => {
    const result = generateSerialNumber();
    expect(result).toHaveLength(9);
    expect(result).toMatch(/[A-Z0-9]{9}/);
  });
});

describe('getChargerStatusChipProps', () => {
  it('should return correct props for CONNECTED status', () => {
    const props = getChargerStatusChipProps('CONNECTED');
    expect(props.label).toBe('CONNECTED');
    expect(props.labelClass).toBe('connected');
  });
});
