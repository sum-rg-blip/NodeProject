import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { categories, allProducts, reviews, seasonalSolutions } from '../data/mockData';
import dr1 from '../assets/dr1.png';
import dr2 from '../assets/dr2.png';

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

            {/* Doctor Banners */}
            <section className="section container doctors-section">
                <div className="doctor-card dark">
                    <div className="doctor-info">
                        <span className="card-category">Healthcare</span>
                        <h3>Nature's Bounty</h3>
                        <p>
                            Learn special solution that's <br />
                            for best YOU and your skin here.
                        </p>
                        <button className="btn-pill btn-light-purple">
                            Book appointment <ArrowRight size={16} />
                        </button>
                    </div>
                    <div className="doctor-image">
                        <img src={dr1} alt="Nature's Bounty" />
                    </div>
                </div>

                <div className="doctor-card light">
                    <div className="doctor-info">
                        <h3>Dr. Shapox Smith</h3>
                        <p>
                            Learn special solution that's <br />
                            for best YOU and your skin here.
                        </p>
                        <button className="btn-pill btn-white-outline">
                            Book appointment <ArrowRight size={16} />
                        </button>
                    </div>
                    <div className="doctor-image">
                        <img src={dr2} alt="Dr. Felix" />
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
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

export default Home;
