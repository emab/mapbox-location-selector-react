import {ComponentMeta, ComponentStory} from '@storybook/react';
import {LocationSelector} from './LocationSelector';
import {action} from '@storybook/addon-actions';

export default {
  title: 'Location Selector',
  component: LocationSelector,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    accessToken: import.meta.env.STORYBOOK_VITE_MAPBOX_ACCESS_TOKEN ?? '',
    initialLocation: {
      lng: -0.11865250984845943,
      lat: 51.49935412224127,
    },
    onLocationChange: action('onLocationChange'),
  },
} as ComponentMeta<typeof LocationSelector>;

const Template: ComponentStory<typeof LocationSelector> = args => {
  return (
    <LocationSelector {...args} onLocationChange={action('Location changed')} />
  );
};

export const Example = Template.bind({});
