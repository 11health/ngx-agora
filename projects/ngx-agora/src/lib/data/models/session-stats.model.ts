export interface SessionStats {
  /** Call duration in seconds, represented by an aggregate value. */
  Duration?: string;
  /** Total received bitrate of the stream, in Kbps, represented by an instantaneous value. */
  RecvBitrate?: string;
  /** Total number of bytes received, represented by an aggregate value. */
  RecvBytes?: string;
  /** Total sent bitrate of the stream, in Kbps, represented by an instantaneous value. */
  SendBitrate?: string;
  /** Total number of bytes sent, represented by an aggregate value. */
  SendBytes?: string;
  /**
   * Number of users in the channel.
   *
   * rtc mode: The number of all users in the channel.
   * live mode
   *  - If the local user is an audience: The number of hosts in the channel + 1.
   *  - If the user is a host: The number of hosts in the channel.
   */
  UserCount?: string;
}
