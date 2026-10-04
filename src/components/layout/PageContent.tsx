import { ReactNode } from 'react';

interface PageContentProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const MAX_WIDTH_CLASS: Record<NonNullable<PageContentProps['maxWidth']>, string> = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

export function PageContent({ children, maxWidth = 'lg' }: PageContentProps) {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto">
      <div
        className={`mx-auto w-full ${MAX_WIDTH_CLASS[maxWidth]} px-4 py-6 sm:px-6 md:px-8`}
      >
        {children}
      </div>
    </div>
  );
}
