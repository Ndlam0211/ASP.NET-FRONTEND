import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { 
  PackageCheck, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ShoppingBag,
  CircleAlert,
  Loader
} from "lucide-react";
import { getOrderHistoryThunk } from "../../store/slices/orderSlice";

export const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux States
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { orders, historyLoading, historyError } = useSelector((state) => state.orders);

  // Redirect to login if guest tries to view accounts
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?redirect=/account/orders");
    } else {
      dispatch(getOrderHistoryThunk(user.id));
    }
  }, [isAuthenticated, user, dispatch, navigate]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 0:
        return (
          <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 font-mono">
            Pending Approval
          </span>
        );
      case 1:
        return (
          <span className="bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 font-mono">
            Shipping Out
          </span>
        );
      case 2:
        return (
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 font-mono">
            Completed Fulfilled
          </span>
        );
      default:
        return (
          <span className="bg-neutral-50 text-neutral-600 border border-neutral-200 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 font-mono">
            In System Audit
          </span>
        );
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <div className="border-b border-neutral-100 pb-6 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-neutral-400 font-mono block mb-1">
            Member Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase tracking-widest">
            Order Register History
          </h1>
        </div>
        
        {/* User Card */}
        <div className="bg-neutral-50 border border-neutral-150 p-4 flex gap-4 items-center text-xs self-start md:self-auto font-sans leading-relaxed">
          <div className="h-10 w-10 bg-neutral-900 text-white font-bold flex items-center justify-center font-mono rounded-none">
            {user.fullName?.charAt(0).toUpperCase()}
          </div>
          <div>
            <span className="font-extrabold text-neutral-950 block">{user.fullName}</span>
            <span className="text-neutral-400 block font-mono">{user.email}</span>
          </div>
        </div>
      </div>

      {historyLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader className="w-8 h-8 text-neutral-600 animate-spin mb-3 stroke-1" />
          <span className="text-xs font-mono text-neutral-400">Loading procurement audit registry...</span>
        </div>
      ) : historyError ? (
        <div className="bg-red-50 border border-dashed border-red-200 p-6 flex gap-3 text-red-700 items-center">
          <CircleAlert size={20} className="stroke-1" />
          <div>
            <h4 className="font-bold text-sm">Registry Audit Failure</h4>
            <p className="text-xs">{historyError}</p>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-16 flex flex-col items-center">
          <div className="p-4 bg-neutral-50 rounded-full mb-4">
            <PackageCheck className="w-10 h-10 text-neutral-350 stroke-1" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-800">
            No Purchases Placed Yet
          </h3>
          <p className="text-xs text-neutral-400 mt-1 mb-6 leading-relaxed max-w-xs">
            Your e-commerce ledger has no records yet. When you place a cash of delivery order, they show up here instantly.
          </p>
          <Link 
            to="/shop" 
            className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] font-bold tracking-widest uppercase transition-colors"
          >
            Start Shopping Catalog
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {orders.map((order) => (
            <div 
              key={order.id}
              className="border border-neutral-150 p-6 flex flex-col gap-6 bg-white hover:shadow-subtlest transition-shadow shadow-xs"
            >
              
              {/* Top meta tags */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-100 text-xs font-mono text-neutral-500">
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4">
                  <div>
                    Order ID: <span className="font-bold text-neutral-950 bg-neutral-50 border border-neutral-200 px-2.5 py-0.5">ORD-{order.id}</span>
                  </div>
                  <div>•</div>
                  <div className="flex gap-1 items-center">
                    <Clock size={12} />
                    <span>Placing date: {dayjs(order.orderDate).format("MMM DD, YYYY - HH:mm")}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(order.status)}
                  <span className="font-bold text-sm text-neutral-950 font-sans">
                    Total: ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Items in order */}
              <div className="flex flex-col gap-4">
                {order.items && order.items.map((item, idx) => (
                  <div key={item.id || idx} className="flex gap-4 items-start text-xs text-neutral-600">
                    {item.imageUrl && (
                      <div className="w-12 aspect-4/5 overflow-hidden bg-neutral-50 flex-shrink-0 border border-neutral-150">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    )}
                    <div className="flex-grow">
                      <span className="font-bold text-neutral-950 block">{item.name}</span>
                      <span className="font-mono text-neutral-400 text-[10px]">Qty: {item.quantity} × Size: M</span>
                    </div>
                    <div className="text-right font-bold text-neutral-950 font-mono">
                      ${((item.price || item.unitPrice || 0) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery specifications */}
              <div className="bg-neutral-50/50 p-4 border border-neutral-100 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs font-sans text-neutral-500">
                <div className="flex items-center gap-1.5 leading-normal">
                  <MapPin size={13} className="text-neutral-700 flex-shrink-0" />
                  <span>Shipping Address: <strong className="text-neutral-700 font-sans">{order.shippingAddress || "N/A"}</strong></span>
                </div>
                {order.notes && (
                  <div className="text-neutral-400 italic">
                    Note: "{order.notes}"
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default OrderHistoryPage;
