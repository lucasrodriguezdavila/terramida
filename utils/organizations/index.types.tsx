interface Organization {
  id: string;
  government: boolean;
  lat: number;
  lng: number;
  name: string;
  description: string;
  image: string;
  interestArea?: {
    latitude: number;
    longitude: number;
    radius: number;
  };
}
