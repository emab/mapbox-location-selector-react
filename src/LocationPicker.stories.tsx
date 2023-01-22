import {ComponentMeta, ComponentStory} from '@storybook/react';
import {LocationPicker} from './LocationPicker';

export default {
  title: 'Location Picker',
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    accessToken: import.meta.env.STORYBOOK_VITE_MAPBOX_ACCESS_TOKEN ?? '',
    geocoderProps: {},
    initialPosition: undefined,
    mapProps: {},
  },
} as ComponentMeta<typeof LocationPicker>;

const Template: ComponentStory<typeof LocationPicker> = args => {
  return <LocationPicker {...args} />;
};

export const Example = Template.bind({});
