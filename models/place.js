class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // location = { latitude: 0.00000, longitude: 0.00000}
    this.id = new Date().toString() + Math.random().toString();
  }
}
