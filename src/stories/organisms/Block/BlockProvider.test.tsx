import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { store } from 'src/store'
import { InputType } from 'src/types/Input'
import { Wrapper } from 'src/utils/test-utils'
import { updateSelectedBlock } from './block.slice'
import { BlockContext, BlockProvider } from './BlockProvider'

const blockRootData = {
  id: '1',
  uid: '5251f98f-5348-4205-89c5-50817900ecbe',
  header: {
    text: 'EDUCATION',
    placeHolder: 'EDUCATION'
  },
  title: {
    text: 'Study Program',
    placeHolder: 'Study Program',
    status: true,
    height: 0
  },
  desc: {
    text: 'dsd',
    placeHolder: 'Institution/ Place of education',
    status: false,
    height: 0
  },
  optional_dashed: {
    text: '',
    placeHolder: 'City, Country or GPA (optional)',
    status: false,
    height: 0
  },
  content_bullet: {
    child: [
      {
        id: '1',
        uid: '7e57f899-dbae-43fe-8865-354908f0523a',
        text: '',
        placeHolder: 'Course/Thesis/Project',
        status: false,
        height: 0
      }
    ],
    status: false,
    height: 0,
    placeHolder: ''
  },
  month_start: {
    text: '',
    placeHolder: 'mm',
    status: false,
    height: 0
  },
  month_end: {
    text: '',
    placeHolder: 'mm',
    status: false,
    height: 0
  },
  year_start: {
    text: '',
    placeHolder: 'yyyy',
    status: false,
    height: 0
  },
  year_end: {
    text: '',
    placeHolder: 'yyyy',
    status: false,
    height: 0
  }
}

