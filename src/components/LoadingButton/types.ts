export interface LoadingButtonProps {
  title: string;
  isLoading: boolean;
  isDisabled?: boolean;
  type?: 'submit';
  handleClick?: () => void;
  sx?: any;
}
