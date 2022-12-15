import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DragGroup } from './DragGroup'

export default {
  title: 'Molecules/DragGroup',
  component: DragGroup,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof DragGroup>

const Template: ComponentStory<typeof DragGroup> = (args) => <DragGroup {...args} />

export const Primary = Template.bind({})
