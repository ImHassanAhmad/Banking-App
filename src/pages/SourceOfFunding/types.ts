export interface FundingSource {
  checked: boolean;
}

export type CheckList = Record<string, FundingSource>;

export interface FundingSourceItemProps extends FundingSource {
  onChange: () => void;
  title: string;
}