describe('BlockContext', () => {
  test('test block content bar', () => {
    const block = {
      type: InputType.HEADER,
      blockId: '1',
      blockUid: '78748484',
      childIndex: 2
    }
    const TestComponent = () => {
      const {
        selectedBlock,
        showBlockContentBar,
        handleShowBlockContentBar,
        handleDisableBlockContentBar
      } = React.useContext(BlockContext)
      return (
        <div>
          <div data-testid="content-bar-status">status: {showBlockContentBar.toString()}</div>
          <div data-testid="selected-block-id">
            selectedBlockId: {selectedBlock.selectedBlock.blockId}
          </div>
          <button
            data-testid="show-btn"
            onClick={() =>
              handleShowBlockContentBar(block.type, block.blockId, block.blockUid, block.childIndex)
            }
          >
            Show block content bar
          </button>
          <button data-testid="disable-btn" onClick={() => handleDisableBlockContentBar()}>
            Disable block content bar
          </button>
        </div>
      )
    }
    const { getByTestId, getByText } = render(
      <Wrapper>
        <BlockProvider blockRootData={blockRootData}>
          <TestComponent />
        </BlockProvider>
      </Wrapper>
    )
    expect(getByTestId('content-bar-status')).toBeInTheDocument()
    expect(getByText(/^status:/)).toHaveTextContent('false')

    fireEvent.click(getByTestId('show-btn'))
    expect(getByText(/^status:/)).toHaveTextContent('true')
    expect(getByTestId('selected-block-id')).toHaveTextContent(block.blockId)
    expect(store.getState().block.selectedBlock.blockId).toEqual(block.blockId)
    expect(store.getState().block.selectedBlock.blockChildIndex).toEqual(block.childIndex)

    fireEvent.click(getByTestId('disable-btn'))
    expect(getByText(/^status:/)).toHaveTextContent('false')
    expect(store.getState().block.selectedBlock.blockId).toEqual('-1')
  })
  test('test block header bar', () => {
    const block = {
      type: InputType.HEADER,
      blockId: '1',
      blockUid: '78748484',
      childIndex: 4
    }
    const TestComponent = () => {
      const {
        selectedBlock,
        showBlockHeaderBar,
        handleShowBlockHeaderBar,
        handleDisableBlockHeaderBar
      } = React.useContext(BlockContext)
      return (
        <div>
          <div data-testid="header-bar-status">status: {showBlockHeaderBar.toString()}</div>
          <div data-testid="selected-block-id">
            selectedBlockId: {selectedBlock.selectedBlock.blockId}
          </div>
          <button
            data-testid="show-btn"
            onClick={() =>
              handleShowBlockHeaderBar(block.type, block.blockId, block.blockUid, block.childIndex)
            }
          >
            Show block header bar
          </button>
          <button data-testid="disable-btn" onClick={() => handleDisableBlockHeaderBar()}>
            Disable block header bar
          </button>
        </div>
      )
    }
    const { getByTestId, getByText } = render(
      <Wrapper>
        <BlockProvider blockRootData={blockRootData}>
          <TestComponent />
        </BlockProvider>
      </Wrapper>
    )
    expect(getByTestId('header-bar-status')).toBeInTheDocument()
    expect(getByText(/^status:/)).toHaveTextContent('false')

    fireEvent.click(getByTestId('show-btn'))
    expect(getByText(/^status:/)).toHaveTextContent('true')
    expect(getByTestId('selected-block-id')).toHaveTextContent(block.blockId)
    expect(store.getState().block.selectedBlock.blockId).toEqual(block.blockId)
    expect(store.getState().block.selectedBlock.blockChildIndex).toEqual(block.childIndex)

    fireEvent.click(getByTestId('disable-btn'))
    expect(getByText(/^status:/)).toHaveTextContent('false')
    expect(store.getState().block.selectedBlock.blockId).toEqual('-1')
  })
  test('test create new block', () => {
    const block = {
      type: InputType.HEADER,
      blockId: '1', //education
      blockUid: '78748484',
      childIndex: 4
    }
    const TestComponent = () => {
      const { handleCreateBlock } = React.useContext(BlockContext)
      return (
        <div>
          <button data-testid="create-block-btn" onClick={() => handleCreateBlock(block.blockId)}>
            Create new block
          </button>
        </div>
      )
    }
    const { getByTestId } = render(
      <Wrapper>
        <BlockProvider blockRootData={blockRootData}>
          <TestComponent />
        </BlockProvider>
      </Wrapper>
    )
    expect(getByTestId('create-block-btn')).toBeInTheDocument()
    fireEvent.click(getByTestId('create-block-btn'))
    expect(store.getState().block.education.length).toEqual(2)
  })
  test('test call moving block when data has changes', async () => {
    const block = {
      type: InputType.HEADER,
      blockId: '1', //education
      blockUid: store.getState().block.education[0].uid,
      childIndex: 4
    }
    const TestComponent = () => {
      const { selectedBlock, showBlockHeaderBar, handleShowBlockHeaderBar } =
        React.useContext(BlockContext)
      return (
        <div>
          <div data-testid="header-bar-status">status: {showBlockHeaderBar.toString()}</div>
          <div data-testid="selected-block-id">
            selectedBlockId: {selectedBlock.selectedBlock.blockId}
          </div>
          <button
            data-testid="show-btn"
            onClick={() =>
              handleShowBlockHeaderBar(block.type, block.blockId, block.blockUid, block.childIndex)
            }
          >
            Show block header bar
          </button>
        </div>
      )
    }
    blockRootData.uid = block.blockUid
    const { getByTestId, getByText } = render(
      <Wrapper>
        <BlockProvider blockRootData={blockRootData}>
          <TestComponent />
        </BlockProvider>
      </Wrapper>
    )
    expect(getByTestId('header-bar-status')).toBeInTheDocument()
    expect(getByText(/^status:/)).toHaveTextContent('false')

    fireEvent.click(getByTestId('show-btn'))
    expect(getByText(/^status:/)).toHaveTextContent('true')
    expect(getByTestId('selected-block-id')).toHaveTextContent(block.blockId)
    expect(store.getState().block.selectedBlock.blockId).toEqual(block.blockId)
    expect(store.getState().block.selectedBlock.blockChildIndex).toEqual(block.childIndex)

    //do update selecte element to trigger into useEffect again
    await act(
      async () =>
        await store.dispatch(
          updateSelectedBlock({
            selectedBlock: {
              blockType: block.type,
              blockId: block.blockId,
              blockUid: block.blockUid,
              blockChildIndex: block.childIndex,
              selectedElement: 'document1'
            }
          })
        )
    )
    expect(store.getState().block.isMovingBlock).toBe(true)
  })
})
