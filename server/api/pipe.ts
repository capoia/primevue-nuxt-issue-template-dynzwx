export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log('body', body);
  return {
    meta: {
      total: 8,
    },
    name: 'Pipe 1',
    stages: [
      { name: 'Stage 1' },
      { name: 'Stage 2' },
      { name: 'Stage 3' },
      { name: 'Stage 4' },
      { name: 'Stage 5' },
      { name: 'Stage 6' },
      { name: 'Stage 7' },
      { name: 'Stage 8' },
    ],
  };
});
