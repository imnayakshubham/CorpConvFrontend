import { useLayoutEffect, useState } from "react"
import { Router } from "react-router-dom"

export function HistoryRouter({
    basename = '',
    children,
    history }) {
    let [state, setState] = useState({
        action: history.action,
        location: history.location,
    })

    useLayoutEffect(() => history.listen(() => {
        setState({
            action: history.action,
            location: history.location,
        })
    }), [history]);

    return (
        <Router
            basename={basename}
            location={state.location}
            navigationType={state.action}
            navigator={history}
        >
            {children}
        </Router>
    )
}
