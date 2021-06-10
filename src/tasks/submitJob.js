// The default job options don't work very well during unit tests. Jobs don't
// complete in time. We will use these default job options only if we are not in
// a test environment.
const jobDefaultOptions = {
  timeout: 1000 * 60 * 40,
  attempts: 100,
  removeOnComplete: true,
  backoff: { type: "fixed", delay: 1000 * 10 },
};

export default function submitJob(queue, id, data = {}, jobOptions = {}) {
  return queue.getJob(id).then((job) => {
    if (job) {
      console.log(`Job "${queue.name}" with id "${id}" is already running`);
      return;
    }

    console.log(`Adding job "${queue.name}" with id "${id}"`);

    return queue.add(
      { id, ...data },
      { jobId: id, ...jobDefaultOptions, ...jobOptions }
    );
  });
}
