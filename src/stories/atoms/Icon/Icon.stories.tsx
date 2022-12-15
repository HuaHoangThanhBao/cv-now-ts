import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Icon } from './Icon'

export default {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />

export const Primary = Template.bind({})
Primary.args = {
  iconType: '1'
}

export const Social = Template.bind({})
Social.args = {
  iconType: 'email'
}
