export const playSound = (id: string) => {
  const audio = document.getElementById(id) as HTMLAudioElement | null;
  if (audio) {
    audio.currentTime = 0; // optional: rewind to start
    audio.play().catch((err) => {
      console.error(`Failed to play audio [${id}]:`, err);
    });
  }
};
