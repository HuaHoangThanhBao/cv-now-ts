import { BlockState } from '../stories/organisms/Block/block.slice';
import { Common } from '../types/Block';

export const convert = (blockType: string, state: BlockState): Common[] => {
  switch (blockType) {
    case '1':
      return state['education'];
    case '2':
      return state['workExperience'];
    case '3':
      return state['organization'];
    case '4':
      return state['certificate'];
    case '5':
      return state['personalProject'];
    case '6':
      return state['achievement'];
    case '7':
      return state['conference'];
    case '8':
      return state['award'];
    case '9':
      return state['teachingExperience'];
    case '10':
      return state['volunteer'];
    case '11':
      return state['support'];
    case '12':
      return state['language'];
    case '13':
      return state['publication'];
    case '14':
      return state['skill'];
    case '15':
      return state['interest'];
    case '16':
      return state['softSkill'];
    case '17':
      return state['reference'];
    default:
      return state['education'];
  }
};
