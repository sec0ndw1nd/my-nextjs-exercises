import { useContext } from 'react';
import Notification from '../ui/Notification';
import MainHeader from './MainHeader';
import NotificationContext from '@/store/notification-context';

export default function Layout({ children }) {
  const { notification, hideNotification, showNotification } =
    useContext(NotificationContext);

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </>
  );
}
