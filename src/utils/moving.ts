import { v4 as uuidv4 } from 'uuid';

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

export const insertChildsToAfterParent = (pages: any, group: any) => {
  for (let i = 0; i < Object.keys(group).length; i++) {
    const g = Object.keys(group)[i];
    const { a, b, c } = getChildWithId(pages, g);
    pages[a][b].splice(c + 1, 0, ...Object.values(group[g]));
  }
};

export const moveChildToParent = (pages: any, isAssign: boolean = false) => {
  /* Move child to parent*/
  let parents: any = [];
  let childs: any = [];
  const group: any = {};
  // if (pages.length > 1) {
  //   pages.forEach((page: any) =>
  //     page.forEach((column: any) =>
  //       column.forEach((block: any) => {
  //         if (block && block.includes('/')) {
  //           childs.push({ uid: uuidv4(), block: block });
  //         }
  //       })
  //     )
  //   );
  //   parents = pages.map((page: any) =>
  //     page.map((column: any) =>
  //       column.filter((block: any) => {
  //         return block && !block.includes('/');
  //       })
  //     )
  //   );
  //   if (isAssign) {
  //     pages = parents;
  //   }
  //   for (let i = 0; i < childs.length; i++) {
  //     const child = childs[i];
  //     const block = childs[i].block;
  //     const blockId = block.split('/')[0];
  //     group[blockId] = {
  //       ...group[blockId],
  //       [child.uid]: block,
  //     };
  //   }
  //   if (isAssign) {
  //     insertChildsToAfterParent(pages, group);
  //   }
  //   // console.log('childs:', childs);
  //   // console.log('group:', group);
  //   console.log('page after move child to parent:', pages);
  // }
  /* End Move child to parent*/
  return { result: pages, parents, group };
};

export const movingBlockDown = (parents: any, blockId: string, block: string) => {
  let found = false;
  for (let a = 0; a < parents.length; a++) {
    for (let b = 0; b < parents[a].length; b++) {
      for (let c = 0; c < parents[a][b].length; c++) {
        if (parents[a][b][c] === blockId) {
          if (c < parents[a][b].length - 1) {
            parents[a][b].splice(c + 2, 0, blockId);
            parents[a][b].splice(c, 1);
          } else if (a + 1 < parents.length && !block.includes('/')) {
            const removedNext = parents[a + 1][b].shift();
            parents[a][b].push(removedNext);
            parents[a + 1][b].unshift(blockId);
            parents[a][b].splice(c, 1);
          }
          found = true;
          break;
        }
      }
      if (found) break;
    }
    if (found) break;
  }
};

export const movingBlockUp = (parents: any, blockId: string) => {
  let found;
  for (let a = 0; a < parents.length; a++) {
    for (let b = 0; b < parents[a].length; b++) {
      for (let c = 0; c < parents[a][b].length; c++) {
        if (parents[a][b][c] === blockId) {
          if (c > 0) {
            parents[a][b].splice(c - 1, 0, blockId);
            parents[a][b].splice(c + 1, 1);
          } else if (a > 0) {
            const removedPrev = parents[a - 1][b].pop();
            parents[a][b].unshift(removedPrev);
            parents[a][b].splice(c + 1, 1);
            parents[a - 1][b].push(blockId);
          }
          found = true;
          break;
        }
      }
      if (found) break;
    }
    if (found) break;
  }
};

export const movingBlockChildDown = (_pages: any, block: string) => {
  let found = false;
  let movingChild: any = null;
  for (let a = 0; a < _pages.length; a++) {
    for (let b = 0; b < _pages[a].length; b++) {
      for (let c = 0; c < _pages[a][b].length; c++) {
        if (_pages[a][b][c] === block) {
          console.log(a, b, c);
          movingChild = { pageI: a, columnI: b, blockI: c, block: _pages[a][b][c] };
        }
      }
      if (found) break;
    }
    if (found) break;
  }
  found = false;
  for (let a = 0; a < _pages.length; a++) {
    for (let b = 0; b < _pages[a].length; b++) {
      for (let c = 0; c < _pages[a][b].length; c++) {
        const num = Number(_pages[a][b][c].split('/')[0]);
        const numChild = Number(movingChild.block.split('/')[0]);
        if (num === numChild) {
          if (c > movingChild.blockI || a !== movingChild.pageI) {
            _pages[a][b].splice(c + 1, 0, movingChild.block);
            _pages[movingChild.pageI][movingChild.columnI].splice(movingChild.blockI, 1);
            found = true;
            break;
          }
        }
        if (found) break;
      }
      if (found) break;
    }
  }
};

export const movingBlockChildUp = (_pages: any, block: string) => {
  let found = false;
  let movingChild: any = null;
  for (let a = 0; a < _pages.length; a++) {
    for (let b = 0; b < _pages[a].length; b++) {
      for (let c = 0; c < _pages[a][b].length; c++) {
        if (_pages[a][b][c] === block) {
          console.log(a, b, c);
          movingChild = { pageI: a, columnI: b, blockI: c, block: _pages[a][b][c] };
        }
      }
      if (found) break;
    }
    if (found) break;
  }
  found = false;
  let res: any = {};
  for (let a = 0; a < _pages.length; a++) {
    for (let b = 0; b < _pages[a].length; b++) {
      for (let c = 0; c < _pages[a][b].length; c++) {
        const num = Number(_pages[a][b][c].split('/')[0]);
        const numChild = Number(movingChild.block.split('/')[0]);
        if (num === numChild) {
          console.log(a, b, c);
          if (c < movingChild.blockI || a !== movingChild.pageI) {
            res = { a, b, c };
          }
        }
        if (found) break;
      }
      if (found) break;
    }
  }
  _pages[movingChild.pageI][movingChild.columnI].splice(movingChild.blockI, 1);
  _pages[res.a][res.b].splice(res.c, 0, movingChild.block);
};
