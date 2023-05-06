const STATIC_MAP_API_KEY = '3f2006805fb8496a8375902bfed6daeb';

export const getMapPreview = (lng, lat) => {
  const imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=400&height=200&center=lonlat:${lng},${lat}&zoom=14&apiKey=${STATIC_MAP_API_KEY}`;
  return imagePreviewUrl;
};
