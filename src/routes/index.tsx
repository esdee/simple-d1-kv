import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import getDb from '../db';

export const useGetTime = routeLoader$(async (context) => {
  const db = await getDb(context);
  const row = (await db
    .prepare('select date() as date, time() as time;')
    .first()) as {
    date: string;
    time: string;
  };

  return {
    success: true,
    time: new Date().getTime(),
    env: import.meta.env.VITE_DEV,
    dateTime: `${row.date} ${row.time}`,
  };
});

export default component$(() => {
  const time = useGetTime();

  return (
    <>
      <h1>Hello World</h1>
      <h2>Value: {time.value.time}</h2>
      <h2>Value: {time.value.env}</h2>
      <h2>Value: {time.value.dateTime}</h2>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
