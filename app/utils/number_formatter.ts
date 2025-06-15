export function formatNumberToCompact(num: number): string {
  if (num === 0) return "0";
  
  const units = ["", "K", "M", "B", "T"];
  const unitIndex = Math.floor(Math.log10(Math.abs(num)) / 3);

  if (unitIndex === 0) return num.toString();

  const divisor = Math.pow(1000, unitIndex);
  const value = num / divisor;

  // 소수점 한 자리까지만 표시 (1.5K), 소수점이 0이면 정수로 표시 (2K)
  return value.toFixed(1).replace(/\.0$/, "") + units[unitIndex];
}
