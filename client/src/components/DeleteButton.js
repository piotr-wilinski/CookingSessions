import React, { useState } from 'react';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { FETCH_SESSIONS_QUERY } from '../util/graphql'
import { Link } from 'react-router-dom';

const DeleteButton = ({ sessionId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const mutation = DELETE_SESSION_MUTATION

  const [deleteMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false)

      const data = proxy.readQuery({
        query: FETCH_SESSIONS_QUERY
      })
      proxy.writeQuery({
        query: FETCH_SESSIONS_QUERY,
        data: { getSessions: data.getSessions.filter(s => s.id !== sessionId) }
      })

      if (callback) callback()
    },
    variables: {
      sessionId
    }
  })

  return (
    <>
      <Button as="div"
        floated="right"
        color="red"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name='trash' style={{ margin: 0 }} />
      </Button>
      <Confirm
        as={Link}
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteMutation}
        to="/"
      />
    </>
  );
}

const DELETE_SESSION_MUTATION = gql`
  mutation deleteSession($sessionId: ID!) {
    deleteSession(sessionId: $sessionId)
  }
`

export default DeleteButton;