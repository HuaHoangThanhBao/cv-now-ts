import {
  achievementMetaData,
  awardMetaData,
  certificateMetaData,
  conferenceMetaData,
  educationMetaData,
  interestMetaData,
  languageMetaData,
  organizationMetaData,
  personalProjectMetaData,
  publicationMetaData,
  referenceMetaData,
  skillMetaData,
  softSkillMetaData,
  supportMetaData,
  teachingExperienceMetaData,
  volunteerMetaData,
  workExperienceMetaData,
} from '../contants/MetaData';
import { BlockState } from '../stories/organisms/Block/block.slice';
import { Common, Education, Publication, WorkExperience } from '../types/Block';

export const convert = (
  blockType: string,
  state: BlockState
): Education[] | WorkExperience[] | Publication[] | Common[] => {
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

export const create = (blockType: string): Common => {
  switch (blockType) {
    case '1':
      return educationMetaData;
    case '2':
      return workExperienceMetaData;
    case '3':
      return organizationMetaData;
    case '4':
      return certificateMetaData;
    case '5':
      return personalProjectMetaData;
    case '6':
      return achievementMetaData;
    case '7':
      return conferenceMetaData;
    case '8':
      return awardMetaData;
    case '9':
      return teachingExperienceMetaData;
    case '10':
      return volunteerMetaData;
    case '11':
      return supportMetaData;
    case '12':
      return languageMetaData;
    case '13':
      return publicationMetaData;
    case '14':
      return skillMetaData;
    case '15':
      return interestMetaData;
    case '16':
      return softSkillMetaData;
    case '17':
      return referenceMetaData;
    default:
      return educationMetaData;
  }
};
