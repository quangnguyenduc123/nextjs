import { useState } from 'react'
import { buildFeedbackPath, extractFeedback } from '../api/feedback'

function FeedbackPage(props) {

    const [feedbackData, setFeedbackData] = useState()

    const feedbackDetail = (id) => {
        fetch(`/api/${id}`)
            .then((response) => response.json())
            .then((data) => setFeedbackData(data.feedback))
    }

    const feedbacks = props.feedbackItems.map((item) =>
        <li key={item.id}>
            <button onClick={feedbackDetail.bind(null, item.id)}> Show Detail</button>
            {item.text}
        </li>
    )

    return <ul>
        {feedbacks}
        {feedbackData && feedbackData.text}
    </ul>
}

export async function getStaticProps() {
    const filePath = buildFeedbackPath()
    const data = extractFeedback(filePath)

    return {
        props: {
            feedbackItems: data
        }
    }
}

export default FeedbackPage