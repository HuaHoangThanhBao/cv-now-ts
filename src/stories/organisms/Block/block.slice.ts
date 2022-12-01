import { createReducer, createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { pagesOneColumn, pagesTwoColumn } from '../../../contants/ColumnFormat';
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
  DetailDetail,
  Education,
  GlobalIterator,
  Publication,
  WorkExperience,
} from '../../../types/Block';
import { InputType } from '../../../types/Input';
import { PositionA, PositionB } from '../../../types/Position';
import { convert, create, getChildWithId, moveChildBlockToParentBlock } from '../../../utils';

export interface PageState {
  pages: string[][][];
}

export interface PageColumnFormatState {
  pagesOneColumn: string[][][];
  pagesTwoColumn: string[][][];
}

export interface PageTransformState extends PageColumnFormatState {
  isOneColumn?: boolean;
}

export interface BlockSelectState {
  selectedBlock: {
    blockType?: string;
    blockId?: string;
    blockChildIndex?: number;
    selectedElement: string;
  };
}

export enum BlockMoveType {
  down = 'down',
  up = 'up',
  drag = 'drag',
}

export interface BlockMovingState {
  isMovingBlock?: boolean;
  blockMovingId: string;
  blockMoveType: BlockMoveType;
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
  child?: DetailDetail;
}

export interface BlockCreateState {
  blockCreateId: string;
}

