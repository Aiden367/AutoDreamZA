import React, { useEffect, useState } from 'react';
import Nav from "../../../COMPONENTS/Navbar";
import SecondNav from "../../../COMPONENTS/SecondNavbar";
import { useUser } from '../../../BACKEND/context/UserContext';
import '../Styles/Purchase.css';

interface PurchaseItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}
interface Purchase {
  _id: string;
  purchasedAt: string;
  items: PurchaseItem[];
}


const PurchasesPage: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  const { userId } = useUser();

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`http://localhost:5000/payment/purchase/${userId}/`);
        if (!res.ok) throw new Error("Failed to fetch purchases");
        const data = await res.json();
        setPurchases(data);
      } catch (err: any) {
        setError(err.message || "Error fetching purchases");
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, [userId]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString();
  const calculateTotal = (items: PurchaseItem[]) =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <SecondNav />
      <Nav />
      <div className="purchases-container">
        <h1 className="purchases-title">My Purchases</h1>
        {loading && <p>Loading purchases...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && purchases.length === 0 && (
          <p className="empty-message">You have no purchases yet.</p>
        )}
        <div className="purchases-table-container">
          <table className="purchases-table">
            <thead>
              <tr>
                <th>Purchase ID</th>
                <th>Items</th>
                <th>Total</th>
                <th>Purchase Date</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr
                  key={purchase._id}
                  onClick={() => setSelectedPurchase(purchase)}
                  className="clickable-row"
                >
                  <td>{purchase._id ? purchase._id.slice(-6).toUpperCase() : 'N/A'}</td>
                  <td>{purchase.items.length}</td>
                  <td>R{calculateTotal(purchase.items).toFixed(2)}</td>
                  <td>{formatDate(purchase.purchasedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedPurchase && (
          <div className="purchase-modal-overlay" onClick={() => setSelectedPurchase(null)}>
            <div className="purchase-modal" onClick={(e) => e.stopPropagation()}>
              <h2>Purchase Details</h2>
              <p><strong>Purchase ID:</strong> {selectedPurchase._id}</p>
              <p><strong>Date:</strong> {formatDate(selectedPurchase.purchasedAt)}</p>
              <hr />
              {selectedPurchase.items.map((item, idx) => (
                <div key={idx} className="modal-item">
                  <p><strong>{item.title}</strong></p>
                  <p>Price: R{item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              ))}
              <button onClick={() => setSelectedPurchase(null)} className="close-button">Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PurchasesPage;
