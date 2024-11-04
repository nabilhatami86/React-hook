import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const News = () => {
    const apiKey = 'f73f1b11e8e74125943386e3b7775612';
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setNews(response.data.articles);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load news');
                setLoading(false);
            });
    }, [url]);

    const handleSearch = (event) => {
        event.preventDefault();
        const searchQuery = event.target.search.value;
        setQuery(searchQuery);
        setLoading(true);

        axios.get(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}`)
            .then(response => {
                setNews(response.data.articles);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load news');
                setLoading(false);
            });
    };

    return (
        <div className="app">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <img
                        src="https://www.koran.id/wp-content/uploads/2019/05/Logo-Koran.id-mobile-280x96-1.png"
                        alt="Logo"
                        width="200px"
                    />
                    <form className="d-flex" onSubmit={handleSearch} role="search" style={{ marginLeft: 'auto' }}>
                        <input
                            className="form-control me-2"
                            type="search"
                            name="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>

            <div>
                <h1 className='text-center font-monospace text-uppercase text-nowrap bg-body-secondary border" style="width: 8rem;'>News Now</h1>
                {loading && (
                    <div className="text-center">
                        <div className="spinner-border text-dark" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p>Loading...</p>
                    </div>
                )}
                {error && <div>{error}</div>}
                <div className="row">
                    {news.length === 0 && !loading && <p className="text-center">No news found</p>}
                    {news.map((article) => (
                        <div className="col-md-4 mb-4" key={article.url}>
                            <div className="card h-100 card-shadow" style={{ border: '2px solid black' }}>
                                {article.urlToImage && (
                                    <img src={article.urlToImage} alt={article.title} className="" />
                                )}
                                <div className="card-body d-flex flex-column mb-2 justify-content-between">
                                    <div>
                                        <h5 className="card-title">{article.title}</h5>
                                        <p className="card-text">{article.description}</p>
                                    </div>
                                    <button
                                        onClick={() => window.open(article.url, '_blank')}
                                        className="btn btn-dark mt-auto"
                                        style={{ cursor: "pointer" }}
                                    >
                                        Read More
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <footer className="footer mt-auto py-3 bg-dark">
                <div className="container">
                    <span className="text-white">© 2024 nabilhatami, GSK</span>
                </div>
            </footer>
        </div>
    );
};

export default News;
