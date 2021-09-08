import { Fragment } from 'react'
import router from 'next/router'
import EventItem from '../../components/events/event-item'
import { getAllEvents } from '../../helpers/api-utils'
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'

const AllEventPage = (props) => {
    const events = props.events

    const findEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath)

    }

    return (
        <Fragment>
            <EventsSearch onSearch={findEventsHandler}></EventsSearch>
            <EventList items={events}></EventList>
        </Fragment>
    )
}

export async function getStaticProps() {
    const events = await getAllEvents()
    return {
        props: {
            events: events
        }
    }
}

export default AllEventPage