const initialState: BlockState &
  BlockCreateState &
  BlockMovingState &
  BlockSelectState &
  PageState &
  PageTransformState &
  PageColumnFormatState = {
  pages: [
    [
      ['3', '4', '1'],
      ['5', '6', '7', '8'],
    ],
    [['9', '2', '10'], ['13']],
    [['16'], ['14']],
    [['12'], []],
  ],
  pagesOneColumn: pagesOneColumn,
  pagesTwoColumn: pagesTwoColumn,
  isOneColumn: false,
  blockMovingId: '-1',
  isMovingBlock: false,
  blockCreateId: '-1',
  selectedBlock: {
    blockType: '',
    blockId: '-1',
    blockChildIndex: -1,
    selectedElement: '',
  },
  blockMoveType: BlockMoveType.down,
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
export const onMovingBlock = createAction<boolean>('block/onMovingBlock');
export const movingBlockContentUp = createAction<string>('block/movingBlockContentUp');
export const movingBlockContentDown = createAction<string>('block/movingBlockContentDown');
export const movingBlock = createAction<BlockMovingState>('block/movingBlock');
export const updatePages = createAction<PageState>('block/updatePages');
export const transformPages = createAction<PageTransformState>('block/transformPages');

const blogSlice = createReducer(initialState, (builder) => {
  builder.addCase(transformPages, (state, action) => {
    const status = action.payload.isOneColumn;
    const oneColumnFormat = action.payload.pagesOneColumn;
    const twoColumnFormat = action.payload.pagesTwoColumn;
    if (status) {
      state.pages = oneColumnFormat;
      state.pagesOneColumn = state.pages;
    } else {
      state.pages = twoColumnFormat;
      state.pagesTwoColumn = state.pages;
    }
    state.isOneColumn = status;
  });
  builder.addCase(movingBlock, (state, action) => {
    const type = action.payload.blockMoveType;
    const _id = action.payload.blockMovingId;
    const blockId = _id.split('/')[0];
    let pages = JSON.parse(JSON.stringify(state.pages));

    pages = pages.map((page: string[][]) =>
      page.map((column: string[]) => column.filter((block: string) => !block.includes('/')))
    );
    /*Move child to parent*/
    pages = moveChildBlockToParentBlock(pages, state);
    /**/

    const tmp: PositionB[] = [];
    for (let a = 0; a < pages.length; a++) {
      for (let b = 0; b < pages[a].length; b++) {
        for (let c = 0; c < pages[a][b].length; c++) {
          const _block = pages[a][b][c].split('/')[0];
          if (_block === blockId) {
            tmp.push({ a, b, c, block: pages[a][b][c] });
          }
        }
      }
    }
    console.log('temp:', tmp);
    let childFound: PositionA = getChildWithId(pages, action.payload.blockMovingId);
    console.log('childFound:', childFound);
    let store = tmp.map((t: PositionB) => t.block);
    let found = false;
    if (type === BlockMoveType.down) {
      let max: PositionB = { a: -1, b: -1, c: -1 };
      for (let a = 0; a < pages.length; a++) {
        for (let b = 0; b < pages[a].length; b++) {
          for (let c = 0; c < pages[a][b].length; c++) {
            const _block = pages[a][b][c].split('/')[0];
            if (_block !== blockId) {
              if (a === childFound.i && b === childFound.j) {
                if (c > childFound.z) {
                  max = { a, b, c };
                  found = true;
                  break;
                }
              }
            }
          }
          if (found) break;
        }
        if (found) break;
      }
      console.log('max:', max);
      if (max.a === -1 && childFound.z <= pages[childFound.i][childFound.j].length - 1) {
        if (childFound.i + 1 < pages.length) {
          pages[childFound.i][childFound.j].splice(childFound.z, 1);
          pages[childFound.i + 1][childFound.j].splice(1, 0, ...store);
        }
      } else if (
        max.a > 0 ||
        (max.a === 0 && childFound.z < pages[childFound.i][childFound.j].length)
      ) {
        pages[childFound.i][childFound.j].splice(childFound.z, 1);
        pages[max.a][max.b].splice(max.c, 0, ...store);
      }
    } else if (type === BlockMoveType.up) {
      let min: PositionB = { a: -1, b: -1, c: -1 };
      for (let a = 0; a < pages.length; a++) {
        for (let b = 0; b < pages[a].length; b++) {
          for (let c = 0; c < pages[a][b].length; c++) {
            const _block = pages[a][b][c].split('/')[0];
            if (_block !== blockId) {
              if (a === childFound.i && b === childFound.j) {
                if (c < childFound.z && !pages[a][b][c].includes('/')) {
                  min = { a, b, c };
                }
              }
            }
          }
        }
      }
      console.log('min:', min);
      if (min.a === -1) {
        if (childFound.z === 0 && childFound.i - 1 >= 0) {
          for (let a = 0; a < pages.length; a++) {
            for (let b = 0; b < pages[a].length; b++) {
              for (let c = 0; c < pages[a][b].length; c++) {
                const _block = pages[a][b][c].split('/')[0];
                if (_block !== blockId) {
                  if (a === childFound.i - 1 && b === childFound.j) {
                    if (c < pages[a][b].length && !pages[a][b][c].includes('/')) {
                      min = { a, b, c };
                    }
                  }
                }
              }
            }
          }
          pages[childFound.i][childFound.j].splice(childFound.z, 1);
          pages[childFound.i - 1][childFound.j].splice(min.c, 0, ...store);
        }
      } else if (min.a > 0 || (min.a === 0 && childFound.z > 0)) {
        pages[childFound.i][childFound.j].splice(childFound.z, 1);
        pages[min.a][min.b].splice(min.c, 0, ...store);
      }
    }
    if (state.isOneColumn) {
      state.pagesOneColumn = pages;
    } else {
      state.pagesTwoColumn = pages;
    }
    state.pages = pages;
    console.log('pages after move move block:', JSON.parse(JSON.stringify(pages)));
  });
  builder.addCase(onMovingBlock, (state, action) => {
    state.isMovingBlock = action.payload;
  });
  builder.addCase(movingBlockContentUp, (state, action) => {
    const currentBlockContentId = action.payload;
    const blockId = currentBlockContentId.split('')[0];
    const blocks: Common[] = convert(blockId, state);
    const foundBlock = blocks.find((block: Common) => block.id === currentBlockContentId);
    const foundIndex = blocks.findIndex((block: Common) => block.id === currentBlockContentId);
    console.log('blocks:', JSON.parse(JSON.stringify(blocks)));
    console.log('foundIndex:', foundIndex);
    if (foundBlock) {
      if (foundIndex > 1) {
        blocks.splice(foundIndex - 1, 0, foundBlock);
        blocks.splice(foundIndex + 1, 1);
      } else if (foundIndex > 0) {
        foundBlock.header = blocks[0].header;
        blocks.splice(0, 0, foundBlock);
        blocks.splice(foundIndex + 1, 1);
      }
      console.log('blocks after move up:', JSON.parse(JSON.stringify(blocks)));
    }
  });
  builder.addCase(movingBlockContentDown, (state, action) => {
    const currentBlockContentId = action.payload;
    const blockId = currentBlockContentId.split('')[0];
    const blocks: Common[] = convert(blockId, state);
    const foundBlock = blocks.find((block: Common) => block.id === currentBlockContentId);
    const foundIndex = blocks.findIndex((block: Common) => block.id === currentBlockContentId);
    console.log('currentBlockContentId:', currentBlockContentId);
    console.log('blocks:', JSON.parse(JSON.stringify(blocks)));
    console.log('foundIndex:', foundIndex);
    if (foundBlock) {
      if (foundIndex === 0) {
        blocks.splice(foundIndex + 2, 0, foundBlock);
        blocks.splice(foundIndex, 1);
      } else if (foundIndex <= blocks.length - 2) {
        blocks.splice(foundIndex + 2, 0, foundBlock);
        blocks.splice(foundIndex, 1);
      }
      if (foundIndex === 0 && blocks.length > 1) {
        blocks[0].header = blocks[1].header;
      }
      console.log('blocks after move down:', JSON.parse(JSON.stringify(blocks)));
    }
  });
  builder.addCase(updatePages, (state, action) => {
    state.pages = action.payload.pages;
  });
  builder.addCase(updateSelectedBlock, (state, action) => {
    state.selectedBlock = { ...state.selectedBlock, ...action.payload.selectedBlock };
  });
  builder.addCase(createBlock, (state, action) => {
    const blockCreateId = action.payload.blockCreateId;
    let newData = { ...create(blockCreateId) };
    newData.uid = uuidv4();
    const blocks: Common[] = convert(blockCreateId, state);
    let newBlockId = '';
    if (blocks.length >= 1) {
      newBlockId += blockCreateId + '/' + blocks.length;
      newData.id = newBlockId;
    }
    blocks.push(newData);
    console.log('blocks created:', JSON.parse(JSON.stringify(blocks)));
  });
  builder.addCase(updateBlock, (state, action) => {
    const payload = action.payload;
    let data = payload.data;
    const blockId = payload.data.id.split('/')[0];
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
    const blocks: Common[] = convert(blockId, state);
    const dir: number = blocks.findIndex((d: Common) => d.uid === data.uid);
    blocks[dir] = data;
  });
});

export default blogSlice;
