import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export function formatTimeAgo(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
    locale: ko,
  });
}

export function formatDuration(isoDuration: string): string {
  // 정규식으로 시간, 분, 초 추출
  const hourMatch = isoDuration.match(/(\d+)H/);
  const minuteMatch = isoDuration.match(/(\d+)M/);
  const secondMatch = isoDuration.match(/(\d+)S/);

  // 추출한 값을 숫자로 변환, 없으면 0
  const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
  const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;
  const seconds = secondMatch ? parseInt(secondMatch[1]) : 0;

  // 앞자리 0 제거 (1자리 숫자로 표현)
  const formattedHours = hours.toString();
  const formattedMinutes = minutes.toString();
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

  // 시간이 0일 경우
  if (hours === 0) {
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
