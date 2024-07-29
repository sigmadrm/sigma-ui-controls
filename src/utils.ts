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
export function hexToRgba(hex, alpha) {
  // Loại bỏ ký tự # nếu có
  hex = hex.replace(/^#/, '');

  // Chuyển đổi giá trị HEX thành RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Trả về màu RGBA
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
