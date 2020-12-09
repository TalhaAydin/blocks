export interface InfoSectionProps {
  header: string
}

export const InfoSection: React.FC<InfoSectionProps> = ({
  header,
  children,
}) => {
  return (
    <div>
      <h2>{header}</h2>
      {children}
    </div>
  )
}
