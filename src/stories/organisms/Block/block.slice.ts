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

export interface BlockSelectState {
  selectedBlock: {
    blockType?: string;
    blockId?: number;
    blockChildIndex?: number;
    selectedElement: string;
  };
}

export interface PageState {
  pages: number[][][];
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

export interface BlockCreateState {
  blockCreateId: number;
}

const initialState: BlockState & BlockCreateState & BlockSelectState & PageState = {
  pages: [
    [
      [2, 3, 4, 1],
      [5, 6, 7, 8],
    ],
    [[9, 10, 11], [13]],
    [[16], [14]],
    [[12], []],
  ],
  blockCreateId: -1,
  selectedBlock: {
    blockType: '',
    blockId: -1,
    blockChildIndex: -1,
    selectedElement: '',
  },
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

export const updateSelectedBlock = createAction<BlockSelectState>('block/updateSelectedBlock');
export const updateBlock = createAction<BlockUpdateState>('block/updateBlock');
export const createBlock = createAction<BlockCreateState>('block/createBlock');
export const updatePages = createAction<PageState>('block/updatePages');

const blogSlice = createReducer(initialState, (builder) => {
  builder.addCase(updatePages, (state, action) => {
    state.pages = action.payload.pages;
  });
  builder.addCase(updateSelectedBlock, (state, action) => {
    state.selectedBlock = { ...state.selectedBlock, ...action.payload.selectedBlock };
  });
  builder.addCase(createBlock, (state, action) => {
    const blockCreateId = action.payload.blockCreateId;
    let newData: any = initialState.education;
    switch (blockCreateId) {
      case 1:
        newData = { ...educationMetaData };
        break;
      case 2:
        newData = { ...workExperienceMetaData };
        break;
      case 3:
        newData = { ...organizationMetaData };
        break;
      case 4:
        newData = { ...certificateMetaData };
        break;
      case 5:
        newData = { ...personalProjectMetaData };
        break;
      case 6:
        newData = { ...achievementMetaData };
        break;
      case 7:
        newData = { ...conferenceMetaData };
        break;
      case 8:
        newData = { ...awardMetaData };
        break;
      case 9:
        newData = { ...teachingExperienceMetaData };
        break;
      case 10:
        newData = { ...volunteerMetaData };
        break;
      case 11:
        newData = { ...supportMetaData };
        break;
      case 12:
        newData = { ...languageMetaData };
        break;
      case 13:
        newData = { ...publicationMetaData };
        break;
      case 14:
        newData = { ...skillMetaData };
        break;
      case 15:
        newData = { ...interestMetaData };
        break;
      case 16:
        newData = { ...softSkillMetaData };
        break;
      case 17:
        newData = { ...referenceMetaData };
        break;
    }
    newData.uid = uuidv4();
    let newBlockId = 0;
    const blocks: Common[] = convert(blockCreateId, state);
    if (blocks.length >= 1) {
      newBlockId = newData.id + blocks.length * 0.1;
      newData.id = newBlockId;
    }
    blocks.push(newData);

    /*push block to page*/
    const blockId = action.payload.blockCreateId;
    const blockIdFormat = Math.floor(blockId);
    const pages = JSON.parse(JSON.stringify(state.pages));
    let blockOldIndex = -1;
    let columnOldIndex = -1;
    let pageOldIndex = -1;
    for (let i = 0; i < pages.length; i++) {
      for (let j = 0; j < pages[i].length; j++) {
        const clone = pages[i][j].map((column: any) => Math.floor(column));
        const _blockOldIndex = clone.lastIndexOf(blockIdFormat);
        if (_blockOldIndex !== -1) {
          blockOldIndex = _blockOldIndex;
          columnOldIndex = j;
          pageOldIndex = i;
        }
        break;
      }
    }
    if (blockOldIndex !== -1 && pageOldIndex !== -1 && columnOldIndex !== -1) {
      pages[pageOldIndex][columnOldIndex].splice(blockOldIndex + 1, 0, newBlockId);
    }
    console.log('updated pages:', pages);
    state.pages = pages;
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
