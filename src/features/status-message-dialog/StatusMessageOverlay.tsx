"use client";

import { isDefined } from "@/common/lib/utils/typeUtils";
import { StatusMessageDialog } from "@/features/status-message-dialog/StatusMessageDialog";
import { StatusMessageDialogContent } from "@/features/status-message-dialog/StatusMessageDialogContent";
import { StatusMessageDialogDivider } from "@/features/status-message-dialog/StatusMessageDialogDivider";
import { StatusMessageDialogTitle } from "@/features/status-message-dialog/StatusMessageDialogTitle";
import { useOverlayMessageStore } from "@/features/status-message-dialog/useOverlayMessageStore";

const StatusMessageOverlay = () => {
  const { overlayTitle, overlayMessage } = useOverlayMessageStore();

  return (
    <StatusMessageDialog open={isDefined(overlayMessage)}>
      <StatusMessageDialogTitle>{overlayTitle}</StatusMessageDialogTitle>

      <StatusMessageDialogDivider />

      <StatusMessageDialogContent>{overlayMessage}</StatusMessageDialogContent>
    </StatusMessageDialog>
  );
};

export default StatusMessageOverlay;
