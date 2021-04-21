import React, { useContext } from 'react';
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import moment from 'moment'

import SignUpButton from '../components/SignUpButton'
import DeleteButton from '../components/DeleteButton'

import { AuthContext } from '../context/auth'

import '../style/pages/SingleCookingSession.scss'

const SingleCookingSession = (props) => {
  const sessionId = props.match.params.sessionId;
  const { user } = useContext(AuthContext)

  const { data: { getSession } = {} } = useQuery(FETCH_SESSION_QUERY, {
    variables: {
      sessionId
    }
  })

  const deletePostCallback = () => {
    props.history.push('/')
  }

  let sessionMarkup;
  if (!getSession) {
    sessionMarkup = <h2>Loading Cooking Session...</h2>
  } else {
    const { id, title, imageUrl, body, username, name, surname, createdAt, timeOfStart, capacity, url, ingredients, tools, signedUp, signedCount, exp, other, category } = getSession

    sessionMarkup = (
      <div className="single-session">
        <h2 className="single-session__title">{title}</h2>
        <hr />
        <div className="single-session__main">
          <figure className="single-session__main--left">
            <img src={imageUrl} alt={title} className="single-session__image" />
          </figure>
          <div className="single-session__main--right">
            <h3 className="single-session__headline">Information about the cooking session:</h3>
            <p className="single-session__row">Hosted by: <span className="single-session__row--strong">{name} {surname}</span></p>
            <p className="single-session__row">starting in <span className="single-session__row--strong">{moment(timeOfStart).fromNow(true)}</span></p>
            <p className="single-session__row">Seats left: <span className="single-session__row--strong">{Number(capacity) - signedCount}</span> ({signedCount} taken)</p>
            <SignUpButton
              className="single-session__button"
              user={user}
              disabled={(Number(capacity) - signedCount <= 0) ? true : false}
              session={{ id, signedUp, signedCount }}
            />
          </div>
        </div>
        <hr />
        <div className="single-session__additional">
          <div className="single-session__detailed">
            <h3 className="single-session__headline">Detailed information:</h3>
            <div className="single-session__row">
              <h4 className="single-session__subheadline">Ingredients needed:</h4>
              <ul>
                {ingredients.map(ingredient => <li>{ingredient}</li>)}
              </ul>
            </div>
            <div className="single-session__row">
              <h4 className="single-session__subheadline">Tools needed:</h4>
              <ul>
                {tools.map(tool => <li>{tool}</li>)}
              </ul>
            </div>
            <div className="single-session__row">
              <h4 className="single-session__subheadline">Experience needed</h4>
              <p>{exp}</p>
            </div>
            <div className="single-session__row">
              <h4 className="single-session__subheadline">Other information:</h4>
              <p>{other}</p>
            </div>
          </div>
        </div>
        {user && user.username === username && <DeleteButton sessionId={id} />}
      </div>
    )
  }

  return (sessionMarkup);
}

const FETCH_SESSION_QUERY = gql`
  query($sessionId: ID!) {
  getSession(sessionId: $sessionId) {
    id
    title
    imageUrl
    body
    username
    name
    surname
    createdAt
    timeOfStart
    capacity
    url
    ingredients
    tools
    signedUp {
      username
      name
      surname
    }
    signedCount
    exp
    other
    category
    isActive
    isPremium
  }
}
`

export default SingleCookingSession;