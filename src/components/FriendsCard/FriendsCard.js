'use client'
import React, { useState } from 'react';
import styles from './FriendsCard.module.css';
import { AnalyticsContext } from '../AnalyticsProvider';
import { sendFriendRequest } from '../../../src/app/lib/actions';
import { ToastContext } from '../ToastProvider';
import EmailForm from '../EmailForm';
import FriendsList from '../FriendsList';
import AcceptFriendsForm from '../AcceptFriendsForm';

function FriendsCard() {
  const { createToast } = React.useContext(ToastContext);
  const { user } = React.useContext(AnalyticsContext);
  const [friendEmail, setFriendEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('user_uuid', user.uuid);
      formData.append('friend_email', friendEmail);

      const response = await sendFriendRequest(formData);

      createToast(response.message, response.type || 'success');
    } catch (error) {
      console.error('Error sending friend request:', error);
      createToast('Error sending friend request', 'error');
    }
  };
  return (
    <div className={styles.friendsContainer}>
      <h2 className={styles.sectionTitle}>Friends</h2>
      <div className={styles.friendsRow}>
        <EmailForm
          email={friendEmail}
          setEmail={setFriendEmail}
          handleSubmit={handleSubmit}
        />
        <FriendsList />
        {/* <AcceptFriendsForm /> */}
      </div>
    </div>
  );
}

export default FriendsCard;
