<script lang="ts">
  import type {Dayjs} from "dayjs";
  import {findProgress} from "../utils";

  export let current: ScheduleEvent;
  export let time: Dayjs;

  $: percent = findProgress(current?.timeStart, current?.timeEnd, time) * 100;
</script>

<section class="timer">
  {#if current}
    <div class="times">
      <span>Start: {current.timeStart.format('HH:mm')}</span>
      <span>Koniec: {current.timeEnd.format('HH:mm')}</span>
      <span>Aktualny czas: {time.format('HH:mm:ss')}</span>
    </div>
    <div class="progress">
      <div class="percent">{`${percent.toFixed(2)}%`}</div>
      <div class="bar" style="width:{Math.floor(percent)}%"></div>
    </div>
  {:else}
    <div class="times">
      <span>Aktualny czas: {time.format('HH:mm:ss')}</span>
    </div>
    <div class="progress">
      <div class="percent">Przerwa</div>
    </div>
  {/if}
</section>

<style lang="scss">
  .timer {
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr;
    font-size: 2rem;
    z-index: 0;

    .times {
      display: flex;
      align-items: center;
      justify-content: center;
      grid-gap: 1em;
    }
    .progress {
      position: relative;
    }
    .percent {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      z-index: 3213;
    }
    .bar {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: lightgray;
      z-index: -1;
    }
  }
</style>
