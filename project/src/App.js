import React, { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [errorMsg, setErrorMsg] = useState("");
  const [noData, setNoData] = useState("");

  const apiBase = "https://69b06a9ac63dd197febc3a99.mockapi.io/student/student";

  const fetchStudents = async (searchTerm = "") => {
    let url = apiBase;

    if (searchTerm.trim() !== "") {
      url += `?search=${searchTerm}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const displayStudents = (data) => {
    if (data.length === 0) {
      setNoData("No student found!");
    } else {
      setNoData("");
    }
    setStudents(data);
  };

  const searchStudent = async () => {
    setErrorMsg("");
    setNoData("");

    if (searchInput.trim() === "") {
      setErrorMsg("Please enter student name!");
      setStudents([]);
      return;
    }

    let data = await fetchStudents(searchInput);

    if (genderFilter !== "all") {
      data = data.filter(
        (student) =>
          student.gender &&
          student.gender.toLowerCase() === genderFilter.toLowerCase()
      );
    }

    displayStudents(data);
  };

  const loadAllStudents = async () => {
    const data = await fetchStudents();
    displayStudents(data);
  };

  useEffect(() => {
    loadAllStudents();
  }, []);

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1>Student Search System</h1>

        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Enter student name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={styles.input}
          />

          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            style={styles.input}
          >
            <option value="all">All Categories</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <button onClick={searchStudent} style={styles.button}>
            Search
          </button>
        </div>

        {errorMsg && <div style={styles.error}>{errorMsg}</div>}

        <div style={styles.studentList}>
          {students.map((student) => (
            <div key={student.id} style={styles.card}>
              <h3>{student.name}</h3>
              <p><strong>ID:</strong> {student.id}</p>
              <p><strong>Email:</strong> {student.email || "N/A"}</p>
              <p><strong>Gender:</strong> {student.gender || "N/A"}</p>
            </div>
          ))}
        </div>

        {noData && <div style={styles.noData}>{noData}</div>}
      </div>
    </div>
  );
}

const styles = {
  body: {
    background: "linear-gradient(135deg, #74ebd5, #9face6)",
    minHeight: "100vh",
    padding: "30px",
  },
  container: {
    maxWidth: "900px",
    margin: "auto",
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },
  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
    flexWrap: "wrap",
  },
  input: {
    padding: "10px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    flex: 1,
  },
  button: {
    padding: "10px 20px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  studentList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
    marginTop: "20px",
  },
  card: {
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "10px",
    borderLeft: "5px solid #4CAF50",
  },
  noData: {
    textAlign: "center",
    color: "red",
    marginTop: "20px",
  },
};

export default App;
