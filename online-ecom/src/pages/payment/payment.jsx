import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PaymentSuccess from '../../components/paymentSuccess/paymentSuccess';

export default function Payment() {
  const navigate = useNavigate();
  const { amount } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/Home');
    }, 5000);

    // Clean up the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <PaymentSuccess amount={amount} />
    </div>
  );
}
