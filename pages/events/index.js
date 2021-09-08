import { Fragment } from 'react'
import router from 'next/router'
import Head from 'next/head'
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
            <Head>
                <title>NextJS Events</title>
                <meta
                    name="description"
                    conent="Find a lot of grea events that allow u to evolve..." />
            </Head>
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