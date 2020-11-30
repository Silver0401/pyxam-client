import React, { useState, useMemo } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'

import { Attempt } from 'types/BaseTypes'

import { ChakraProvider } from '@chakra-ui/react'

import AdminPage from 'components/AdminPage'
import LoginPage from 'components/LoginPage'
import PlaygroundPage from 'components/PlaygroundPage'
import TestPage from 'components/TestPage'

import styles from './App.module.scss'

const emptyAttempt: Attempt = {
    username: '',
    a1: '',
    a2: '',
    a3: '',
    a4: '',
    a5: '',
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

    return (
        <ChakraProvider>
            <div className={styles.App}>
                <Router>
                    <Switch>
                        <Route path="/login">
                            <LoginPage
                                attempt={attempt}
                                setAttempt={setAttempt}
                            />
                        </Route>
                        <React.Fragment>
                            <Route path="/admin">
                                <AdminPage />
                            </Route>
                            <Route path="/playground">
                                <PlaygroundPage />
                            </Route>
                            <Route path="/test">
                                <TestPage
                                    attempt={attempt}
                                    setAttempt={setAttempt}
                                />
                            </Route>
                        </React.Fragment>
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
