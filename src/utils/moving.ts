import { BlockState } from '../stories/organisms/Block/block.slice';
import { convert } from './block';

export const getChildWithId = (pages: any, blockChildId: any): any => {
  let result = {};
  for (let i = 0; i < pages.length; i++) {
    for (let j = 0; j < pages[i].length; j++) {
      for (let z = 0; z < pages[i][j].length; z++) {
        const _blockContentId = pages[i][j][z];
        if (_blockContentId === blockChildId) {
          result = { i, j, z };
        }
      }
    }
  }
  return result;
};

export const moveChildBlockToParentBlock = (pages: string[][][], blockState: BlockState) => {
  /*Move child to parent*/
  let store: any = [];
  pages.forEach((page: any) =>
    page.forEach((column: any) => column.forEach((block: any) => store.push(block)))
  );
  // console.log('store:', store);
  // console.log('rootBlockState:', blockState);
  store.forEach((s: any) => {
    const t = convert(s, blockState);
    // console.log('t:', t);
    const res: any = {};
    t.forEach((_t: any) => {
      // console.log(_t);
      if (!res[_t.id.split('/')[0]]) {
        res[_t.id.split('/')[0]] = [_t.id];
      } else {
        res[_t.id.split('/')[0]].push(_t.id);
      }
    });
    // console.log('res:', res);
    for (const [key, item] of Object.entries(res)) {
      let found = false;
      for (let a = 0; a < pages.length; a++) {
        for (let b = 0; b < pages[a].length; b++) {
          for (let c = 0; c < pages[a][b].length; c++) {
            const _block = pages[a][b][c].split('/')[0];
            if (_block === key) {
              // console.log('key:', key);
              // console.log('item:', item);
              // console.log(a, b, c);
              // @ts-ignore
              const r = item.map((i: any) => i);
              // console.log('r:', r);
              pages[a][b].splice(c + 1, 0, ...r);
              pages[a][b].splice(c, 1);
              found = true;
              break;
            }
          }
          if (found) break;
        }
        if (found) break;
      }
    }
    // console.log('wow:', JSON.parse(JSON.stringify(pages)));
  });
  /**/
  return pages;
};
