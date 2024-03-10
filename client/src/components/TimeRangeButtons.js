export default function TimeRangeButtons (activestate, changeActiveRange) {
    return (
        <ul>
            <li>
                <button className={activestate === 'short_term' ? 'active' : ''} onClick={() => changeActiveRange('short_term')} >This Month</button>
            </li>
            <li>
                <button className={activestate === 'medium_term' ? 'active' : ''} onClick={() => changeActiveRange('medium_term')} >Last 6 Months</button>
            </li>
            <li>
                <button className={activestate === 'long_term' ? 'active' : ''} onClick={() => changeActiveRange('long_term')} >All Time</button>
            </li>
        </ul>
    )
}