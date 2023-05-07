const STATIC_MAP_API_KEY = '3f2006805fb8496a8375902bfed6daeb';
const REVERSE_GEOCODING_API_KEY = '3f2006805fb8496a8375902bfed6daeb';

export const getMapPreview = (lng, lat) => {
  const imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=400&height=200&center=lonlat:${lng},${lat}&zoom=14&apiKey=${STATIC_MAP_API_KEY}`;
  return imagePreviewUrl;
};

export const getAddress = async (lng, lat) => {
  const url = `https://api.geoapify.com/v1/geocode/reverse?lon=${lng}&lat=${lat}&type=street&lang=en&format=json&apiKey=${REVERSE_GEOCODING_API_KEY}`;
  const response = await fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log('Failed to fetch address', error));

  const address = await response.results[0].formatted;
  return address;
};
