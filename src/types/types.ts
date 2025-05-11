export type RootStackParamList = {
  Drivers: undefined;
  DriverDetails: { driverId: string };
  Races: { driverId: string };
};

export type Driver = {
  driverId: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
  url: string;
};

export type Race = {
  raceName: string;
  round: string;
  date: string;
};

export type DriversState = {
  list: Driver[];
  loading: boolean;
  error: string | null;
  offset: number;
  total: number;
};

export type FetchDriversResponse = {
  drivers: Driver[];
  total: number;
};
