/**
 * This interface contains information that describes a single media input or output device.
 * The list of devices obtained by calling [AgoraRTC.getDevices](https://docs.agora.io/en/Video/API%20Reference/web/globals.html#getdevices)
 * is an array of MediaDeviceInfo objects, one per media device.
 */
export interface MediaDeviceInfo {
  /** Unique ID of the device. */
  deviceId: string;
  /** Returns an enumerated value that is "videoinput", "audioinput" or "audiooutput". */
  kind: MediaDeviceKind;
  /**
   * Returns a DOMString that is a label describing this device (for example "External USB Webcam").
   *
   * @remark
   * For security reasons, the label field is always blank unless an active media stream exists
   * or the user has granted persistentpermission for media device access.
   */
  label: string;
}
