import { act, fireEvent } from '@testing-library/react'
import { store } from 'src/store'
import { blockInitialState } from 'src/stories/organisms/Block/block.slice'
import { InputType } from 'src/types/Input'
import { KeyEvent } from 'src/types/KeyEvent'
import { renderWithProviders } from 'src/utils/test-utils'
import { Input } from './Input'

const educationData = {
  ...blockInitialState.education[0]
}

describe('test Input component', () => {
  test('should render component', () => {
    const { getByText } = renderWithProviders(
      <Input type={InputType.HEADER} data={educationData} blockChildIndex={0} />
    )
    expect(getByText('EDUCATION')).toBeInTheDocument()
  })
  test('should render bullet <span> icon', () => {
    const { container } = renderWithProviders(
      <Input
        type={InputType.CONTENT_BULLET}
        data={educationData.content_bullet.child[0]}
        blockChildIndex={0}
      />
    )
    expect(container.querySelector('.field-bullet')).toBeInTheDocument()
  })
  test('should show disable class', () => {
    const { container } = renderWithProviders(
      <Input
        type={InputType.CONTENT_BULLET}
        data={educationData.content_bullet.child[0]}
        blockChildIndex={0}
      />
    )
    expect(container.querySelector('.disable')).toBeInTheDocument()
  })
})

describe('test field key down event', () => {
  test('should call create/delete content bullet when press key', () => {
    const { getByLabelText } = renderWithProviders(
      <Input
        type={InputType.CONTENT_BULLET}
        data={educationData.content_bullet.child[0]}
        blockChildIndex={0}
      />,
      {
        store
      }
    )
    const inputField = getByLabelText('field-input')
    act(() => inputField.focus())
    expect(inputField).toHaveFocus()

    if (inputField) fireEvent.keyDown(inputField, { key: KeyEvent.ENTER })

    expect(store.getState().block.education[0].content_bullet.child.length).toEqual(2)

    if (inputField) fireEvent.keyDown(inputField, { key: KeyEvent.ENTER })
    expect(store.getState().block.education[0].content_bullet.child.length).toEqual(3)

    if (inputField) fireEvent.keyDown(inputField, { key: KeyEvent.DELETE })
    expect(store.getState().block.education[0].content_bullet.child.length).toEqual(2)
  })
})
