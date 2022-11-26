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
