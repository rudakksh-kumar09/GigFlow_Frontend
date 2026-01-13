import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import socket from '../services/socket';

const NotificationHandler = () => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) return;

    socket.connect();

    socket.emit('join', user._id);

    socket.on('hired', (data) => {
      toast.success(`🎉 You have been hired for "${data.gigTitle}"!`, {
        duration: 5000,
      });
    });

    return () => {
      socket.off('hired');
      socket.disconnect();
    };
  }, [user]);

  return null;
};

export default NotificationHandler;
