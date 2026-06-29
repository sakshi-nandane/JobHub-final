import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="home">

      <section className="hero">

        <h1>
          Find Your Dream Job Today 🚀
        </h1>

        <p>
          Discover thousands of jobs from
          top companies like TCS, Infosys,
          Wipro, Accenture and more.
        </p>

        <div className="hero-buttons">

          <Link
            to="/jobs"
            className="btn-primary"
          >
            Browse Jobs
          </Link>

          <Link
            to="/register"
            className="btn-secondary"
          >
            Get Started
          </Link>

        </div>

      </section>

      <section className="stats">

        <div className="stat-card">
          <h2>10K+</h2>
          <p>Live Jobs</p>
        </div>

        <div className="stat-card">
          <h2>500+</h2>
          <p>Companies</p>
        </div>

        <div className="stat-card">
          <h2>50K+</h2>
          <p>Applicants</p>
        </div>

      </section>

      <section className="companies">

        <h2>Top Hiring Companies</h2>

        <div className="company-grid">

          <div>TCS</div>
          <div>Infosys</div>
          <div>Wipro</div>
          <div>Accenture</div>
          <div>Cognizant</div>
          <div>Capgemini</div>

        </div>

      </section>

    <section className="features">

  <h2>Why Choose JobHub?</h2>

  <div className="feature-grid">

    <div className="feature-card">
      <h3>🚀 Fast Job Search</h3>
      <p>
        Search thousands of jobs instantly across India.
      </p>
    </div>

    <div className="feature-card">
      <h3>🏢 Top Companies</h3>
      <p>
        Apply to TCS, Infosys, Wipro, Accenture and more.
      </p>
    </div>

    <div className="feature-card">
      <h3>📄 Easy Apply</h3>
      <p>
        Apply directly through company websites.
      </p>
    </div>

    <div className="feature-card">
      <h3>🌎 Remote Jobs</h3>
      <p>
        Find remote and hybrid opportunities easily.
      </p>
    </div>

  </div>

</section>
    </div>
  );
}

export default Home;