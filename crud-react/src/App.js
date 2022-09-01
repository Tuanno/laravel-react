import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

import EditRegistration from "./components/registration/edit.component";
import RegistrationList from "./components/registration/list.component";
import CreateRegistration from "./components/registration/create.component";

function App() {
  return (<Router>
    <Navbar bg="primary">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
          Crud Laravel e React
        </Link>
      </Container>
    </Navbar>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/registration/create" element={<CreateRegistration />} />
            <Route path="/registration/edit/:id" element={<EditRegistration />} />
            <Route exact path='/' element={<RegistrationList />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;