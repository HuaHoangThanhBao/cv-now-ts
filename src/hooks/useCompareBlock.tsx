import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../store'
import { BlockState, sendUpdateBlock } from '../stories/organisms/Block/block.slice'
import { Common } from '../types/Block'
import { InputType } from '../types/Input'
import { convert } from '../utils'

export const useCompareBlock = (
  blockRoot: Common
): [(blockId: string, blockUid: string) => void, () => boolean, () => void] => {
  const currentBlock = useRef<{ blockId: string; blockUid: string }>({
    blockId: '-1',
    blockUid: '-1'
  })
  const blockState = useSelector((state: RootState) => state.block)
  const documentState = useSelector((state: RootState) => state.document)
  const dispatch = useAppDispatch()

  const set = (blockId: string, blockUid: string) => {
    currentBlock.current = { blockId, blockUid }
  }

  //true => isEqual, false: isDifference
  const compare = (): boolean => {
    const { blockId, blockUid } = currentBlock.current
    const blocks = convert(blockId, blockState)
    const block = blocks.find((b) => b.uid === blockUid)
    let isEqual = true
    if (block) {
      for (let i = 0; i < Object.keys(blockRoot).length; i++) {
        const rootItem = blockRoot[Object.keys(blockRoot)[i]]
        const item = block[Object.keys(blockRoot)[i]]
        if (Object.keys(blockRoot)[i] !== InputType.CONTENT_BULLET) {
          if (rootItem.text !== item.text) {
            isEqual = false
            break
          }
        } else {
          for (let j = 0; j < rootItem.child.length; j++) {
            const rootChild = rootItem.child[j]
            const child = item.child[j]
            if (!child) {
              isEqual = false
              break
            }
            if (rootChild.text !== child.text) {
              isEqual = false
              break
            }
          }
        }
      }
    }
    // console.log('currentBlock:', currentBlock);
    // console.log('blocks:', blocks);
    // console.log('blockRoot:', blockRoot);
    return isEqual
  }

  const send = () => {
    const updatedBlock: BlockState = {
      education: blockState.education,
      workExperience: blockState.workExperience,
      organization: blockState.organization,
      certificate: blockState.certificate,
      personalProject: blockState.personalProject,
      achievement: blockState.achievement,
      conference: blockState.conference,
      award: blockState.award,
      teachingExperience: blockState.teachingExperience,
      volunteer: blockState.volunteer,
      support: blockState.support,
      language: blockState.language,
      publication: blockState.publication,
      skill: blockState.skill,
      interest: blockState.interest,
      softSkill: blockState.softSkill,
      reference: blockState.reference
    }
    dispatch(sendUpdateBlock({ id: documentState.resume.block._id || '-1', body: updatedBlock }))
  }

  return [set, compare, send]
}
