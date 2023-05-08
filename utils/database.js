import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

const database = SQLite.openDatabase('places.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lng REAL NOT NULL,
          lat REAL NOT NULL,
        )`,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject('(DB) ΓΙΑΤΙ;!;!;!', err);
        }
      );
    });
  });
  return promise;
};

export const insertPlace = (place) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (
      title, imageUri, address, lng, lat
    ) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lng,
          place.location.lat,
        ],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction(() => {
      tx.execute(
        'SELECT * FROM places',
        [],
        (_, result) => {
          console.log(result);

          const places = [];

          for (const dp of result.rows._array) {
            places.push(
              new Place(
                dp.title,
                imageUri,
                {
                  address: dp.address,
                  lng: dp.lng,
                  lat: dp.lat,
                },
                dp.id
              )
            );
          }
          resolve(places);
          // resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

export const fetchPlaceDetails = (id) => {
  const promises = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM places WHERE id = ?',
        [id],
        (_, result) => {
          console.log(result);
          resolve(result.rows._array[0]);
        },
        (_, error) => {
          reject(error)
        }
      );
    });
  });
  return promise
};