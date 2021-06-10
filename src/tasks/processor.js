export default function processor(queue) {
  if (process.env.WORKER) {
    queue.on("error", (error) => {
      console.log(`ERROR "${queue.name}" job: ${error}`);

      // eslint-disable-next-line
      console.error(error);
    });

    queue.on("active", (job) => {
      console.log(`[${job.id}] ACTIVE "${queue.name}" job started`);
    });

    queue.on("progress", (job, progress) => {
      console.log(`[${job.id}]" PROGRESS ${queue.name}" job: ${progress}`);
    });

    queue.on("completed", (job) => {
      console.log(`[${job.id}] COMPLETE "${queue.name}" job`);
    });

    queue.on("failed", (job, error) => {
      console.log(`[${job.id}] FAILED "${queue.name}": ${error}`);

      // eslint-disable-next-line
      console.error(error);
    });

    queue.on("stalled", (job) => {
      console.log(`[${job.id}] STALLED "${queue.name}"`);
    });

    queue.on("cleaned", (jobs, type) => {
      console.log(`"${queue.name}" cleaned ${type} ${jobs.length}`);
    });

    queue.on("paused", () => {
      console.log(`"${queue.name}" queue paused`);
    });

    queue.on("resumed", () => {
      console.log(`"${queue.name}" queue resumed`);
    });

    return queue;
  }
  return { process: () => {} };
}
