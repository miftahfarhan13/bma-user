export const playSound = (id: string) => {
  const audio = document.getElementById(id) as HTMLAudioElement | null;
  if (audio) {
    // Check if the audio is already playing
    if (!audio.paused) {
      return; // Don't trigger play if audio is already playing
    }

    audio.currentTime = 0; // Rewind to the start
    audio.play().catch((err) => {
      console.error(`Failed to play audio [${id}]:`, err);
    });
  }
};

export const stopSound = (id: string) => {
  const audio = document.getElementById(id) as HTMLAudioElement | null;
  if (audio && !audio.paused) {
    audio.pause();
    audio.currentTime = 0; // Optional: rewind to start after stopping
  }
};
