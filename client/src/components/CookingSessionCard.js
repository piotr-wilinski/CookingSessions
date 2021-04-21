import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'

import '../style/components/CookingSessionCard.scss'

import { Button, Card, Icon, Image, Label } from 'semantic-ui-react'

import SignUpButton from './SignUpButton'
// import DeleteButton from './DeleteButton'
import { AuthContext } from '../context/auth'

const CookingSessionCard = ({
  session: { title, imageUrl, body, id, username, name, surname, createdAt, timeOfStart, capacity, signedCount, signedUp }
}) => {
  const { user } = useContext(AuthContext)

  return (
    <div className="card">
      <span className="card__time">{moment(createdAt).fromNow(true)} ago</span>
      <img src={imageUrl} alt={title} className="card__thumbnail" />
      <h2 className="card__title">{title}</h2>
      <hr className="card__line" />
      <p className="card__body">{body}</p>
      <p className="card__row">Hosted by: <span className="card__row--strong">{name} {surname}</span></p>
      <p className="card__row">Starting in: <span className="card__row--strong">{moment(timeOfStart).fromNow(true)}</span></p>
      <p className="card__row">Seats left: <span className="card__row--strong">{Number(capacity) - signedCount}</span></p>
      <div className="card__row card__row--buttons">
        <Link className="card__button" to={`/session/${id}`}>See more</Link>
      </div>
    </div>
  );
}

export default CookingSessionCard;