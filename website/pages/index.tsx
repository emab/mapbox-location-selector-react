import {Location, LocationSelector} from 'mapbox-location-selector-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-location-selector-react/styles';
import {useState} from 'react';
import {HiOutlineDocumentText} from 'react-icons/hi';

type HomeProps = {
  publicAccessToken: string;
};

export default function Home({publicAccessToken}: HomeProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  return (
    <div className="min-h-screen bg-sky-900">
      <div className="text-white bg-slate-900" style={{height: '20%'}}>
        <div className="p-4 bg-sky-900">
          <h1 className="text-4xl font-medium">Mapbox location selector</h1>
          <p className="text-lg">Find and select a location on a Mapbox map.</p>
        </div>
        <div className="flex flex-col md:flex-row justify-evenly py-4">
          <div className="p-2">
            <ul className="mt-2 ml-2">
              <li>- Simple API</li>
              <li>- Uses Mapbox geocoder</li>
              <li>
                - Free to use within the{' '}
                <a
                  className="underline text-blue-300 hover:text-blue-400"
                  href="https://www.mapbox.com/pricing"
                  target="_blank"
                >
                  Mapbox API usage
                </a>
              </li>
              <li>- Easy to setup</li>
            </ul>
          </div>
          <div className="p-2 text-2xl my-auto">
            <a
              className="flex underline text-blue-300 hover:text-blue-400"
              href="https://github.com/emab/mapbox-location-selector-react"
            >
              <HiOutlineDocumentText className="relative top-1 mr-2 text-white" />
              View documentation on GitHub
            </a>
          </div>
        </div>
        <div className="text-center py-2 bg-slate-800 text-white">
          Selected location:{' '}
          {selectedLocation
            ? JSON.stringify(selectedLocation)
            : 'No location selected'}
        </div>
      </div>
      <div style={{maxHeight: '100vh', height: '800px'}}>
        <LocationSelector
          accessToken={publicAccessToken}
          onLocationChange={setSelectedLocation}
        />
      </div>
    </div>
  );
}

export const getStaticProps = () => {
  return {
    props: {
      publicAccessToken: process.env.PUBLIC_ACCESS_TOKEN,
    },
  };
};
