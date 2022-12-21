import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Panel } from './Panel'

export default {
  title: 'Templates/Panel',
  component: Panel,
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Panel>

const Template: ComponentStory<typeof Panel> = (args) => <Panel {...args} />

export const Primary = Template.bind({})
Primary.args = {
  backgroundColor: ''
}
