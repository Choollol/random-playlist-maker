"use client";

import { StatusMessageDialog } from "@/common/components/StatusMessageDialog";
import { OVERLAY_MESSAGE_CLOSE } from "@/common/lib/utils/overlayMessageUtils";
import { isDefined } from "@/common/lib/utils/typeUtils";
import { useOverlayMessageStore } from "@/features/status-message-overlay/useOverlayMessageStore";

const StatusMessageOverlay = () => {
  const { overlayTitle, overlayMessage, doWait, setOverlayMessage } = useOverlayMessageStore();

  const closeOverlay = () => {
    setOverlayMessage(OVERLAY_MESSAGE_CLOSE);
  };

  return (
    <StatusMessageDialog
      open={isDefined(overlayMessage)}
      onClose={doWait ? closeOverlay : undefined}
    >
      <StatusMessageDialog.Title>{overlayTitle}</StatusMessageDialog.Title>

      <StatusMessageDialog.Divider />

      <StatusMessageDialog.Content>
        {overlayMessage}
        {doWait ? (
          <StatusMessageDialog.Subtext>
            Click anywhere in the background to close this dialog
          </StatusMessageDialog.Subtext>
        ) : null}
      </StatusMessageDialog.Content>
    </StatusMessageDialog>
  );
};

export default StatusMessageOverlay;
