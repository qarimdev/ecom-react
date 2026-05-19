import { mockProducts } from './mockData';

export const PRODUCT_CATEGORIES = Array.from(
  new Set(mockProducts.map((p) => p.category))
).sort();

export const categoryToSlug = (category: string): string =>
  category.toLowerCase().replace(/\s+/g, '-');

export const slugToCategory = (slug: string): string | undefined =>
  PRODUCT_CATEGORIES.find((c) => categoryToSlug(c) === slug.toLowerCase());

export const categoryMeta: Record<
  string,
  {
    description: string;
    tagline: string;
    gradient: string;
    accent: string;
  }
> = {
  Electronics: {
    description: 'Workstations, peripherals, and smart devices for modern teams.',
    tagline: 'Core hardware & devices',
    gradient: 'from-cyan-600 to-blue-700',
    accent: 'cyan',
  },
  Accessories: {
    description: 'Cables, hubs, cases, and desk essentials to complete your setup.',
    tagline: 'Connect & equip',
    gradient: 'from-violet-600 to-indigo-700',
    accent: 'violet',
  },
  Home: {
    description: 'Smart office lighting and workspace gear for productive environments.',
    tagline: 'Workspace comfort',
    gradient: 'from-emerald-600 to-teal-700',
    accent: 'emerald',
  },
};

export const getProductsByCategory = (category: string) =>
  mockProducts.filter((p) => p.category === category);
