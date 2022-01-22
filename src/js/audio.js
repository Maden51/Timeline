export default class Audio {
  constructor() {
    this.audioEl = null;
  }

  init() {
    this.recordingAudioBtn = document.querySelector('.control__audio');
    this.recordingVidoeBtn = document.querySelector('.control__video');
    this.form = document.querySelector('form__input');
    this.initListeners();
  }

  initListeners() {
    this.recordingAudioBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.audioEl = document.createElement('audio');
      this.audioEl.classList.add('audio');
      this.form.appendChild(this.audioEl);

      this.recordingAudioBtn.classList.add('hidden');
      this.recordingVidoeBtn.classList.add('hidden');

      const stream = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.addEventListener('start', () => {
        console.log('recording startded');
      });

      recorder.addEventListener('dataavailable', (evt) => {
        chunks.push(evt.data);
      });

      recorder.addEventListener('stop', () => {
        const blob = new Blob(chunks);
        this.audioEl.src = URL.createObjectURL(blob);
      });

      recorder.start();
    });
  }
}
