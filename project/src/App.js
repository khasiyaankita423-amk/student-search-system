
import React, { useEffect, useState } from "react";
import "./App.css";


  const API_URL =
  "https://69b06a9ac63dd197febc3a99.mockapi.io/student/student";

function App() {
  const [students, setStudents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchStudents = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

     const data = await response.json();

const studentsWithDemoData = data.map((student, index) => ({
  ...student,

  gender: index % 2 === 0 ? "male" : "female",

  email:
    student.email ||
    `${student.name
      ?.toLowerCase()
      .replace(/\s+/g, ".")
      .replace(/[^a-z.]/g, "")}@example.com`,
}));

setStudents(studentsWithDemoData);
    } catch (error) {
      console.error(error);
      setErrorMsg(
        "Unable to load student data. Please try again later."
      );
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const name = student.name?.toLowerCase() || "";
    const search = searchInput.toLowerCase().trim();

    const matchesName = name.includes(search);

    const matchesGender =
      genderFilter === "all" ||
      student.gender?.toLowerCase() === genderFilter;

    return matchesName && matchesGender;
  });

  const clearSearch = () => {
    setSearchInput("");
    setGenderFilter("all");
    setErrorMsg("");
  };

  return (
    <div className="app">
      <div className="container">

        {/* Header */}
        <header className="header">
          <div className="header-icon">🎓</div>

          <div>
            <h1>Student Search System</h1>
            <p>
              Search and filter student information quickly and easily.
            </p>
          </div>
        </header>

        {/* Search Section */}
        <section className="search-section">

          <div className="search-group">
            <label>Student Name</label>

            <input
              type="text"
              placeholder="Enter student name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          <div className="search-group">
            <label>Gender</label>

            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="all">All Students</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button
            className="clear-button"
            onClick={clearSearch}
          >
            Clear
          </button>

        </section>

        {/* Statistics */}
        <div className="stats">
          <div className="stat-card">
            <span className="stat-number">
              {filteredStudents.length}
            </span>

            <span className="stat-label">
              Students Found
            </span>
          </div>
        </div>

        {/* Error */}
        {errorMsg && (
          <div className="error-message">
            ⚠️ {errorMsg}
            <button onClick={fetchStudents}>
              Retry
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading students...</p>
          </div>
        )}

        {/* Student Cards */}
        {!loading && !errorMsg && (
          <>
            {filteredStudents.length > 0 ? (
              <div className="student-grid">

                {filteredStudents.map((student) => (
                  <div
                    className="student-card"
                    key={student.id}
                  >
                    <div className="student-avatar">
                      {student.name
                        ? student.name.charAt(0).toUpperCase()
                        : "S"}
                    </div>

                    <div className="student-info">
                      <h3>{student.name || "Unknown Student"}</h3>

                      <p>
                        <strong>Student ID:</strong>{" "}
                        {student.id}
                      </p>

                      <p>
                        <strong>Email:</strong>{" "}
                        {student.email || "Not available"}
                      </p>

                      <p>
                        <strong>Gender:</strong>{" "}
                        {student.gender || "Not available"}
                      </p>
                    </div>
                  </div>
                ))}

              </div>
            ) : (
              <div className="no-data">
                <div className="no-data-icon">🔍</div>

                <h2>No Students Found</h2>

                <p>
                  Try searching with a different name or filter.
                </p>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <footer>
          <p>
            Student Search System • Built with React
          </p>
        </footer>

      </div>
    </div>
  );
}

export default App;