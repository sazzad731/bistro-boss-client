import React from 'react';
import SectionHeader from '../../../Componets/SectionHeader/SectionHeader';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistroy = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: paymentHistory = [] } = useQuery({
    queryKey: [ "paymentHistory", user.email ],
    queryFn: async()=>{
      const res = await axiosSecure.get(`/paymentHistory/${user.email}`);
      return res.data;
    }
  })
  return (
    <div className="py-12 bg-base-200 min-h-screen">
      <SectionHeader heading="PAYMENT HISTORY" subHeading="At a Glance!" />
      <div className="w-[992px] bg-white mx-auto p-12">
        <h2 className="text-3xl font-bold uppercase mb-4">
          Total Payments: {paymentHistory.length}
        </h2>
        <div className="overflow-x-auto rounded-t-xl">
          <table className="table">
            {/* head */}
            <thead className="bg-[#D1A054] text-base font-semibold uppercase">
              <tr>
                <th></th>
                <th>Email</th>
                <th>Transaction id</th>
                <th>TOTAL PRICE</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((item, index) => (
                <tr className="text-base">
                  <th>{index + 1}</th>
                  <td>{item.email}</td>
                  <td>{item.transactionId}</td>
                  <td>${item.price}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistroy;