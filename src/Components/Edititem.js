import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Edititem() {

    const [showModal, setShowModal] = useState(false); 
    const [message, setMessage] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();
    const [formvalue, setFormvalue] = useState({namabarang:'', stokbarang:'', status:''});
    const handleInput = (e) => {
        setFormvalue({...formvalue, [e.target.name]:e.target.value});
    }
    useEffect(() => {
        const barangRowdata = async() => {
            const getBarangData = await fetch("http://localhost/kotong-web-crud/api/user.php/" + id);
            const reuserdata = await getBarangData.json();
            console.log(reuserdata);
            setFormvalue(reuserdata);
        }
        barangRowdata();
    }, []);

    useEffect(() => {
        const modalElement = document.getElementById('editModal');
        const modal = new window.bootstrap.Modal(modalElement, {
            backdrop: true,
            keyboard: false  
        });
        if (showModal) {
            modal.show();
        }
    }, [showModal]);

    useEffect(() => {
        return () => {
            const modalElement = document.getElementById('editModal');
            const modal = window.bootstrap.Modal.getInstance(modalElement);
            if (modal) {
                modal.hide();
            }
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.remove();
            }
        };
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        //console.log(formvalue);
        try { const formData = {id:id, namabarang: formvalue.namabarang, stokbarang: formvalue.stokbarang, status: formvalue.status }; 
            const res = await axios.put("http://localhost/reactcrudphp/api/user.php", formData);
            console.log('Data submitted successfully:', res.data);
            if(res.data.success){
                setMessage(res.data.success);
                setShowModal(true);
            } 
        } catch (error) { if (error.response) { 
            console.log('Server responded with a status:', error.response.status); 
            console.log('Response data:', error.response.data); 
        } else if (error.request) { 
            console.log('No response received:', error.request); 
        } else { 
            console.log('Error:', error.message); 
        } }

        //const formData = {username:formvalue.username, email:formvalue.email, status:formvalue.status};
        //const res = await axios.post("http://localhost/reactcrudphp/api/user.ph", formData);

    }

    const handleModalClose = () => {
        setShowModal(false);
        navigate('/itemlist');
    }

    return(
        <React.Fragment>
            <div>
                <div className={`modal fade ${showModal ? 'show' : ''}`} id="editModal" tabIndex="999" aria-labelledby="editModalLabel" aria-hidden="true" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editModalLabel">Pemberitahuan</h5>
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
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 mt-4">
                        <h1 className="mb-4 fw-bold text-center">Edit Barang</h1>
                        <div className="border border-2 border-dark">
                            <form onSubmit={handleSubmit} className="m-3">
                            <div className="mb-3 row">
                                <label  className="col-sm-3 fw-semibold">Nama Barang</label>
                                <div className="col-sm-9">
                                    <input type="text" name="namabarang" value={formvalue.namabarang} className="form-control" onChange={handleInput}/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label  className="col-sm-3 fw-semibold">Stok Barang</label>
                                <div className="col-sm-9">
                                    <input type="number" name="stokbarang" value={formvalue.stokbarang} className="form-control" onChange={handleInput} />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label  className="col-sm-3 fw-semibold">Status</label>
                                <div className="col-sm-9">
                                    <select name="status" className="form_control" value={formvalue.status} onChange={handleInput}>
                                        <option value="">--Pilih Status--</option>
                                        <option value="1">Tersedia</option>
                                        <option value="0">Tidak Tersedia</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-3"></label>
                                <div className="col-sm-9">
                                    <button type="button" className="btn btn-success"  onClick={handleSubmit}>Update</button>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default Edititem;
