<script lang="ts">
  import {eventsSorted} from "../utils";
  import type {Dayjs} from "dayjs";

  export let schedule: ScheduleEvent[];
  export let time: Dayjs;

  $: sorted = eventsSorted(schedule || []);
  $: index = sorted.findIndex((event: ScheduleEvent) => time.isAfter(event.timeStart) && time.isBefore(event.timeEnd));

  $: eventPrev = sorted?.[index - 1];
  $: eventCurr = sorted?.[index];
  $: eventNext = sorted?.[index + 1];
</script>

{#if index >= 0}
  <section class="schedule">
    <h3 class="heading">Harmonogram</h3>
    <ul class="list">
      <li class="list-item">
        <span>{eventPrev?.name || '-'}</span>
        <span>{eventPrev?.timeStart.format('HH:mm') || ''}</span>
        <span>{eventPrev?.timeEnd.format('HH:mm') || ''}</span>
      </li>
      <li class="list-item curr">
        <span>{eventCurr?.name || '-'}</span>
        <span>{eventCurr?.timeStart.format('HH:mm') || ''}</span>
        <span>{eventCurr?.timeEnd.format('HH:mm') || ''}</span>
      </li>
      <li class="list-item">
        <span>{eventNext?.name || '-'}</span>
        <span>{eventNext?.timeStart.format('HH:mm') || ''}</span>
        <span>{eventNext?.timeEnd.format('HH:mm') || ''}</span>
    </ul>
  </section>
{/if}

<style lang="scss">
  .schedule {
    padding: 1em;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  }
  .heading {
    font-size: 2em;
    margin: 0;
  }
  .list {
    margin: 0.5em 0 0 0;
    padding: 0;
    list-style: none;
    font-size: 1.3rem;
  }
  .list-item {
    display: grid;
    grid-template-columns: auto 4em 4em;
  }
  .curr {
    font-weight: bold;
  }
</style>
