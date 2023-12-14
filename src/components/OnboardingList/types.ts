export interface OnboardingListProps {
  itemList: ICategories[];
  onItemClick: (selectedItem: string) => void;
  title: string;
  subtitle: string;
}

export interface ICategories {
  topic: string;
  details?: string;
}
