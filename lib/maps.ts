interface MapsLocation {
  address: string;
  latitude: number | null;
  longitude: number | null;
}

export function getDirectionsUrl({ address, latitude, longitude }: MapsLocation): string {
  if (latitude !== null && longitude !== null) {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  }
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
}
