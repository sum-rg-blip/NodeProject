// import React from 'react'
// import './App.css'

// function App() {

//   return (
//     <div className="App">
//       <h1 className="text-3xl font-bold underline">
//         Hello world!
//       </h1>
//       </div>
      
    
//   )
// }
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowRight, Star, User, LogOut, Package, RefreshCcw, X, Search, Filter } from 'lucide-react';
import dr1 from './assets/dr1.png';
import dr2 from './assets/dr2.png';
import user1 from './assets/user1.png';
import user2 from './assets/user2.png';
import user3 from './assets/user3.png';
import './App.css';

// --- DATA ---
const categories = [
  { id: 1, name: 'Kidney Care', image: 'https://i.pinimg.com/736x/d9/76/93/d97693a9c4ff3cb860cb566dcd654cc4.jpg' },
  { id: 2, name: 'Psoriasis', image: 'https://i.pinimg.com/1200x/0a/d1/69/0ad16979d2688cacd773246c871787cb.jpg' },
  { id: 3, name: 'Liver Care', image: 'https://i.pinimg.com/1200x/a3/eb/01/a3eb015d046a90ebb080d392d6f4f2a3.jpg' },
  { id: 4, name: 'Pathology Care', image: 'https://i.pinimg.com/1200x/1f/bf/7a/1fbf7af0459fc794f8d9eb206c935505.jpg' },
  { id: 5, name: 'Skin Care', image: 'https://i.pinimg.com/1200x/0a/4f/a1/0a4fa18824cf78b369e6329a6fa458f6.jpg' },
  { id: 6, name: 'Pregnant Care', image: 'https://i.pinimg.com/736x/c1/42/fe/c142fe58521a54fd4851f2b59ab14906.jpg' },
];

const allProducts = [
  { id: 1, brand: "Nature's Bounty", category: 'Healthcare', price: '58.00', image: 'https://i.pinimg.com/736x/3c/5d/5a/3c5d5a6f84405ce43c636f52adc30ad0.jpg', rating: 4.5 },
  { id: 2, brand: "Nature's Bounty", category: 'Healthcare', price: '38.00', image: 'https://i.pinimg.com/736x/50/79/6d/50796d6f7445d4903348388396f1f321.jpg', rating: 4.8 },
  { id: 3, brand: "Nature's Bounty", category: 'Healthcare', price: '24.00', image: 'https://i.pinimg.com/736x/dc/9e/27/dc9e275e6328a2f43404fbd241da6537.jpg', rating: 4.2 },
  { id: 4, brand: "Nature's Bounty", category: 'Healthcare', price: '84.00', image: 'https://i.pinimg.com/736x/7c/77/5c/7c775c0b9f3d76dcab33d0861c736f77.jpg', rating: 4.9 },
  { id: 5, brand: "Vital Vitamins", category: 'Supplements', price: '45.00', image: 'https://i.pinimg.com/1200x/f3/b1/1e/f3b11e0ad89c695f277c1af33cda17e6.jpg', rating: 4.6 },
  { id: 6, brand: "Skin Glow", category: 'Skin Care', price: '32.00', image: 'https://i.pinimg.com/1200x/a4/01/7e/a4017e4fbc561a57789a55ca55c0d129.jpg', rating: 4.7 },
  { id: 7, brand: "Herb Source", category: 'Natural', price: '28.00', image: 'https://i.pinimg.com/1200x/d3/f6/37/d3f63778828153a2166e6f5e7c4a64df.jpg', rating: 4.1 },
  { id: 8, brand: "MediPlus", category: 'Pharma', price: '15.00', image: 'https://i.pinimg.com/1200x/37/8d/9e/378d9e591a5ba64a41379fca83857010.jpg', rating: 4.3 },
  { id: 9, brand: "Daily Health", category: 'Healthcare', price: '22.00', image: 'https://i.pinimg.com/736x/3c/dd/96/3cdd968979b28104293e9478ac0cb6bc.jpg', rating: 4.4 },
  { id: 10, brand: "OmniVits", category: 'Supplements', price: '65.00', image: 'https://i.pinimg.com/736x/92/48/1e/92481e174c61f103420f7e472350254c.jpg', rating: 4.8 },
  { id: 11, brand: "Pure E", category: 'Vitamin', price: '19.00', image: 'https://i.pinimg.com/1200x/75/86/7a/75867afd7fdeaa2342ae4505600c762d.jpg', rating: 4.5 },
  { id: 12, brand: "CalciMax", category: 'Natural', price: '34.00', image: 'https://i.pinimg.com/1200x/62/99/fd/6299fd2e1612c2c72b813bd7cd233219.jpg', rating: 4.6 },
];

