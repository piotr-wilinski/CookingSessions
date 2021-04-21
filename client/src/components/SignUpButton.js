import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Button, Icon, Label } from 'semantic-ui-react'

const SignUpButton = ({ user, session: { id, signedUp, signedCount }, disabled, className }) => {
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    if (user && signedUp.find(signUp => signUp.username === user.username)) {
      setJoined(true)
    } else {
      setJoined(false)
    }
  }, [user, signedUp])

  const [joinSession] = useMutation(JOIN_SESSION_MUTATION, {
    variables: { sessionId: id }
  })

  const signUpButton = user ? (
    joined ? (
      // <button onClick={joinSession} disabled={disabled} className="card__button card__button--joined">
      //   Join Cooking Session
      // </button>
      <p className="single-session__joined">
        You've joined this Cooking Session<br/>
        If you want to leave it, <span 
          onClick={joinSession}
          className="single-session__click-here"
        >click here</span>
      </p>
    ) : (
        <button onClick={joinSession} disabled={disabled} className={className}>
          Join Cooking Session
        </button>
      )
  ) : (
      <Link onClick={joinSession} className={className} to="/login">
        Join Cooking Session
      </Link>
    )

  return (
    signUpButton
  );
}

const JOIN_SESSION_MUTATION = gql`
  mutation joinSession($sessionId: ID!) {
    joinSession(sessionId: $sessionId) {
      id
      signedUp {
        id
        username
        name
        surname
      }
      signedCount
    }
  }
`

export default SignUpButton;