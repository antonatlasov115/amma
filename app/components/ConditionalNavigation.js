'use client';

import { usePathname } from 'next/navigation';
import ModernNavigation from './ModernNavigation';

export default function ConditionalNavigation() {
  // Используем везде ModernNavigation
  return <ModernNavigation />;
} 