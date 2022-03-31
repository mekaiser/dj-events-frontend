import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function EventPage({ evt }) {
  const router = useRouter()
  // const deleteEvent = async (e) => {
  //   if (confirm('Are you sure ?')) {
  //     const res = await fetch(`${API_URL}api/events/${evt.id}`, {
  //       method: 'DELETE',
  //     })

  //     const data = await res.json()

  //     if (!res.ok) {
  //       toast.error(data.message)
  //     } else {
  //       router.push('/events')
  //     }
  //   }
  // }
  return (
    <Layout>
      <div className={styles.event}>
        {/* <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div> */}
        
        <span>
          {new Date(evt.attributes.date).toLocaleDateString('en-US')} at{' '}
          {evt.attributes.time}
        </span>
        <h1>{evt.attributes.name}</h1>
        <ToastContainer />
        {evt.attributes && (
          <>
            <div className={styles.image}>
              {evt.attributes.image.data && (
                <Image
                  src={evt.attributes.image.data.attributes.formats.medium.url}
                  width={960}
                  height={600}
                  alt={evt.attributes.name}
                />
              )}
            </div>

            <h3>Performers:</h3>
            <p>{evt.attributes.performers}</p>
            <h3>Description:</h3>
            <p>{evt.attributes.description}</p>
            <h3>Venue: {evt.attributes.venue}</h3>
            <p>{evt.attributes.address}</p>

            <Link href='/events'>
              <a className={styles.back}>{'<'} Go Back</a>
            </Link>
          </>
        )}
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}api/events`)
  const events = await res.json()

  const paths = events.data.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }))
  return {
    // ** Return format here **
    // {
    //   paths: [
    //     {params: {slug: 1}},
    //     {params: {slug: 2}},
    //     {params: {slug: 3}},
    //   ]
    // }
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(
    `${API_URL}api/events?populate=*&filters[slug][$eq]=${slug}`
  )
  const events = await res.json()
  return {
    props: {
      evt: events.data[0],
      // evt: `${API_URL}api/events?filters[slug][$eq]=${slug}`,
    },
    revalidate: 1,
  }
}

// ** Alternative **
// export async function getServerSideProps({query: {slug}}) {
//   const res = await fetch(`${API_URL}api/events/${slug}`)
//   const events = await res.json()
//   return {
//     props: {
//       evt: events[0]
//     }

//   }
// }
