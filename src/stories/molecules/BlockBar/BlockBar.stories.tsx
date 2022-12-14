import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BlockBar } from './BlockBar'

export default {
  title: 'Molecules/BlockBar',
  component: BlockBar,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof BlockBar>

const Template: ComponentStory<typeof BlockBar> = () => (
  <BlockBar blockId={'1'} block={'1'} blockChildIndex={0} />
)

export const Menu = Template.bind({})
