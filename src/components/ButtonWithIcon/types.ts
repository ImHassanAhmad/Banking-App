export interface ButtonWithIconProps {
  title: string;
  icon: string;
  handleClick?: () => void;
  disabled?: boolean;
  iconType?: 'start' | 'end';
  variant?: 'outlined' | 'contained';
  sx?: any;
}
