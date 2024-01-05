export interface InvesterOccuppation {
  checked: boolean;
}

export type CheckList = Record<string, InvesterOccuppation>;

export interface FundingSourceItemProps extends InvesterOccuppation {
  onChange: () => void;
  title: string;
}
