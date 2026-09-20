"use client";

import { StatusMessageDialog } from "@/components/_common/StatusMessageDialog/StatusMessageDialog";
import { StatusMessageDialogContent } from "@/components/_common/StatusMessageDialog/StatusMessageDialogContent";
import { StatusMessageDialogDivider } from "@/components/_common/StatusMessageDialog/StatusMessageDialogDivider";
import { StatusMessageDialogTitle } from "@/components/_common/StatusMessageDialog/StatusMessageDialogTitle";
import { isDefined } from "@/lib/utils/typeUtils";
import { useOverlayMessageStore } from "@/store/useOverlayMessageStore";

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
