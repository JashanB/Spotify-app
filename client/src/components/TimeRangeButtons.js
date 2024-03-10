import { StyledRangeButtons } from '../styles';

export default function TimeRangeButtons (props) {

    function changeActiveRange(range) {
        props.setActiveState(state => range);
        props.setActiveRange(state => props.artistsObj[range])
    }

    return (
        <StyledRangeButtons>
            <li>
                <button className={props.activestate === 'short_term' ? 'active' : ''} onClick={() => changeActiveRange('short_term')} >This Month</button>
            </li>
            <li>
                <button className={props.activestate === 'medium_term' ? 'active' : ''} onClick={() => changeActiveRange('medium_term')} >Last 6 Months</button>
            </li>
            <li>
                <button className={props.activestate === 'long_term' ? 'active' : ''} onClick={() => changeActiveRange('long_term')} >All Time</button>
            </li>
        </StyledRangeButtons>
    )
}