# Mapbox Location Selector for React

This is a simple implementation of the mapbox map (from `react-map-gl`) and the mapbox
geocoder (`@mapbox/mapbox-gl-geocoder`) package.

It allows you to click and select a position on the map. The selected position is noted by a marker and can be cleared.

> **Note**:
> It's highly recommended to ensure that your `onLocationChange` function is wrapped in a callback. You don't want it to
> cause a load of renders inside this component!