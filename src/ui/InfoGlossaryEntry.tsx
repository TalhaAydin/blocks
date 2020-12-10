export interface InfoGlossaryEntryProps {
  term: string
  details: string
  enabled?: boolean
}

export const InfoGlossaryEntry: React.FC<InfoGlossaryEntryProps> = ({
  term,
  details,
  enabled = true,
}) => {
  const opacity = enabled ? 1 : 0.5
  return (
    <>
      <dt style={{ opacity }}>{term}</dt>
      <dd style={{ opacity }}>{details}</dd>
    </>
  )
}
