export default class AudioPlayer {
  constructor(id, audioDelegate, volume, looped) {
    const player = audioDelegate
    player.volume = volume
    player.loop = looped
    player.preload = "auto"
    this.player = player
    this.id = id
    this.defaultVolume = volume
    this.muted = false
    this.paused = false
  }

  mute() {
    this.muted = true
    this.player.volume = 0
  }

  unmute() {
    this.muted = false
    this.player.volume = this.defaultVolume
  }

  pause() {
    this.paused = !this.player.paused
    this.player.pause()
  }

  unpause() {
    if (!this.paused) { return }
    this.paused = false
    if (this.muted) { return }
    this.player.play()
  }

  play() {
    if (this.muted) { return }
    this.player.currentTime = 0
    this.player.play()
  }

  stop() {
    this.player.pause()
  }

  resume() {
    this.player.play()
  }

  setVolume(volume) {
    this.defaultVolume = volume
    if (this.muted) { return }
    this.player.volume = volume
  }
}
