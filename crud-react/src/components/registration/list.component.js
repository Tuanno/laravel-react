import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function List() {

    const [registrations, setRegistrations] = useState([])

    useEffect(()=>{
        fetchRegistrations() 
    },[])

    const fetchRegistrations = async () => {
        await axios.get(`http://localhost:8000/api/registrations`).then(({data})=>{
            setRegistrations(data)
        })
    }

    const deleteRegistration = async (id) => {
        const isConfirm = await Swal.fire({
            name: 'Are you sure?',
            text: "Você Não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, delete isso!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          await axios.delete(`http://localhost:8000/api/registrations/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchRegistrations()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }

    return (
      <div className="container">
          <div className="row">
            <div className='col-12'>
                <Link className='btn btn-primary mb-2 float-end' to={"/registration/create"}>
                    Criar Registro
                </Link>
            </div>
            <div className="col-12">
                <div className="card card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Telefone</th>
                                    <th>Stack</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    registrations.length > 0 && (
                                        registrations.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.name}</td>
                                                <td>{row.email}</td>
                                                <td className='phone'>{row.phone}</td>
                                                <td>{row.checkbox}</td>
                                                <td>
                                                    <Link to={`/registration/edit/${row.id}`} className='btn btn-success me-2'>
                                                        Editar
                                                    </Link>
                                                    <Button variant="danger" onClick={()=>deleteRegistration(row.id)}>
                                                        Deletar
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </div>
      </div>
    )
}