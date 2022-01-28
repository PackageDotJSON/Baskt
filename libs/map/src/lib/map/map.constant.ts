export const DEFAULT_COORDINATES = {
  longitude: 0,
  latitude: 0,
};

export const STORE_COORDINATES = {
  longitude: -76.66134727116454,
  latitude: 39.290929052315626,
};

export const GEO_JSON: any = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          DEFAULT_COORDINATES.longitude,
          DEFAULT_COORDINATES.latitude,
        ],
      },
    },
  ],
};

export const CIRCLE_GEO_JSON: any = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [STORE_COORDINATES.longitude, STORE_COORDINATES.latitude],
      },
    },
  ],
};

export const BASKT_OPERATIONAL_ERROR = 'Baskt is not operational in this area.'
