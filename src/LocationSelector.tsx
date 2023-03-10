import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import ReactDOM from 'react-dom';

import {IControl, Map, MapProps, MapRef, Marker, ViewState} from 'react-map-gl';

import type {GeocoderOptions} from '@mapbox/mapbox-gl-geocoder';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import type {Map as MapType} from 'mapbox-gl';
import mapbox from 'mapbox-gl';

import styles from './LocationSelector.module.css';

export type InputLocation = {
  lng: number | string;
  lat: number | string;
};

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

type SimpleViewState = Pick<ViewState, 'longitude' | 'latitude' | 'zoom'> &
  Partial<Omit<ViewState, 'longitude' | 'latitude' | 'zoom'>>;

type LocationSelectorProps = {
  onLocationChange: (location: Location | undefined) => void;
  accessToken: string;
  initialView?: SimpleViewState;
  initialLocation?: InputLocation;
  geocoderProps?: Partial<GeocoderOptions>;
  mapProps?: Partial<MapProps>;
};

class ClearSelectionControl implements IControl {
  private _map: MapType | undefined;
  private _container: HTMLDivElement | undefined;
  private readonly _onClick: () => void;

  constructor(options: {onClick: () => void}) {
    this._onClick = options.onClick;
  }

  onAdd(map: MapType) {
    this._map = map;
    this._container = document.createElement('div');
    const Component = () => {
      return (
        <div className="mapboxgl-ctrl">
          <button
            onClick={() => {
              this._onClick();
            }}
            className={styles.clearButton}
          >
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
  initialView,
  initialLocation,
  geocoderProps,
  mapProps,
}: LocationSelectorProps) => {
  const [selectedLocation, setSelectedLocation] = useState<
    Location | undefined
  >(
    initialLocation
      ? {lng: Number(initialLocation.lng), lat: Number(initialLocation.lat)}
      : undefined
  );
  const [viewState, setViewState] = useState<SimpleViewState>(
    initialView ?? {
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
      onLocationChange({
        lng: result.geometry.coordinates[0],
        lat: result.geometry.coordinates[1],
      });
    };
    geocoder?.on('result', onResult);
  }, [geocoder, onLocationChange]);

  const onMapLoad = useCallback(() => {
    const map = mapRef.current;

    if (map) {
      map.addControl(geocoder);
    }
  }, [geocoder]);

  const clearControl = useMemo(
    () =>
      new ClearSelectionControl({
        onClick: () => {
          setSelectedLocation(undefined);
          onLocationChange(undefined);
        },
      }),
    [onLocationChange]
  );

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    if (selectedLocation && !mapRef.current.hasControl(clearControl)) {
      mapRef.current.addControl(clearControl);
    }
    if (!selectedLocation) {
      mapRef.current.removeControl(clearControl);
    }
  }, [clearControl, selectedLocation]);

  return (
    <div className={styles.container}>
      {/* @ts-expect-error - for some reason the fog type is incorrect - ignoring as it's not a problem here */}
      <Map
        {...mapProps}
        {...viewState}
        ref={mapRef}
        onLoad={onMapLoad}
        mapLib={mapbox}
        onMove={evt => setViewState(evt.viewState)}
        onClick={({lngLat}) => {
          setSelectedLocation(lngLat);
          onLocationChange(lngLat);
        }}
        style={{height: '100%', width: '100%'}}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={accessToken}
      >
        {selectedLocation && (
          <Marker
            longitude={Number(selectedLocation.lng)}
            latitude={Number(selectedLocation.lat)}
          />
        )}
      </Map>
    </div>
  );
};
