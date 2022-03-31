import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import { API_URL, PER_PAGE } from '@/config/index'; // must say index explicitly

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.data.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <Pagination page={page} total={total} />
    </Layout>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = Number(page) === 1 ? 0 : (Number(page) - 1) * PER_PAGE

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}api/events`)
  const totalJson = await totalRes.json()
  const total = totalJson.meta.pagination.total

  // Fetch events
  const eventRes = await fetch(
    `${API_URL}api/events?populate=*&sort=date:ASC&pagination[start]=${start}&pagination[limit]=${PER_PAGE}`
  )
  const events = await eventRes.json()

  return {
    props: { events, page: Number(page), total },
  }
}