const reviews = [
  { id: 1, author: 'Sarah Johnson', text: 'Excellent service and fast delivery. Highly recommended!', stars: 5 },
  { id: 2, author: 'Michael Chen', text: 'Great quality products. The website is easy to navigate.', stars: 5 },
  { id: 3, author: 'Emma Wilson', text: 'Very professional and helpful staff. Always my first choice for pharmacy needs.', stars: 4 },
];

const seasonalSolutions = [
  { id: 1, title: 'Headache and Migraine Solutions', image: user1 },
  { id: 2, title: 'Headache and Migraine Solutions', image: user2 },
  { id: 3, title: 'Headache and Migraine Solutions', image: user3 },
];

// --- COMPONENTS ---
const ProductCard = ({ product, onOrder }) => (
  <div className="product-card">
    <button className="wishlist-btn"><Heart size={18} /></button>
    <div className="product-image">
      <img src={product.image} alt={product.brand} />
    </div>
    <div className="product-info">
      <div className="brand-info">
        <h3>{product.brand}</h3>
        <span>{product.category}</span>
      </div>
      <div className="price-row">
        <span className="price">${product.price}</span>
        <button className="shop-btn" onClick={() => onOrder(product)}>
          GO SHOP <ShoppingCart size={16} />
        </button>
      </div>
    </div>
  </div>
);

const Navbar = ({ user, ordersCount, setShowOrders, setShowAuth, setIsLogin, logout }) => (
  <nav className="navbar container">
    <Link to="/" className="logo">PHARMACY</Link>
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/shop">Shop</Link>
    </div>
    <div className="nav-actions">
      {user ? (
        <div className="user-menu">
          <button className="btn-icon" onClick={() => setShowOrders(prev => !prev)}>
            <Package size={20} /> Orders ({ordersCount})
          </button>
          <div className="user-profile">
            <User size={20} /> <span>{user.name.split(' ')[0]}</span>
            <button className="btn-icon" onClick={logout}><LogOut size={18} /></button>
          </div>
        </div>
      ) : (
        <button className="btn-pill btn-outline" onClick={() => { setShowAuth(true); setIsLogin(true); }}>
          Join Us
        </button>
      )}
    </div>
  </nav>
);

