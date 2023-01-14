export interface BlockHeaderProps {
  children?: JSX.Element | JSX.Element[]
}

export const BlockHeader = ({ children }: BlockHeaderProps) => {
  return <div className="block-header">{children}</div>
}
