export interface IncomeSource {
  checked: boolean;
}

export type CheckList = Record<string, IncomeSource>;

export interface FundingSourceItemProps extends IncomeSource {
  onChange: () => void;
  title: string;
}
