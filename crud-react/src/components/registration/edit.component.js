import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import validator from 'validator';

export default function EditUser() {
  const navigate = useNavigate();

  const { id } = useParams()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [checkbox, setCheckbox] = useState([])

  const [validationError, setValidationError] = useState({})

  useEffect(() => {
    fetchRegistration()
  }, [])


  const fetchRegistration = async () => {
    await axios.get(`http://localhost:8000/api/registrations/${id}`).then(({ data }) => {
      const { name, email, phone, checkbox } = data.registration
      setName(name)
      setEmail(email)
      setPhone(phone)
      setCheckbox(checkbox.split(","))
    }).catch(({ response: { data } }) => {
      Swal.fire({
        text: data.message,
        icon: "error"
      })
    })
  }

  const updateRegistration = async (e) => {
    e.preventDefault();

    if (!validator.isEmail(email)) {
      Swal.fire({
        text: "Email Inválido",
        icon: "error"
      });
      return;
    }

    const formData = new FormData()
    formData.append('_method', "PUT")
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('checkbox', checkbox)

    await axios.post(`http://localhost:8000/api/registrations/${id}`, formData).then(({ data }) => {
      Swal.fire({
        icon: "success",
        text: "Atualizado com sucesso"
      })
      navigate("/")
    }).catch(({ response }) => {
      if (response.status === 422) {
        setValidationError(response.data.errors)
      } else {
        Swal.fire({
          text: response.data.message,
          icon: "error"
        })
      }
    })
  }

  function handleChangeCheckbox(event, value) {
    if (event.target.checked) {
      setCheckbox((state) => [...state, value]);
    } else {
      setCheckbox((state) => state.filter((chek) => chek !== value));
    }
  }

  function handleResetForm() {
    setName('');
    setEmail('');
    setPhone('');
    setCheckbox([]);
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Atualizar Registro</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value]) => (
                                <li key={key}>{value}</li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={updateRegistration}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" value={name} onChange={(event) => {
                          setName(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="Description">
                        <Form.Label>Email</Form.Label>
                        <Form.Control as="textarea" value={email} onChange={(event) => {
                          setEmail(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="Description">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control as="textarea" value={phone} onChange={(event) => {
                          setPhone(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="my-3">
                    <Form.Label>Stack</Form.Label>

                    <Col>
                      <Form.Group controlId="Description">
                        <input type="checkbox" checked={checkbox.find((v) => v === 'Backend')} onChange={(e) => handleChangeCheckbox(e, 'Backend')} />&nbsp;
                        <Form.Label>BackEnd</Form.Label>
                      </Form.Group>
                    </Col>
                    <br />
                    <Col>
                      <Form.Group controlId="Description">
                        <input type="checkbox" checked={checkbox.find((v) => v === 'Frontend')} onChange={(e) => handleChangeCheckbox(e, 'Frontend')} />&nbsp;
                        <Form.Label>FrontEnd</Form.Label>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button variant="danger" className="mt-2" size="lg" block="block" type="reset" onClick={handleResetForm}>
                    Limpar
                  </Button>
                  &nbsp;&nbsp;
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Atualizar
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}