interface EventThermalAnomaly {
  latitude: string;
  longitude: string;
  bright_ti4: string;
  scan: string;
  track: string;
  acq_date: string;
  acq_time: string;
  satellite: string;
  instrument: string;
  confidence: string;
  version: string;
  bright_ti5: string;
  frp: string;
  daynight: string;
}

interface Event {
  id: string;
  initialLatitude: number;
  initialLongitude: number;
  thermalAnomalies: EventThermalAnomaly[];
}

interface EventComment {
  id: string;
  eventId: string;
  comment: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    description: string;
    imageProfile: string;
    username: string;
    organization?: {
      id: string;
      government: boolean;
      name: string;
      description: string;
      image: string;
      lat: number;
      lng: number;
    };
  };
  createdAt: string;
  updatedAt: string;

  validation?: string;
}
