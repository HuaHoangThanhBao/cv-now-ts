import { BlockChildren } from 'src/types/Block'

export const BlockHeader = ({ children }: BlockChildren) => {
  return <div className="block-header">{children}</div>
}
