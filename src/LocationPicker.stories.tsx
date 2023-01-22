import {ComponentMeta, ComponentStory} from '@storybook/react';
import {LocationSelector} from './LocationSelector';
import {action} from '@storybook/addon-actions';

export default {
  title: 'Location Selector',
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    accessToken: import.meta.env.STORYBOOK_VITE_MAPBOX_ACCESS_TOKEN ?? '',
    geocoderProps: {},
    initialPosition: undefined,
    mapProps: {},
  },
} as ComponentMeta<typeof LocationSelector>;

const Template: ComponentStory<typeof LocationSelector> = args => {
  return (
    <LocationSelector {...args} onLocationChange={action('Location changed')} />
  );
};

export const Example = Template.bind({});
