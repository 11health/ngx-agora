import { StreamEvent } from '../enums/stream-event.enum';
import { AudioProfile } from '../types/audio-profile.type';
import { ScreenProfile } from '../types/screen-profile.type';
import { SoundId } from '../types/sound-id.type';
import { VideoProfile } from '../types/video-profile.type';
import { AudioEffectOptions } from './audio-effect-options.model';
import { AudioMixingOptions } from './audio-mixing-options.model';
import { LocalStreamStats } from './local-stream-stats.model';
import { MediaStreamTrack } from './media-stream-track.model';
import { RemoteStreamStats } from './remote-stream-stats.model';
import { VideoPlayOptions } from './video-play-options.model';
import { VideoEncoderConfiguration } from './video-encoder-configuration.model';
import { BeautyEffectOptions } from './beauty-effect-options.model';

/**
 * The Stream object created by the [createStream](https://docs.agora.io/en/Video/API%20Reference/web/globals.html#createstream) method.
 *
 * A stream represents a published local or remote media stream object in a call session.
 * All Stream methods can be called for both local and remote streams, except for
 * [Stream.init](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html#init)
 * that only applies to the local stream.
 */
export interface Stream {
  /**
   * This method adds the audio or video tracks into the stream.
   *
   * @remark
   * This method does not support Firefox and Safari.
   * A Stream object can have only one audio track and one video track at most.
   *
   * @param track The track can be retrieved from the `mediaStream` method.
   *
   * @example
   * const localStream = AgoraRTC.createStream({audio: true, video: false});
   * localStream.addTrack(anotherStream.getVideoTrack());
   *
   */
  addTrack: (track: MediaStreamTrack) => void;
  /**
   * Adjusts Audio Mixing Volume
   *
   * @param level The volume of the mixing audio. The value ranges between 0 and 100 (default).
   */
  adjustAudioMixingVolume: (level: number) => void;
  /**
   * This method closes the video/audio stream.
   *
   * After calling this method, the camera and microphone authorizations are reset.
   */
  close: () => void;
  /**
   * @deprecated `v2.5.1`, use
   * [muteAudio](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html#muteaudio) instead.
   *
   * Disables the audio for a stream.
   *
   * This method disables the audio track in the stream.
   * It works only when the audio flag is `true` in the stream.
   */
  disableAudio: () => void;
  /**
   * @deprecated `v2.5.1`, use
   * [muteVideo](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html#mutevideo) instead.
   *
   * Disables the video for a stream.
   *
   * This method disables the video track in the stream.
   * It works only when the video flag is `true` in the stream.
   */
  disableVideo: () => void;
  /**
   * @deprecated `v2.5.1`, use
   * [unmuteAudio](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html#unmuteaudio) instead.
   *
   * Enabled the audio for a stream.
   *
   * This method enables the audio track in the stream.
   * It works only when the audio flag is `true` in the stream.
   *
   * @remark
   * By default the audio track is enabled. If you call
   * [disableAudio](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html#disableaudio),
   * call this method to enable audio.
   */
  enableAudio: () => void;
  /**
   * @deprecated `v2.5.1`, use
   * [unmuteVideo](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html#unmutevideo) instead.
   *
   * Enabled the video for a stream.
   *
   * This method enables the video track in the stream.
   * It works only when the video flag is `true` in the stream.
   *
   * @remark
   * By default the video track is enabled. If you call
   * [disabledVideo](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html#disablevideo),
   * call this method to enable audio.
   */
  enableVideo: () => void;
  /**
   * This method retrieves the current audio level.
   *
   * Call `setTimeout` or `setInterval` to retrieve the local or remote audio change.
   *
   * @example
   * setInterval(_ => {
   *  var audioLevel = stream.getAudioLevel();
   *  // Use audioLevel to render the UI
   * }, 100)
   *
   * @remark
   * This method does not apply to streams that contain no audio data and may result in warnings.
   *
   * Due to browser policy changes, this method must be triggered by the user's gesture on the
   * Chrome 70+ and Safari browser. See
   * [Autoplay Policy Changes](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes) for details.
   */
  getAudioLevel: () => number;
  /**
   * Returns the current playback position of the audio mixing if successful.
   */
  getAudioMixingCurrentPosition: () => number | void;
  /**
   * Returns the audio mixing duration (ms) if successful.
   */
  getAudioMixingDuration: () => number | void;
  /**
   * This method retrieves the audio track in the stream and can be used together with
   * [replaceTrack](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html#replacetrack).
   *
   * If the stream contains an audio track, it will be returned in a `MediaStreamTrack` object.
   */
  getAudioTrack: () => MediaStreamTrack | void;
  /**
   * Gets the volume of the audio effects.
   *
   * @example
   * const volumes = stream.getEffectsVolume();
   * volumes.forEach((soundId, volume) => {
   *    console.log("SoundId", soundId, "Volume", volume);
   * });
   *
   * @returns Returns an array that contains `soundId` and `volume`. Each soundId has a corresponding `volume`.
   * - `volume`: Volume of the audio effect. The value range is `[0,100]`.
   */
  getEffectsVolume: () => { soundId: SoundId; volume: number }[];
  /**
   * This method retrieves the stream ID.
   *
   * @example
   * const id = stream.getId()
   */
  getId: () => number;
  /**
   * This method gets the connection statistics of the stream.
   *
   * @remark
   * It may take some time to get some of the statistics.
   *
   * @example
   * localStream.getStats(stats => {
   *    console.log(`Local Stream accessDelay: ${stats.accessDelay}`);
   *    console.log(`Local Stream audioSendBytes: ${stats.audioSendBytes}`);
   *    console.log(`Local Stream audioSendPackets: ${stats.audioSendPackets}`);
   *    console.log(`Local Stream audioSendPacketsLost: ${stats.audioSendPacketsLost}`);
   *    console.log(`Local Stream videoSendBytes: ${stats.videoSendBytes}`);
   *    console.log(`Local Stream videoSendFrameRate: ${stats.videoSendFrameRate}`);
   *    console.log(`Local Stream videoSendPackets: ${stats.videoSendPackets}`);
   *    console.log(`Local Stream videoSendPacketsLost: ${stats.videoSendPacketsLost}`);
   *    console.log(`Local Stream videoSendResolutionHeight: ${stats.videoSendResolutionHeight}`);
   *    console.log(`Local Stream videoSendResolutionWidth: ${stats.videoSendResolutionWidth}`);
   * });
   *
   *
   * remoteStream.getStats(stats => {
   *    console.log(`Remote Stream accessDelay: ${stats.accessDelay}`);
   *    console.log(`Remote Stream audioReceiveBytes: ${stats.audioReceiveBytes}`);
   *    console.log(`Remote Stream audioReceiveDelay: ${stats.audioReceiveDelay}`);
   *    console.log(`Remote Stream audioReceivePackets: ${stats.audioReceivePackets}`);
   *    console.log(`Remote Stream audioReceivePacketsLost: ${stats.audioReceivePacketsLost}`);
   *    console.log(`Remote Stream endToEndDelay: ${stats.endToEndDelay}`);
   *    console.log(`Remote Stream videoReceiveBytes: ${stats.videoReceiveBytes}`);
   *    console.log(`Remote Stream videoReceiveDecodeFrameRate: ${stats.videoReceiveDecodeFrameRate}`);
   *    console.log(`Remote Stream videoReceiveDelay: ${stats.videoReceiveDelay}`);
   *    console.log(`Remote Stream videoReceiveFrameRate: ${stats.videoReceiveFrameRate}`);
   *    console.log(`Remote Stream videoReceivePackets: ${stats.videoReceivePackets}`);
   *    console.log(`Remote Stream videoReceivePacketsLost: ${stats.videoReceivePacketsLost}`);
   *    console.log(`Remote Stream videoReceiveResolutionHeight: ${stats.videoReceiveResolutionHeight}`);
   *    console.log(`Remote Stream videoReceiveResolutionWidth: ${stats.videoReceiveResolutionWidth}`);
   * });
   *
   * @returns Connection statistics of the stream.
   * - If it is a publishing stream, then the stats is
   *   [LocalStreamStats](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.localstreamstats.html).
   * - If it is a subscribing stream, then the stats is
   *   [RemoteStreamStats](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.remotestreamstats.html).
   */
  getStats: (callback: (stats: LocalStreamStats | RemoteStreamStats) => void) => void;
  /**
   * This method retrieves the video track in the stream and can be used together with
   * [replaceTrack](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html#replacetrack).
   *
   * If the stream contains an audio track, it will be returned in a `MediaStreamTrack` object.
   *
   */
  getVideoTrack: () => MediaStreamTrack | void;
  /**
   * This method retrieves the audio flag.
   *
   * @returns Audio flag of stream.
   * - `true`: The stream contains audio data.
   * -`false`: The stream does not contain audio data.
   */
  hasAudio: () => boolean;
  /**
   * This method retrieves the video flag.
   *
   * @returns Video flag of stream.
   * - `true`: The stream contains video data.
   * - `false`: The stream does not contain video data.
   */
  hasVideo: () => boolean;
  /**
   * This method initializes the local stream object.
   *
   * If this method fails
   * @see [getUserMedia Exceptions](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Exceptions)
   * for error information.
   *
   * Some errors might be returned in the callback, for example: `{type: "error", msg: "NotAllowedError", info: "Permission denied"}`.
   *
   * The possible error information in the `msg` field includes:
   *
   * - NotAllowedError: User refuses to grant access to camera or audio resource.
   * - MEDIA_OPTION_INVALID: The camera is occupied or the resolution is not supported (on browsers in early versions).
   * - DEVICES_NOT_FOUND: No device is found.
   * - NOT_SUPPORTED: The browser does not support using camera and microphone.
   * - PERMISSION_DENIED: The device is disabled by the browser or the user has denied permission of using the device.
   * - CONSTRAINT_NOT_SATISFIED: The settings are illegal (on browsers in early versions).
   * - PluginNotInstalledProperly: A screen-sharing request is made with no plugin installed or with a
   *   wrong extensionId on the Chrome browser.
   * - UNDEFINED: Undefined error.
   *
   * The `info` field shows the extra information for the error. If no more extra information, its value will be `null`.
   *
   * @example
   * init(_ => {
   *     console.log("local stream initialized");
   *     // publish the stream
   *     //……
   * }, err => {
   *     console.error("local stream init failed ", err);
   *     //error handling
   * });
   */
  init: (onSuccess?: () => void, onFailure?: (error: Error) => void) => void;
  /**
   * Returns whether the Stream is Playing
   *
   * - `true`: The stream is being rendered or playing on the page.
   * - `false`: The stream is neither being rendered nor playing on the page.
   */
  isPlaying: () => boolean;
  /**
   * Disables the audio track in the stream.
   *
   * - For local streams, the SDK stops sending audio after you call this method.
   * - For remote streams, the SDK still receives audio but stops playing it after you call this method.
   *
   * @remark
   * For local streams, it works only when the `audio` flag is `true` in the stream.
   *
   * @returns void ([Docs unclear](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html#muteaudio))
   * - `true`: Success.
   * - `false`: Failure. Possible reasons include no audio, stream not initialized, and audio track already disabled.
   */
  muteAudio: () => void;
  /**
   * Disables the video track in the stream.
   *
   * - For local streams, the SDK stops sending video after you call this method.
   * - For remote streams, the SDK still receives video but stops playing it after you call this method.
   *
   * @remark
   * For local streams, it works only when the video flag is true in the stream.
   *
   * @returns void ([Docs unclear](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html#mutevideo))
   * - `true`: Success.
   * - `false`: Failure. Possible reasons include no video, stream not initialized, and video track already disabled.
   */
  muteVideo: () => void;
  /**
   * Occurs when an Agora.io event connected to the specific stream is received from the SDK.
   *
   * @see [On](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html#on)
   * for all variations of this core function.
   */
  on: (event: StreamEvent, callback: (evt: any) => void) => void;
  /**
   * Pauses all audio effects.
   *
   * @example
   * stream.pauseAllEffects(err => {
   * if (err) {
   *         console.error("Failed to pause effects, reason: ", err);
   * } else {
   *         console.log("Effects are paused successfully");
   * }
   * });
   */
  pauseAllEffects: (callback?: (error: string | null) => void) => void;
  /**
   * Pauses audio mixing.
   */
  pauseAudioMixing: (callback?: (error: string | null) => void) => void;
  /**
   * Pauses a specified audio effect.
   *
   * @example
   * // When the audio effect 1 is playing
   * stream.pauseEffect(1, err => {
   *   if (err) {
   *      console.error("Failed to pause Effect, reason: ", err);
   *   } else {
   *      console.log("Effect is paused successfully");
   *   }
   * });
   */
  pauseEffect: (soundId: SoundId, callback?: (error: string | null) => void) => void;
  /**
   * Plays the video or audio stream.
   *
   * @remark
   * Due to browser policy changes, this method must be triggered by the user's
   * gesture on the Chrome 70+ and Safari browsers.
   * @see [Autoplay Policy Changes](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes) for details.
   *
   * @example
   * stream.play("agora_remote", {fit: 'contain'}); // stream will be played in the element with the ID agora_remote
   *
   * @param HTMLElementID
   * Represents the HTML element ID. Digits and letters in the ASCII character set, “_”, “-", and ".".
   * The string length must be greater than 0 and less than 256 bytes.
   */
  play: (HTMLElementID: string, option?: VideoPlayOptions, callback?: (err: string) => void) => void;
  /**
   * Plays a specified audio effect.
   *
   * This method supports playing multiple audio effect files at the same time, and is different from
   * [startAudioMixing](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html#startaudiomixing).
   * You can use this method to add specific audio effects for specific scenarios. For example, gaming.
   *
   * @remark
   * - Due to web browser autoplay policy changes, this method must be triggered by a user gesture on Chrome 70+ and Safari web
   *   browsers.
   * @see [Autoplay Policy Changes](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes) for details.
   *
   * This method supports the following web browsers:
   * - Safari 12 and later
   * - Chrome 65 and later
   * - Firefox 66 and later
   * - Call this method when you are in a channel. Otherwise, it may cause issues.
   *
   * @example
   * stream.playEffect({
   *    soundId: 1,
   *    filePath: "biu.mp3"
   * }, error => {
   *    if (error) {
   *        // Error handling
   *        return;
   *    }
   *    // Process after the method call succeeds
   * });
   *
   * @remark
   * The callbacks of the audio effect methods all use the Node.js callback pattern.
   */
  playEffect: (options: AudioEffectOptions, callback?: (error: string | null) => void) => void;
  /**
   * Preloads a specified audio effect file into the memory.
   *
   * To ensure smooth communication, limit the size of the audio effect file.
   *
   * @example
   * stream.preloadEffect(1, "https://web-demos-static.agora.io/agora/smlt.flac", err => {
   *   if (err) {
   *       console.error("Failed to preload effect, reason: ", err);
   *   } else {
   *       console.log("Effect is preloaded successfully");
   *   }
   * });
   */
  preloadEffect: (soundId: SoundId, filePath: string, callback?: (error: string | null) => void) => void;
  /**
   * Removes the audio or video tracks from the stream.
   *
   * @remark
   * - If you need to change both the audio and video tracks, we recommend using the replaceTrack method instead.
   * - This method does not support Firefox and Safari.
   *
   * @example
   * const localStream = AgoraRTC.createStream({ audio: true, video: true });
   * localStream.removeTrack(localStream.getAudioTrack());
   */
  removeTrack: (track: MediaStreamTrack) => void;
  /**
   * Replaces the audio or video MediaStreamTrack in the local stream.
   *
   * After the local stream is published, you can use this method to switch the cameras, or switch
   * between the microphone and the music player.
   *
   * The new track can be retrieved by getUserMedia, MediaElement.captureStream or other methods.
   *
   * The replaced track will be stopped.
   *
   * @remark
   * Supports Chrome 65+, Safari, and latest Firefox.
   * - Firefox does not support switching audio tracks between different microphones.
   *   You can replace the audio track from the microphone with an audio file, or vice versa.
   * - Replacing audio tracks from external audio devices may not be fully supported on Safari.
   * - The subscriber will not be notified if the track gets replaced.
   * - Agora recommends you use
   * [switchDevice](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html#switchdevice)
   * to switch the media input devices.
   *
   * @example
   * // Suppose we have a localStream1
   *   localStream2 = AgoraRTC.createStream({ video: true, cameraId: "ABC" });
   *   localStream2.setVideoProfile('<same as localStream1>')
   *   localStream2.init(_ => {
   *       const newVideoTrack = localStream2.getVideoTrack();
   *       localStream1.replaceTrack(newVideoTrack);
   *   });
   *
   */
  replaceTrack: (MediaStreamTrack: MediaStreamTrack, onSuccess?: () => void, onFailure?: (error: Error) => void) => void;
  /**
   * Resumes the Audio/Video Stream Playback
   *
   * This method can be used when the playback fails after calling the [Stream.play](https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.stream.html#play) method.
   * In most cases, the playback is stopped due to the browser policy.
   *
   * This method needs to be triggered by a user gesture. See [Autoplay Policy Changes](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes) for more information.
   */
  resume: () => Promise<any>;
  /**
   * Resumes playing all audio effects.
   *
   * @example
   * stream.resumeAllEffects(err => {
   *     if (err) {
   *         console.error("Failed to resume effects, reason: ", err);
   *     } else {
   *         console.log("Effects are resumed successfully");
   *     }
   * });
   */
  resumeAllEffects: (callback?: (error: string | null) => void) => void;
  /**
   * Resumes audio mixing.
   */
  resumeAudioMixing: (callback?: (error: string | null) => void) => void;
  /**
   * Resumes playing a specified audio effect.
   *
   * @example
   * // When the audio effect 1 is paused
   * stream.resumeEffect(1, err => {
   *     if (err) {
   *         console.error("Failed to resume Effect, reason: ", err);
   *     } else {
   *         console.log("Effect is resumed successfully");
   *     }
   * });
   */
  resumeEffect: (soundId: SoundId, callback?: (error: string | null) => void) => void;
  /**
   * Sets the playback position of the audio mixing file to a different start position (by default plays from the beginning).
   *
   * @param position
   * The time (ms) to start playing the audio mixing file, an integer. The value range is `[0,100000000]`.
   */
  setAudioMixingPosition: (position: number, callback?: (error: string | null) => void) => void;
  /**
   * Sets the audio output device for the remote stream. You can use it to switch between the microphone and the speakerphone.
   * It can be called either before or after the remote stream is played.
   *
   * @remark
   * Only Chrome 49+ supports this function.
   *
   * @param deviceId The device ID can be retrieved from
   * [getDevices](https://docs.agora.io/en/Video/API%20Reference/web/globals.html#getdevices), whose
   * [kind](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.mediastreamtrack.html#kind) should be "audiooutput".
   *
   * The retrieved ID is ASCII characters, and the string length is greater than 0 and less than 256 bytes.
   */
  setAudioOutput: (deviceId: string, onSuccess?: () => void, onFailure?: (error: string) => void) => void;
  /**
   * This method sets the audio profile.
   * It is optional and works only when called before
   * [Stream.init](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html#init).
   * The default value is `'music_standard'`.
   *
   * Due to the limitations of browsers, some browsers may not be fully compatible with the audio profile you set.
   * - Firefox does not support setting the audio encoding rate.
   * - Safari does not support stereo audio.
   * - The latest version of Google Chrome does not support playing stereo audio, but supports sending a stereo audio stream.
   *
   * @param profile The audio profile has the following options:
   * - `'speech_low_quality'`: Sample rate 16 kHz, mono, encoding rate 24 Kbps.
   * - `'speech_standard'`: Sample rate 32 kHz, mono, encoding rate 24 Kbps.
   * - `'music_standard'`: Sample rate 48 kHz, mono, encoding rate 40 Kbps.
   * - `'standard_stereo'`: Sample rate 48 kHz, stereo, encoding rate 64 Kbps.
   * - `'high_quality'`: Sample rate 48 kHz, mono, encoding rate 128 Kbps.
   * - `'high_quality_stereo'`: Sample rate 48 kHz, stereo, encoding rate 192 Kbps.
   */
  setAudioProfile: (profile: AudioProfile) => void;
  /**
   * Sets the volume for the remote stream.
   * It can be called either before or after the remote stream is played.
   *
   * @param volume Ranges from 0 (muted) to 100 (loudest).
   */
  setAudioVolume: (volume: number) => void;
  /**
   * Enables/Disables image enhancement and sets the options.
   *
   * @param enabled Sets whether to enable image enhancement
   * @param options The image enhancement options.
   *
   * @example
   * stream.setBeautyEffectOptions(true, {
   *     lighteningContrastLevel: 1,
   *     lighteningLevel: 0.7,
   *     smoothnessLevel: 0.5,
   *     rednessLevel: 0.1
   * });
   *
   * @remark
   * - This function does not support mobile devices.
   * - If the dual-stream mode is enabled ([enableDualStream](https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.client.html#enabledualstream)), the image enhancement options apply only to the high-video stream.
   * - If image enhancement is enabled, you must call this method to disable it before calling the following methods: leave, stop, removeTrack, unpublish
   * - The image enhancement function involves real-time compute-intensive processing.
   * Though it is based on hardware acceleration, the processing has high GPU and CPU overheads.
   * For low-end devices, enabling image enhancement affects the system performance.
   * When the video resolution is set as 360p, 720p or higher, and the frame rate is set as 30 fps or 15 fps, do not enable image enhancement.
   */
  setBeautyEffectOptions: (enabled: boolean, options: BeautyEffectOptions) => void;
  /**
   * Sets the volume of the audio effects.
   *
   * @param volume
   * Volume of the audio effect. The value range is [0,100].The default value is 100 (the original volume).
   *
   * @example
   * stream.setEffectsVolume(0, err => {
   *     if (err) {
   *         console.error("Failed to set effects volume, reason: ", err);
   *     } else {
   *         console.log("Effects volume is set successfully");
   *     }
   * });
   */
  setEffectsVolume: (volume: number, callback?: (error: string | null) => void) => void;
  /**
   * This method sets the profile of the screen in screen-sharing.
   *
   * @see [Table](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html#setscreenprofile) for details.
   *
   * @remark
   * Due to limitations of some devices and browsers, the resolution you set may fail to take effect and get adjusted by the browser.
   * In this case, billings will be calculated based on the actual resolution.
   */
  setScreenProfile: (profile: ScreenProfile) => void;
  /**
   * Customizes the Video Encoder Configuration
   *
   * You can use this method to customize the video resolution, frame rate, and bitrate of the local stream. This method can be called before or after [Stream.init](https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.stream.html#init).
   */
  setVideoEncoderConfiguration: (config: VideoEncoderConfiguration) => void;
  /**
   * Sets the stream's video profile.
   * It is optional and works only when called before
   * [Stream.init](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html#init).
   * The default value is `'480p_1'`.
   *
   * @example
   * setVideoProfile("480p");
   *
   * @remark
   * - Whether 1080 resolution or above can be supported depends on the device. If the device cannot support 1080p, the actual frame rate
   *   is lower than the one listed in the table. Agora optimizes the video on low-end devices.
   * - The Safari browser does not support modifying the video frame rate (30 fps by default). If you set a frame rate other than 30 fps on
   *   Safari, the browser may change or reject your setting.
   * - Due to limitations of some devices and browsers, the resolution you set may fail to take effect and get adjusted by the browser. In
   *   this case, billings are calculated based on the actual resolution.
   */
  setVideoProfile: (profile: VideoProfile) => void;
  /**
   * Sets the volume of a specified audio effect.
   *
   * @param volume Volume of the audio effect. The value range is `[0,100]`.The default value is 100 (the original volume).
   *
   * @example
   * // When the audio effect 1 is loaded
   * stream.setVolumeOfEffect(1, 50, err => {
   *   if (err) {
   *       console.error("Failed to set volume of Effect, reason: ", err);
   *   } else {
   *       console.log("Effect volume is set to", 50);
   *   }
   * });
   *
   *
   */
  setVolumeOfEffect: (soundId: SoundId, volume: number, callback?: (error: string | null) => void) => void;
  /**
   * Starts Audio Mixing
   * This method mixes the specified online audio file with the audio stream from the microphone; or, it
   * replaces the microphone’s audio stream with the specified online audio file.
   *
   * You can specify the number of playback loops and play time duration.
   *
   * @remark
   * This method supports the following browsers:
   * - Safari 12 and later
   * - Chrome 65 and later
   * - Firefox 66 and later
   *
   * @remark
   * - Call this method when you are in a channel, otherwise, it may cause issues.
   * - Due to browser policy changes, this method must be triggered by the user's gesture on the Chrome 70+ and Safari browser.
   * @see [Autoplay Policy Changes](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes) for details.
   *
   * @example
   * stream.startAudioMixing({
   *     filePath: 'example.mp3'
   * }, error => {
   *     if (error) {
   *         // Error handling
   *         return;
   *     }
   *     // Processes after stream playing
   * })
   */
  startAudioMixing: (options: AudioMixingOptions, callback?: (error: string | null) => void) => void;
  /**
   * Stops the Audio/Video Stream
   *
   * Call this method to stop playing the stream set by
   * [Stream.play](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html#play).
   */
  stop: (callback?: (error: string | null) => void) => void;
  /**
   * Stops playing all audio effects.
   *
   * @example
   * stream.stopAllEffects(err => {
   *   if (err) {
   *       console.error("Failed to stop effects, reason: ", err);
   *   } else {
   *       console.log("Effects are stopped successfully");
   *   }
   * });
   */
  stopAllEffects: (callback: (error: string | null) => void) => void;
  /**
   * Stops audio mixing.
   */
  stopAudioMixing: (callback: (error: string | null) => void) => void;
  /**
   * Stops playing a specified audio effect.
   *
   * @example
   * // When the audio effect 1 is playing
   * stream.stopEffect(1, err => {
   *   if (err) {
   *       console.error("Failed to stop Effect, reason: ", err);
   *   } else {
   *       console.log("Effect is stopped successfully");
   *   }
   * });
   */
  stopEffect: (soundId: SoundId, callback?: (error: string | null) => void) => void;
  /**
   * Switches the media input device.
   *
   * This method switches between the media input devices:
   * - Audio input devices, such as microphones.
   * - Video input devices, such as cameras.
   * If you call this method after [publish](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#publish),
   * there is no need to re-publish the stream after switching the device.
   *
   * @param deviceId Device ID, which can be retrieved from getDevices. The retrieved ID is ASCII characters,
   * and the string length is greater than 0 and less than 256 bytes.
   * @remark
   * This method does not support the following scenarios:
   * - Dual-stream mode is enabled by enableDualStream.
   * - The remote stream.
   * - The stream is created by defining the audioSource and videoSource properties.
   * - The Firefox browser.
   */
  switchDevice: (type: 'audio' | 'video', deviceId: string, onSuccess?: () => void, onFailure?: (error: string) => void) => void;
  /**
   * Releases a specified preloaded audio effect from the memory.
   *
   * @example
   * // When the audio effect 1 is loaded
   * stream.unloadEffect(1, err => {
   *   if (err) {
   *       console.error("Failed to unload effect, reason: ", err);
   *   } else {
   *       console.log("Effect is unloaded successfully");
   *   }
   * });
   */
  unloadEffect: (soundId: SoundId, callback?: (error: string | null) => void) => void;
  /**
   * Enables the audio track in the stream.
   *
   * @remark
   * For local streams, it works only when the audio flag is `true` in the stream.
   * By default the audio track is enabled. If you call muteAudio, call this method to enable audio.
   *
   * @returns void ([Docs unclear](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html#unmuteaudio))
   * - `true`: Success.
   * - `false`: Failure. Possible reasons include no audio, stream not initialized, and audio track already enabled.
   */
  unmuteAudio: () => void;
  /**
   * Enables the video track in the stream.
   *
   * @remark
   * For local streams, it works only when the video flag is true in the stream.
   *
   * By default the video track is enabled. If you call muteVideo, call this method to enable video.
   *
   * @returns void ([Docs unclear](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html#mutevideo))
   * - `true`: Success.
   * - `false`: Failure. Possible reasons include no video, stream not initialized, and video track already enabled.
   */
  unmuteVideo: () => void;
  /**
   * Not mentioned in Agora.io official docs, may be inherited DOM function.
   */
  addEventListener: (t: string, n: any) => any;
  /**
   * Calculates whether the stream's audio is currently active.
   *
   * @remark Refers to a snapshot of the stream's audio status and will return:
   * - `true`: if the connected user's audio is not muted.
   * - `false`: if the connected user's audio is muted.
   */
  isAudioOn: () => boolean;
  /**
   * Calculates whether the stream's video is currently active.
   *
   * @remark Refers to a snapshot of the stream's video status and will return:
   * - `true`: if the connected user's video is not muted.
   * - `false`: if the connected user's video is muted.
   */
  isVideoOn: () => boolean;
  /**
   * Whether the stream currently has its audio enabled.
   *
   * @version 2.5.2 and below only
   */
  audioEnabled?: boolean;
  /**
   * Whether the stream currently has its video enabled.
   *
   * @version 2.5.2 and below only
   */
  videoEnabled?: boolean;
}
