import styles from '@/styles/EventItem.module.css'
import Image from 'next/image'
import Link from 'next/link'

const EventItem = ({ evt }) => {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={evt.attributes.image.data ? evt.attributes.image.data.attributes.formats.thumbnail.url : '/images/event-default.png'}
          width={170}
          height={100}
          alt=''
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(evt.attributes.date).toLocaleDateString('en-US')} at {evt.attributes.time}
        </span>
        <h3>{evt.attributes.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${evt.attributes.slug}`}>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  )
}

export default EventItem
