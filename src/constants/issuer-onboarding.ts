import { type ICategories } from '@app/components/OnboardingList/types';
import { BusinessCategoryType } from '@app/pages/BusinessCategory/types';
import { BusinessTypes } from '@app/pages/BusinessType/types';
import { type Category } from '@app/types/types';

export const BUSINESS_CATEGORY: Category[] = [
  {
    id: BusinessCategoryType.Arts,
    topic: 'Arts, Entertainment & Recreation',
    subcategories: [{ name: 'Painting' }, { name: 'Sculpture' }, { name: 'Photography' }]
  },
  {
    id: BusinessCategoryType.Mining,
    topic: 'Mining',
    subcategories: [{ name: 'Coal' }, { name: 'Gold' }, { name: 'Diamond' }]
  },
  {
    id: BusinessCategoryType.Manufacturing,
    topic: 'Manufacturing',
    subcategories: [{ name: 'Automobile' }, { name: 'Electronics' }, { name: 'Textile' }]
  },
  {
    id: BusinessCategoryType.Energy,
    topic: 'Energy Production & Transmission',
    subcategories: [{ name: 'Solar' }, { name: 'Wind' }, { name: 'Hydro' }]
  },
  {
    id: BusinessCategoryType.Water,
    topic: 'Water Supply & Waste Management',
    subcategories: [{ name: 'Drinking Water' }, { name: 'Wastewater Treatment' }]
  },
  {
    id: BusinessCategoryType.Construction,
    topic: 'Construction',
    subcategories: [{ name: 'Residential' }, { name: 'Commercial' }, { name: 'Infrastructure' }]
  }
];

export const BUSINESS_TYPES: ICategories[] = [
  {
    id: BusinessTypes.solo,
    topic: 'Solo Trade',
    details: 'Business owned and operated by a single individual'
  },
  {
    id: BusinessTypes.private,
    topic: 'Private Limited Liability Company',
    details: 'Business structure where ownership is divided into shared'
  },
  {
    id: BusinessTypes.other,
    topic: 'Other',
    details: 'Partnerships, public limited companies, or other unique legal entities'
  }
];

export const BINARY_ANSWER_OPTIONS: ICategories[] = [
  {
    topic: 'Yes',
    id: 'yes'
  },
  {
    topic: 'No',
    id: 'no'
  }
];
