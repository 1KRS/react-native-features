export class Place {
  constructor(title, imageUri, location, id) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = {lng: location.lng, lat: location.lat}; 
    this.id = id || new Date().toString() + Math.random().toString();
  }
}
