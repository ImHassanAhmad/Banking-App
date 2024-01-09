export interface AddNewAgentProps {
  open: boolean;
  handleClose: () => void;
  onSuccess?: () => void;
  onErrored?: () => void;
}
