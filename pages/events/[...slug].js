import { useRouter } from "next/router"
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import { getFilteredEvents } from '../../dummy-data'
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const FilterEventsPage = () => {
    const router = useRouter()

    const filterData = router.query.slug;
    if (!filterData) {
        return <p className="center">Loading..................</p>
    }

    const filteredYear = filterData[0]
    const filteredMonth = filterData[1]

    const numYear = +filteredYear
    const numMonth = +filteredMonth

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear < 1 ||
        numMonth < 1 ||
        numMonth > 12) {
        return <p>Invalid filter, please adjust your value</p>
    }

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth
    })

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No events found for the chosen filter</p>
                </ErrorAlert>

                <div className='center'>
                    <Button link='/events'> Show all events</Button>
                </div>
            </Fragment>
        )
    }

    const date = new Date(numYear, numMonth - 1)
    return (
        <Fragment>
            <ResultsTitle date={date}></ResultsTitle>
            <EventList items={filteredEvents}></EventList>
        </Fragment>
    )
}

export default FilterEventsPage