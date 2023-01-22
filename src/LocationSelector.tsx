import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import ReactDOM from 'react-dom';

import type {MapProps, MapRef} from 'react-map-gl';
import Mapbox, {Marker} from 'react-map-gl';

import type {GeocoderOptions} from '@mapbox/mapbox-gl-geocoder';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import type {Map} from 'mapbox-gl';
import mapbox from 'mapbox-gl';

import styles from './LocationSelector.module.css';

export type Location = {
  lng: number;
  lat: number;
};

type GeocoderResult = {
  result: {
    geometry: {
      coordinates: [number, number];
    };
  };
};

type LocationSelectorProps = {
  onLocationChange: (location: Location | undefined) => void;
  accessToken: string;
  initialPosition?: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  geocoderProps?: Partial<GeocoderOptions>;
  mapProps?: Partial<MapProps>;
};

class ClearSelectionControl {
  private _map: Map | undefined;
  private _container: HTMLDivElement | undefined;
  private readonly _onClick: () => void;

  constructor(options: {onClick: () => void}) {
    this._onClick = options.onClick;
  }

  onAdd(map: Map) {
    this._map = map;
    this._container = document.createElement('div');
    const Component = () => {
      return (
        <div className="mapboxgl-ctrl">
          <button onClick={this._onClick} className={styles.clearButton}>
            Clear selection
          </button>
        </div>
      );
    };

    ReactDOM.render(<Component />, this._container);
    return this._container;
  }

  onRemove() {
    this._container?.parentNode?.removeChild(this._container);
    this._map = undefined;
  }
}

export const LocationSelector = ({
  onLocationChange,
  accessToken,
  initialPosition,
  geocoderProps,
  mapProps,
}: LocationSelectorProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const [viewState, setViewState] = useState(
    initialPosition ?? {
      longitude: -4,
      latitude: 55,
      zoom: 5,
    }
  );

  const mapRef = useRef<MapRef>(null);

  const geocoder = useMemo(
    () =>
      new MapboxGeocoder({
        ...geocoderProps,
        accessToken,
        mapboxgl: mapbox,
        marker: false,
        clearOnBlur: true,
      }),
    [accessToken, geocoderProps]
  );

  useEffect(() => {
    const onResult = ({result}: GeocoderResult) => {
      setSelectedLocation({
        lng: result.geometry.coordinates[0],
        lat: result.geometry.coordinates[1],
      });
    };
    geocoder?.on('result', onResult);
  }, [geocoder]);

  const onMapLoad = useCallback(() => {
    const map = mapRef.current;

    if (map) {
      map.addControl(geocoder);
      map.addControl(
        new ClearSelectionControl({
          onClick: () => setSelectedLocation(undefined),
        })
      );
    }
  }, [geocoder]);

  useEffect(() => {
    onLocationChange(selectedLocation);
  }, [onLocationChange, selectedLocation]);

  return (
    <div className={styles.container}>
      {/* @ts-expect-error - for some reason the fog type is incorrect - ignoring as it's not a problem here */}
      <Mapbox
        {...mapProps}
        {...viewState}
        ref={mapRef}
        onLoad={onMapLoad}
        mapLib={mapbox}
        onMove={evt => setViewState(evt.viewState)}
        onClick={({lngLat}) => setSelectedLocation(lngLat)}
        style={{height: '100%', width: '100%'}}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={accessToken}
      >
        {selectedLocation && (
          <Marker
            longitude={selectedLocation.lng}
            latitude={selectedLocation.lat}
          />
        )}
      </Mapbox>
    </div>
  );
};
