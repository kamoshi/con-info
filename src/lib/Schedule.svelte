<script lang="ts">
  import type {Dayjs} from "dayjs";
  import {eventsSorted} from "../utils";

  export let schedule: ScheduleEvent[];
  export let time: Dayjs;

  $: sorted = eventsSorted(schedule || []);
  $: prev = sorted.map((event: ScheduleEvent) => time.isAfter(event.timeEnd)).lastIndexOf(true);
  $: next = sorted.findIndex((event: ScheduleEvent) => time.isBefore(event.timeStart));
  $: curr = sorted.findIndex((event: ScheduleEvent) => time.isAfter(event.timeStart) && time.isBefore(event.timeEnd));

  $: eventPrev = sorted?.[prev];
  $: eventCurr = sorted?.[curr];
  $: eventNext = sorted?.[next];
</script>


<section class="schedule nice-box">
  <h3 class="heading">Harmonogram</h3>
  <div class="events">
    <span class="name">{eventPrev?.name || '---'}</span>
    <span class="right">{eventPrev?.timeStart.format('HH:mm') || ''}</span>
    <span class="right">{eventPrev?.timeEnd.format('HH:mm') || ''}</span>
    <!--  -->
    <span class="now name">{eventCurr?.name || 'Przerwa'}</span>
    <span class="now right">{eventCurr?.timeStart.format('HH:mm') || ''}</span>
    <span class="now right">{eventCurr?.timeEnd.format('HH:mm') || ''}</span>
    <!--  -->
    <span class="name">{eventNext?.name || '---'}</span>
    <span class="right">{eventNext?.timeStart.format('HH:mm') || ''}</span>
    <span class="right">{eventNext?.timeEnd.format('HH:mm') || ''}</span>
  </div>
</section>


<style lang="scss">
  .schedule {
    padding: 1em;
    background: white;

    .heading {
      font-size: 2em;
      margin: 0 0 0.5em 0;
    }
    .events {
      display: grid;
      grid-template-columns: 1fr 3em 3em;
      column-gap: 0.25em;
      font-size: 1.2em;

      .now {
        font-weight: bold;
      }
      .name {
        min-width: 16em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .right {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
