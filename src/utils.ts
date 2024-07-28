export function formatTime(seconds: number): string {
  if (seconds >= 3600) {
    // Format as HH:mm:ss
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const hoursFormatted = hours.toString().padStart(2, '0');
    const minutesFormatted = minutes.toString().padStart(2, '0');
    const secondsFormatted = secs.toString().padStart(2, '0');

    return `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`;
  } else {
    // Format as mm:ss
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    const minutesFormatted = minutes.toString().padStart(2, '0');
    const secondsFormatted = secs.toString().padStart(2, '0');

    return `${minutesFormatted}:${secondsFormatted}`;
  }
}
