import { Location } from 'react-router-dom';

export interface ExtendedLocation extends Location {
  state: {
    from: Location;
  };
}
