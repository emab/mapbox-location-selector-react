# Mapbox Location Selector for React

This is a simple implementation of the mapbox map (from `react-map-gl`) and the mapbox
geocoder (`@mapbox/mapbox-gl-geocoder`) package.

It allows you to click and select a position on the map. The selected position is noted by a marker and can be cleared.

> **Note**:
> It's highly recommended to ensure that your `onLocationChange` function is wrapped in a callback. You don't want it to
> cause a load of renders inside this component!

## Usage

For the map and geolocation input to render properly you'll need to import styles for `react-map-gl` and `mapbox-gl-geocoder`.

- `rect-map-gl`: https://visgl.github.io/react-map-gl/docs/get-started/get-started#styling
- `mapbox-gl-geocoder`: https://github.com/mapbox/mapbox-gl-geocoder

Then the component can be rendered anywhere in your application and used to get coordinates of a given place:

```tsx
const LocationPage = () => {
  const [storedLocation, setStoredLocation] = useState<Location>()
  
  return <LocationPicker onLocationChanged={setStoredLocation} accessToken={import.meta.env.MAPBOX_ACCESS_TOKEN} />
}
```