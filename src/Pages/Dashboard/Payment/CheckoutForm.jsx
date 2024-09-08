import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [ error, setError ] = useState("");
  const [ clientSecret, setClientSecret ] = useState();
  const navigate = useNavigate();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [ cart, refetch ] = useCart();
  const totalPrice = cart.reduce((total, item)=> total + item.price, 0)

  useEffect(()=>{
    if(totalPrice > 0){
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice])

  const handleSubmit = async (event) =>{
    event.preventDefault();

    if(!stripe || !elements){
      return;
    }

    const card = elements.getElement(CardElement)
    if(card === null){
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card
    })
    if(error){
      setError(error.message);
    }else{
      console.log("payment method", paymentMethod)
      setError("")
    }

    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || "anonymous",
          email: user?.email || "anonymous",
        },
      },
    });

    if(confirmError){
      console.log("confirm error")
    }else{
      console.log("payment intent", paymentIntent);
      if(paymentIntent.status === 'succeeded'){
        //now save the payment in the database
        const paymentInfo = {
          transactionId: paymentIntent.id,
          email: user.email,
          price: totalPrice,
          date: new Date(), // UTC date conver. use moment js to
          cartIds: cart.map((item) => item._id),
          menuIds: cart.map((item) => item.menuId),
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", paymentInfo);
        refetch();
        if (res.data?.paymetntResult?.insertedId) {
          Swal.fire({
            title: paymentIntent.status,
            text: `Your transaction id: ${paymentIntent.id}`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/paymentHistory");
        }
      }
    }
  }
  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="border-2 p-3">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "20px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <p className="text-red-500 text-xl">{error}</p>
      <div className="w-full flex items-center justify-center">
        <button
          className="btn btn-primary mt-5"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;