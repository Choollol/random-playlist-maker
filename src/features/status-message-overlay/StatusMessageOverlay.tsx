"use client";

import { StatusMessageDialog } from "@/common/components/StatusMessageDialog";
import { isDefined } from "@/common/lib/utils/typeUtils";
import { useOverlayMessageStore } from "@/features/status-message-overlay/useOverlayMessageStore";

const StatusMessageOverlay = () => {
  const { overlayTitle, overlayMessage } = useOverlayMessageStore();

  return (
    <StatusMessageDialog open={isDefined(overlayMessage)}>
      <StatusMessageDialog.Title>{overlayTitle}</StatusMessageDialog.Title>

      <StatusMessageDialog.Divider />

      <StatusMessageDialog.Content>{overlayMessage}</StatusMessageDialog.Content>
    </StatusMessageDialog>
  );
};

export default StatusMessageOverlay;
