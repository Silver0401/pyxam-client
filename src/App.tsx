import React, { useState, useMemo, useCallback } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'

import debounce from 'lodash/debounce'

import { Attempt } from 'types/BaseTypes'

import { ChakraProvider } from '@chakra-ui/react'

import AdminPage from 'components/AdminPage'
import LoginPage from 'components/LoginPage'
import PlaygroundPage from 'components/PlaygroundPage'
import TestPage from 'components/TestPage'
import ThankyouPage from 'components/ThankyouPage'

import styles from './App.module.scss'

import { getRandomQuestions } from 'util/questions'

const emptyAttempt: Attempt = {
    username: '',
    ...getRandomQuestions(),
}

function App() {
    let attemptFromSession = useMemo(() => {
        let attemptStr = localStorage.getItem('attempt')
        if (!attemptStr) return null
        return JSON.parse(attemptStr) as Attempt
    }, [])

    let [attempt, setAttempt] = useState<Attempt>(
        attemptFromSession || emptyAttempt
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
    let debouncedPersistAttempt = useCallback(
        debounce((attempt: Attempt) => {
            let attemptStr = JSON.stringify(attempt)
            localStorage.setItem('attempt', attemptStr)
        }, 500),
        []
    )

    function onSetAttempt(attempt: Attempt) {
        debouncedPersistAttempt(attempt)
        setAttempt(attempt)
    }

    return (
        <ChakraProvider>
            <div className={styles.App}>
                <Router>
                    <Switch>
                        <Route path="/login">
                            <LoginPage
                                attempt={attempt}
                                setAttempt={onSetAttempt}
                            />
                        </Route>
                        <Route path="/admin">
                            <AdminPage />
                        </Route>
                        <Route path="/playground">
                            <PlaygroundPage />
                        </Route>
                        <Route path="/test">
                            <TestPage
                                attempt={attempt}
                                setAttempt={onSetAttempt}
                            />
                        </Route>
                        <Route path="/thankyou">
                            <ThankyouPage />
                        </Route>
                        <Route>
                            <Redirect to="/login" />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </ChakraProvider>
    )
}

export default App
