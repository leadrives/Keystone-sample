import * as React from 'react';
import { CellContainer } from '@keystone-6/core/admin-ui/components';

interface CustomLinkCellProps {
  item: {
    value?: string | null;
  };
}

export function CustomLinkCell({ item }: CustomLinkCellProps) {
  const url = item.value;
  if (!url) {
    return <CellContainer>—</CellContainer>;
  }
  return (
    <CellContainer>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
      >
        View Page
      </a>
    </CellContainer>
  );
}
