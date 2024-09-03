'use client';

import React, { useEffect, useState } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { AnalyticsContext } from '../AnalyticsProvider';
import { fetchFriendsDetails } from '../../app/lib/actions';
import styles from './FriendsList.module.css';
import './styles.css';

function FriendsList() {
  const { user } = React.useContext(AnalyticsContext);
  const [friendsDetails, setFriendsDetails] = useState([]);
  console.log(user);
  useEffect(() => {
    async function loadFriendsDetails() {
      if (user.friends && user.friends.length > 0) {
        const details = await fetchFriendsDetails(user.friends);
        setFriendsDetails(details);
      }
    }

    loadFriendsDetails();
  }, [user.friends]);

  return (
    <ScrollArea.Root className='ScrollAreaRootFriends'>
      <ScrollArea.Viewport className='ScrollAreaViewportFriends'>
        <ul className={styles.friendsList}>
          {friendsDetails.map((friend, index) => (
            <li key={index} className={styles.friendItem}>
              <p className={styles.friendEmail}>{friend.email}</p>
              <p className={styles.friendCompleted}>
                Completed Today:{' '}
                {Object.values(friend.completed_today).reduce(
                  (a, b) => a + b,
                  0
                )}
              </p>
            </li>
          ))}
        </ul>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className='ScrollAreaScrollbarFriends'
        orientation='vertical'
      >
        <ScrollArea.Thumb className='ScrollAreaThumbFriends' />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className='ScrollAreaScrollbarFriends'
        orientation='horizontal'
      >
        <ScrollArea.Thumb className='ScrollAreaThumbFriends' />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className='ScrollAreaCornerFriends' />
    </ScrollArea.Root>
  );
}

export default FriendsList;
