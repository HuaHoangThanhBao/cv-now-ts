import { createReducer, createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
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
} from '../../../contants/MetaData';
import {
  Common,
  Education,
  GlobalIterator,
  Publication,
  WorkExperience,
} from '../../../types/Block';
import { InputType } from '../../../types/Input';
import { convert } from '../../../utils';

interface BlockSelectState {
  selectedBlock: number;
  selectedBlockChild: number;
  selectedElement: string;
}

export interface BlockState {
  education: Education[];
  workExperience: WorkExperience[];
  organization: Common[];
  certificate: Common[];
  personalProject: Common[];
  achievement: Common[];
  conference: Education[];
  award: Education[];
  teachingExperience: Education[];
  volunteer: WorkExperience[];
  support: Common[];
  language: Common[];
  publication: Publication[];
  skill: Common[];
  interest: Common[];
  softSkill: Common[];
  reference: Common[];
}

export interface BlockUpdateState {
  data: Education & WorkExperience & Publication & Common;
  type: string;
  value: string;
  child?: any;
}

const initialState: BlockState & BlockSelectState = {
  selectedBlock: -1,
  selectedBlockChild: -1,
  selectedElement: '',
  education: [educationMetaData],
  workExperience: [workExperienceMetaData],
  organization: [organizationMetaData],
  certificate: [certificateMetaData],
  personalProject: [personalProjectMetaData],
  achievement: [achievementMetaData],
  conference: [conferenceMetaData],
  award: [awardMetaData],
  teachingExperience: [teachingExperienceMetaData],
  volunteer: [volunteerMetaData],
  support: [supportMetaData],
  language: [languageMetaData],
  publication: [publicationMetaData],
  skill: [skillMetaData],
  interest: [interestMetaData],
  softSkill: [softSkillMetaData],
  reference: [referenceMetaData],
};

export const updateSelectedBlock = createAction<number>('block/updateSelectedBlock');
export const updateSelectedBlockChild = createAction<number>('block/updateSelectedBlockChild');
export const updateSelectedElement = createAction<string>('block/updateSelectedElement');
export const updateBlock = createAction<BlockUpdateState>('block/updateBlock');
export const createBlock = createAction('block/createBlock');

const blogSlice = createReducer(initialState, (builder) => {
  builder.addCase(updateSelectedBlock, (state, action) => {
    state.selectedBlock = action.payload;
  });
  builder.addCase(updateSelectedBlockChild, (state, action) => {
    state.selectedBlockChild = action.payload;
  });
  builder.addCase(updateSelectedElement, (state, action) => {
    state.selectedElement = action.payload;
  });
  builder.addCase(createBlock, (state) => {
    const newData = { ...educationMetaData };
    newData.uid = uuidv4();
    state.education.push(newData);
  });
  builder.addCase(updateBlock, (state, action) => {
    const payload = action.payload;
    let data = payload.data;
    const fieldType = payload.type;
    const value = payload.value;
    if (fieldType !== InputType.contentBullet) {
      data = JSON.parse(JSON.stringify(payload.data));
      data[fieldType as keyof GlobalIterator].text = value;
    } else {
      const childData = payload.child;
      const foundChild = data[fieldType].child.findIndex((child) => child === childData);
      data = JSON.parse(JSON.stringify(payload.data));
      data.content_bullet.child[foundChild].text = value;
    }
    const blocks: Common[] = convert(data.id, state);
    const dir: number = blocks.findIndex((d: Common) => d.uid === data.uid);
    blocks[dir] = data;
  });
});

export default blogSlice;
