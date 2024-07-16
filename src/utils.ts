import dayjs from "dayjs";


const REGEX = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;

export function extractIds(urls: string[]): string[] {
  return urls.map(url => url.match(REGEX)[1]);
}

export function prepareSchedule(data: any[]): ScheduleEvent[] {
  return data.map(item => ({
    name: item.name,
    imageUrl: item.imageUrl,
    titleUrl: item.titleUrl,
    timeStart: dayjs(item.timeStart),
    timeEnd: dayjs(item.timeEnd),
  }));
}
