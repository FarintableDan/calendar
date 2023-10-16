import { Button, Flex } from "antd";

import "./ConfirmPanel.css";

export const ConfirmPanel = ({
  onConfirm,
  onCancel,
  confirmButtonText = "Подтвердить",
  cancelButtonText = "Отменить",
  disabled,
}) => {
  return (
    <Flex justify="end" className="confirmPanel">
      <Button onClick={onCancel}>{cancelButtonText}</Button>
      <Button
        disabled={disabled}
        className="confirmPanel_apply"
        type="primary"
        onClick={onConfirm}
      >
        {confirmButtonText}
      </Button>
    </Flex>
  );
};
