import moment from "moment";


const REGEX = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;

export function extractIds(urls: string[]): string[] {
  return urls.map(url => url.match(REGEX)[1]);
}

export function prepareSchedule(data: any[]): ScheduleEvent[] {
  return data.map(item => ({
    name: item.name,
    image: item.image,
    timeStart: moment(item.timeStart),
    timeEnd: moment(item.timeEnd),
  }));
}

export function findProgress(s: moment.Moment, e: moment.Moment, c: moment.Moment): number {
  if (!s || !e || !c) return 0;
  const span = moment.duration(e.diff(s)).asSeconds();
  const curr = moment.duration(c.diff(s)).asSeconds();
  return curr / span;
}

export function eventsSorted(events: ScheduleEvent[]): ScheduleEvent[] {
  const copy = (!!events) ? [...events] : [];
  copy.sort((a, b) => a.timeStart.valueOf() - b.timeStart.valueOf());
  return copy;
}
