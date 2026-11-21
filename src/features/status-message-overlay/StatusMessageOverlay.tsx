"use client";

import { StatusMessageDialog } from "@/common/components/StatusMessageDialog/StatusMessageDialog";
import { StatusMessageDialogContent } from "@/common/components/StatusMessageDialog/StatusMessageDialogContent";
import { StatusMessageDialogDivider } from "@/common/components/StatusMessageDialog/StatusMessageDialogDivider";
import { StatusMessageDialogTitle } from "@/common/components/StatusMessageDialog/StatusMessageDialogTitle";
import { isDefined } from "@/common/lib/utils/typeUtils";
import { useOverlayMessageStore } from "@/features/status-message-overlay/useOverlayMessageStore";

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
