export interface BeautyEffectOptions {
    /**
     * The contrast level, used with the `lighteningLevel` parameter.
     * - 0: Low contrast level.
     * - 1: (Default) The original contrast level.
     * - 2: High contrast level.
     */
    lighteningContrastLevel?: number;
    /**
     * The brightness level.
     *
     * The value ranges from 0.0 (original) to 1.0. The default value is 0.7.
     */
    lighteningLevel?: number;
    /**
     * The redness level.
     *
     * The value ranges from 0.0 (original) to 1.0. The default value is 0.1. This parameter adjusts the red saturation level.
     */
    rednessLevel?: number;
    /**
     * The sharpness level.
     *
     * The value ranges from 0.0 (original) to 1.0. The default value is 0.5. This parameter is usually used to remove blemishes.
     */
    smoothnessLevel?: number;
}