import { Modal } from './Modal';

interface Props {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title = '請確認',
  message,
  confirmLabel = '確定',
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal open={open} onClose={onCancel} title={title} width={360}>
      <p style={{ margin: '0 0 18px', lineHeight: 1.6 }}>{message}</p>
      <div className="row-end">
        <button className="btn" onClick={onCancel}>
          取消
        </button>
        <button className="btn btn-danger" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
