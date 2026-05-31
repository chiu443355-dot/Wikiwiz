export function WikiWizLogo() {
  return (
    <div className="flex items-center gap-1">
      {/* Gold W Icon */}
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Stylized W in gold */}
        <path
          d="M3 4 L6 20 L9 10 L12 20 L15 8 L18 20 L21 4"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        />
        {/* Bottom accent */}
        <line x1="3" y1="24" x2="21" y2="24" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
      </svg>
      {/* WikiWiz Text */}
      <div className="flex flex-col -space-y-1">
        <span className="font-serif font-bold text-base text-primary leading-none">WikiWiz</span>
        <span className="text-xs font-medium text-primary/70 tracking-wide">GEETA</span>
      </div>
    </div>
  );
}