const Home = ({ onOrder }) => {
  const featured = allProducts.slice(0, 4);
  const bestSellers = allProducts.slice(0, 8);

  return (
    <>
      <section className="section container">
        <h2>Our Popular Categories</h2>
        <div className="category-grid">
          {categories.map(cat => (
            <div key={cat.id} className="category-item">
              <div className="category-circle">
                <img src={cat.image} alt={cat.name} />
              </div>
              <p>{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-header">
          <h2>Todays Best Offer <br /> Just For You</h2>
        </div>
        <div className="product-grid">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} onOrder={onOrder} />
          ))}
        </div>
      </section>

      <section className="section container text-center">
        <h2>Our Seasonal <br /> Exclusive Solutions</h2>
        <div className="solutions-grid">
          {seasonalSolutions.map(solution => (
            <div key={solution.id} className="solution-card">
              <div className="solution-content">
                <h3>{solution.title}</h3>
                <button className="btn-pill btn-secondary">See more <ArrowRight size={16} /></button>
              </div>
              <div className="solution-image">
                <img src={solution.image} alt={solution.title} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-header">
          <h2>Our Best Seller Products</h2>
        </div>
        <div className="product-grid">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} onOrder={onOrder} />
          ))}
        </div>
      </section>

      <section className="section container doctors-section">
        <div className="doctor-card dark">
          <div className="doctor-info">
            <span className="card-category">Healthcare</span>
            <h3>Nature's Bounty</h3>
            <p>Learn special solution that's <br /> for best YOU and your skin here.</p>
            <button className="btn-pill btn-light-purple">Book appointment <ArrowRight size={16} /></button>
          </div>
          <div className="doctor-image"><img src={dr1} alt="Nature's Bounty" /></div>
        </div>
        <div className="doctor-card light">
          <div className="doctor-info">
            <h3>Dr. Shapox Smith</h3>
            <p>Learn special solution that's <br /> for best YOU and your skin here.</p>
            <button className="btn-pill btn-white-outline">Book appointment <ArrowRight size={16} /></button>
          </div>
          <div className="doctor-image"><img src={dr2} alt="Dr. Shapox" /></div>
        </div>
      </section>

      <section className="section container reviews-section">
        <div className="reviews-header">
          <div className="reviews-stats">
            <h2>4.5/5 review from <br /> 7,000+ verified customer</h2>
          </div>
          <p className="reviews-sub">But don't just take our word for it — here's what our customers have to say about our solutions.</p>
        </div>
        <div className="reviews-grid">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="stars">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} size={16} fill={i < review.stars ? "currentColor" : "none"} color={i < review.stars ? "currentColor" : "#ccc"} />
                ))}
              </div>
              <p className="review-text">"{review.text}"</p>
              <p className="review-author">{review.author}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

