'use client';
import React, { useEffect, useState } from 'react';
import styles from './AcceptFriendsForm.module.css';
import {
  acceptFriendRequest,
  rejectFriendRequest,
  fetchFriendsDetails,
} from '../../app/lib/actions';
import { AnalyticsContext } from '../AnalyticsProvider';
import { ToastContext } from '../ToastProvider';

function AcceptFriendsForm() {
  const { createToast } = React.useContext(ToastContext);
  const { user } = React.useContext(AnalyticsContext);

  const [friendDetails, setFriendDetails] = useState([]);

  useEffect(() => {
    async function loadFriendDetails() {
      if (user.incoming_friend_requests.length > 0) {
        try {
          const details = await fetchFriendsDetails(
            user.incoming_friend_requests
          );
          setFriendDetails(details);
        } catch (error) {
          console.error('Failed to load friend details:', error);
          createToast('Failed to load friend details', 'error');
        }
      }
    }

    loadFriendDetails();
  }, [user.incoming_friend_requests]);

  const handleAccept = async (friendUuid) => {
    try {
      const formData = new FormData();
      formData.append('user_uuid', user.uuid);
      formData.append('friend_uuid', friendUuid);
      await acceptFriendRequest(formData);

      setFriendDetails(
        friendDetails.filter((friend) => friend.uuid !== friendUuid)
      );
      createToast('Friend request accepted!', 'success');
    } catch (error) {
      console.error('Failed to accept friend request:', error);
      createToast('There was a problem accepting the friend request.', 'error');
    }
  };

  const handleReject = async (friendUuid) => {
    try {
      const formData = new FormData();
      formData.append('user_uuid', user.uuid);
      formData.append('friend_uuid', friendUuid);
      await rejectFriendRequest(formData);

      setFriendDetails(
        friendDetails.filter((friend) => friend.uuid !== friendUuid)
      );
      createToast('Friend request rejected!', 'success');
    } catch (error) {
      console.error('Failed to reject friend request:', error);
      createToast('Failed to reject friend request', 'error');
    }
  };

  return (
    <div className={styles.friendsRequestContainer}>
      <h2 className={styles.sectionTitle}>Incoming Friend Requests</h2>
      {friendDetails.length === 0 ? (
        <p>No incoming friend requests.</p>
      ) : (
        <ul className={styles.requestList}>
          {friendDetails.map((friend) => (
            <li key={friend.uuid} className={styles.requestItem}>
              <div className={styles.friendInfo}>
                <p>{friend.email}</p>
                <div className={styles.buttonGroup}>
                  <button
                    onClick={() => handleAccept(friend.uuid)}
                    className={styles.acceptButton}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(friend.uuid)}
                    className={styles.rejectButton}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AcceptFriendsForm;
