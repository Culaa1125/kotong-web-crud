import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Itemlist() {
    const [barangData, setBarangData] = useState([]);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false); 
    const navigate = useNavigate();
    
    useEffect(() => {
        getBarangData();
    }, []);

    const getBarangData = async () => {
        try {
            const reqData = await fetch("http://localhost/kotong-web-crud/api/user.php");
            const resData = await reqData.json();
            console.log(resData);
            if (Array.isArray(resData)) {
                setBarangData(resData);
            } else if (resData.data && Array.isArray(resData.data)) {
                setBarangData(resData.data);
            } else {
                setBarangData([]); // Inisialisasi dengan array kosong jika data tidak ada
                console.log('Unexpected data format:', resData);
            }
        } catch (error) {
            setBarangData([]);
            console.log('Error:', error);
        }
    };

    const handleDelete = async (id) => {
        const res = await axios.delete("http://localhost/reactcrudphp/api/user.php/" + id);
        setMessage(res.data.success);
        getBarangData();
        setShowModal(true); // Tampilkan modal setelah delete
    };

    useEffect(() => {
        // Memastikan bahwa backdrop muncul saat modal dibuka
        if (showModal) {
            const modalElement = document.getElementById('deleteModal');
            const backdrop = document.createElement('div');
            backdrop.classList.add('modal-backdrop', 'fade', 'show');
            document.body.appendChild(backdrop);
        }
    }, [showModal]);

    const handleModalClose = () => {
        setShowModal(false);  // Menyembunyikan modal
        navigate('/itemlist'); // Pindah ke halaman userlist setelah modal ditutup

        // Menghapus backdrop secara manual
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.remove(); // Menghapus backdrop jika ada
        }
    };

    return (
        <React.Fragment>
            <div>
                <div className={`modal fade ${showModal ? 'show' : ''}`} id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" style={{ display: showModal ? 'block' : 'none' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteModalLabel">Pemberitahuan</h5>
                                <button type="button" className="btn-close" onClick={handleModalClose} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p className="text-dark fw-bold">{message}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={handleModalClose}>Tutup</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-4">
                <div className="row justify-content-center">
                    <div className="col-auto mt-4">
                        <h1 className="mb-4 fw-bold text-center">List Barang</h1>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-11 mt-4">
                        <table className="table table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">ID Barang</th>
                                    <th scope="col">Nama Barang</th>
                                    <th scope="col">Stok Barang</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {barangData.map((uData, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{uData.namabarang}</td>
                                        <td>{uData.stokbarang}</td>
                                        <td>{uData.status == 1 ? "Tersedia" : "Tidak Tersedia"}</td>
                                        <td>
                                            <Link to={`/edititem/${uData.id}`} className="btn btn-success mx-2">Edit</Link>
                                            <button className="btn btn-danger" onClick={() => handleDelete(uData.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Itemlist;