const Shop = ({ onOrder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredProducts = allProducts.filter(p => {
    const matchesSearch = p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || p.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="shop-page container">
      <div className="shop-header">
        <h1>Health Shop</h1>
        <div className="shop-tools">
          <div className="search-bar"><Search size={18} /><input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <div className="filter-group">
            <Filter size={18} />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Supplements">Supplements</option>
              <option value="Skin Care">Skin Care</option>
              <option value="Natural">Natural</option>
              <option value="Pharma">Pharma</option>
            </select>
          </div>
        </div>
      </div>
      <div className="product-grid shop-grid">
        {filteredProducts.map(product => <ProductCard key={product.id} product={product} onOrder={onOrder} />)}
      </div>
      {filteredProducts.length === 0 && <div className="no-results"><p>No products found matching your search.</p></div>}
    </div>
  );
};

// --- APP ---
const API_URL = 'http://localhost:5000/api';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);

  const [returnOrderId, setReturnOrderId] = useState(null);
  const [returnReason, setReturnReason] = useState('');

  // Notification State
  // Removed

  useEffect(() => { if (token) fetchOrders(); }, [token]);

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/login' : '/register';
    const body = isLogin ? { email, password } : { name, email, password };
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        setShowAuth(false);
      }
    } catch (err) { console.error('Server error'); }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setOrders([]);
    // Reset all other states
    setPendingOrder(null);
    setShowCheckout(false);
    setShowOrders(false);
    setReturnOrderId(null);
    setReturnReason('');
    setName('');
    setEmail('');
    setPassword('');
  };

  const initiateOrder = (product) => {
    if (!token) { setShowAuth(true); return; }
    setPendingOrder(product);
    setShowCheckout(true);
  };

  const confirmOrder = async () => {
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
        body: JSON.stringify({
          products: [{ name: pendingOrder.brand, price: parseFloat(pendingOrder.price), image: pendingOrder.image }],
          totalAmount: parseFloat(pendingOrder.price)
        }),
      });
      if (res.ok) {
        fetchOrders();
        setShowCheckout(false);
        setPendingOrder(null);
      }
    } catch (err) { console.error('Order failed'); }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/orders`, { headers: { 'x-auth-token': localStorage.getItem('token') } });
      const data = await res.json();
      setOrders(data);
    } catch (err) { console.error(err); }
  };

  const handleReturn = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/orders/${returnOrderId}/return`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
        body: JSON.stringify({ reason: returnReason }),
      });
      if (res.ok) {
        setReturnOrderId(null);
        setReturnReason('');
        fetchOrders();
      }
    } catch (err) { console.error('Failed to request return'); }
  };

  return (
    <Router>
      <div className="app">
        <Navbar user={user} ordersCount={orders.length} setShowOrders={setShowOrders} setShowAuth={setShowAuth} setIsLogin={setIsLogin} logout={logout} />
        <Routes>
          <Route path="/" element={<Home onOrder={initiateOrder} />} />
          <Route path="/shop" element={<Shop onOrder={initiateOrder} />} />
        </Routes>

        {/* Auth Modal */}
        {showAuth && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-btn" onClick={() => setShowAuth(false)}><X /></button>
              <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
              <form onSubmit={handleAuth}>
                {!isLogin && <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />}
                <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button className="btn-pill btn-outline w-full" type="submit">{isLogin ? 'Log in' : 'Sign up'}</button>
              </form>
              <p className="mt-4 text-center cursor-pointer auth-toggle" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
              </p>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckout && pendingOrder && (
          <div className="modal-overlay" onClick={() => setShowCheckout(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setShowCheckout(false)}><X /></button>
              <h2>Confirm Order</h2>
              <div className="order-summary" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <img src={pendingOrder.image} alt={pendingOrder.brand} style={{ height: '100px', objectFit: 'contain', margin: '0 auto 1rem' }} />
                <h3>{pendingOrder.brand}</h3>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total: ${pendingOrder.price}</p>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>Payment Method: <strong>Cash on Delivery</strong></p>
                <p style={{ fontSize: '0.9rem', color: '#888' }}>You will pay when the item arrives.</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-pill btn-outline w-full" onClick={() => setShowCheckout(false)}>Cancel</button>
                <button className="btn-pill btn-light-purple w-full" onClick={confirmOrder}>Confirm</button>
              </div>
            </div>
          </div>
        )}

        {/* Orders Modal */}
        {showOrders && (
          <div className="modal-overlay" onClick={() => setShowOrders(false)}>
            <div className="modal-content orders-modal" onClick={e => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setShowOrders(false)}><X /></button>
              <h2>My History</h2>
              <div className="orders-list">
                {orders.length === 0 ? <p className="text-center py-4">No orders found.</p> : orders.map(order => (
                  <div key={order._id} className="order-item">
                    <div className="order-details">
                      <p><strong>Order:</strong> #{order._id.slice(-6)}</p>
                      <p><strong>Amount:</strong> ${order.totalAmount}</p>
                      <p><strong>Status:</strong> <span className={`status-${order.status.toLowerCase()}`}>{order.status}</span></p>
                      {order.returnReason && <p className="reason">Note: {order.returnReason}</p>}
                    </div>
                    {order.status === 'Ordered' && (
                      <button className="btn-pill btn-secondary" onClick={() => setReturnOrderId(order._id)}>
                        <RefreshCcw size={16} /> Return
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Return Modal */}
        {returnOrderId && (
          <div className="modal-overlay" onClick={() => setReturnOrderId(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setReturnOrderId(null)}><X /></button>
              <h2>Return Request</h2>
              <form onSubmit={handleReturn}>
                <p style={{ marginBottom: '1rem', color: '#666' }}>Which item(s) would you like to return?</p>
                <textarea
                  placeholder="E.g., I want to return the Vitamin C. Reason: It was damaged."
                  value={returnReason}
                  onChange={e => setReturnReason(e.target.value)}
                  required
                  style={{ minHeight: '100px' }}
                />
                <button className="btn-pill btn-outline w-full" type="submit">Submit Request</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}




export default App
