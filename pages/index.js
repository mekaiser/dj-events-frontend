import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index'; // must say index explicitly
import Link from 'next/link';

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.data.map((evt) => (
        <EventItem key={evt.id} evt={evt}/>
      ))}
      {events.data.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View All Events</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}api/events?populate=*&sort=date:ASC&pagination[start]=0&pagination[limit]=2`)

  const events = await res.json()

  return {
    props: { events },
    revalidate: 1, // revalidate every 1 sec if data has changed
  }
}
