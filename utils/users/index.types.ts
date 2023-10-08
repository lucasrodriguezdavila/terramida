interface UserData {
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
  socialNetworks?: {
    type: string;
    url: string;
  }[];
}
