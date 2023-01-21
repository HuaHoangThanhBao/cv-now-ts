import { BlockState } from 'src/stories/organisms/Block/block.slice'
import { http } from 'src/utils'

const blockApi = {
  put({ id, body }: { id: string; body: BlockState }): Promise<BlockState> {
    const url = `/blocks/${id}`
    return http.put(url, body)
  }
}

export default blockApi
