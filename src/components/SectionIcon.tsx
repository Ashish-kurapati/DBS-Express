type SectionIconProps = {
  label?: string
}

export function SectionIcon({ label = 'DBS guidance' }: SectionIconProps) {
  return (
    <span className="section-icon" role="img" aria-label={label}>
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24 5 39 11v11c0 10-6 17-15 21C15 39 9 32 9 22V11l15-6Z" />
        <path d="m17 24 5 5 10-11" />
      </svg>
    </span>
  )
}
