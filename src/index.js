import Mach1EncodeModule from '../lib/Mach1Encode';
import Mach1DecodeModule from '../lib/Mach1Decode';

export class Mach1EncoderProxy {
  #player;
  #encodeModule;
  #decodeModule;

  constructor(source) {
    if (source) {
      this.#player = source;
    }

    new Mach1EncodeModule().then((m1EncodeModule) => {
      this.#encodeModule = new m1EncodeModule.Mach1Encode();

    });

    new Mach1DecodeModule().then((m1DecodeModule) => {
      this.#decodeModule = new m1DecodeModule.Mach1Decode();
      this.#decodeModule.setPlatformType(this.#decodeModule.Mach1PlatformType.Mach1PlatformDefault);
      this.#decodeModule.setDecodeAlgoType(this.#decodeModule.Mach1DecodeAlgoType.Mach1DecodeAlgoSpatial);
      this.#decodeModule.setFilterSpeed(0.9);
    });
  }

  decode({ yaw, pitch, roll }) {
    if (!this.#decodeModule) return null;
    if (this.#decodeModule !== null && yaw !== null && pitch !== null && roll !== null) {
      this.#decodeModule.beginBuffer();
      const decoded = this.#decodeModule.decode(yaw, pitch, roll);
      this.#decodeModule.endBuffer();

      if (this.#player) {
        this.#player.gains = decoded;
      }

      // console.log('decoded:', decoded);
      return decoded;
    }

    return null;
  }
}

export { default as Mach1SoundPlayer } from './services/Mach1SoundPlayer';
export { default as Mach1Renderer } from './services/Mach1Renderer';
export { default as Gimbal } from './services/Gimbal';
