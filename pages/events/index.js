import { Fragment } from 'react'
import router from 'next/router'
import EventItem from '../../components/events/event-item'
import { getAllEvents } from '../../dummy-data'
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'

const AllEventPage = () => {
    const events = getAllEvents()

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

export default AllEventPage