import React, { useState, useEffect } from "react";
import axios from "axios";
import './Custom-Style/home.css';

function Home() {
    const [barangData, setBarangData] = useState([]);
    const [message, setMessage] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));
    const username = user?.username || 'User';

    useEffect(() => {
        getBarangData();
    }, []);

    const getBarangData = async () => {
        try {
            const reqData = await fetch("http://localhost/reactcrudphp/api/user.php");
            const resData = await reqData.json();
            console.log(resData);
            if (Array.isArray(resData)) {
                setBarangData(resData);
            } else if (resData.data && Array.isArray(resData.data)) {
                setBarangData(resData.data);
            } else {
                setBarangData([]);
                console.log('Unexpected data format:', resData);
            }
        } catch (error) {
            setBarangData([]);
            console.log('Error:', error);
        }
    };

    const handleDelete = async (id) => {
        const res = await axios.delete("http://localhost/kotong-web-crud/api/user.php/" + id);
        setMessage(res.data.success);
        getBarangData();
    };

    const totalTersedia = barangData.filter(item => item.status == 1).length;
    const totalTidakTersedia = barangData.filter(item => item.status == 0).length;

    return (
        <React.Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-auto mt-4">
                        <h1 className="mb-4 fw-bold text-start display-3">Selamat Datang, {username}</h1>
                    </div>
                </div>
                <div className="flex-row">
                    <div className="alert alert-info">
                        <i className="bi bi-exclamation-circle fs-5"> Web ini masih dalam pengembangan!</i>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="card mx-4 custom-card" style={{width: "18rem"}}>
                            <div className="card-body">
                                <i class="bi bi-boxes fs-2"></i>
                                <h5 className="card-title mb-2">Total Barang</h5>
                                <p className="card-text"><strong>{barangData.length}</strong> Barang</p>
                            </div>
                        </div>
                        <div className="card mx-4 custom-card" style={{width: "18rem"}}>
                            <div className="card-body">
                                <i class="bi bi-box-seam-fill fs-2"></i>
                                <h5 className="card-title mb-2">Barang Tersedia</h5>
                                <p className="card-text"><strong style={{color:"green"}}>{totalTersedia}</strong> Barang</p>
                            </div>
                        </div>
                        <div className="card mx-4 custom-card" style={{width: "18rem"}}>
                            <div className="card-body">
                                <i class="bi bi-box-seam fs-2"></i>
                                <h5 className="card-title mb-2">Barang Tidak Tersedia</h5>
                                <p className="card-text"><strong style={{color:"red"}}>{totalTidakTersedia}</strong> Barang</p>
                            </div>
                        </div>
                        <div className="card mx-4 custom-card" style={{width: "18rem"}}>
                            <div className="card-body">
                                <i class="bi bi-house-door fs-2"></i>
                                <h5 className="card-title mb-2">Gudang</h5>
                                <p className="card-text fw-bold h5">3</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h4 className="fw-bold">Apa Itu KoTong ?</h4>
                        <p className="fs-5"><span className="fw-bold">KoTong</span> adalah aplikasi pencatatan data barang berbasis web dengan menggunakan bahasa pemrograman PHP, HTML, CSS, ReactJS serta menggunakan framework Bootstrap 5.</p>
                    </div>
                    <div class="marquee-container overflow-hidden">
                    <div class="marquee-content d-flex align-items-center">
                        <div class="marquee-item px-4 py-2 mx-2">
                            <img src={`${process.env.PUBLIC_URL}/php.png`} alt="php-logo" />
                        </div>
                        <div class="marquee-item px-4 py-2 mx-2">
                            <img src={`${process.env.PUBLIC_URL}/react.png`} alt="react-logo" />
                        </div>
                        <div class="marquee-item px-4 py-2 mx-2">
                            <img src={`${process.env.PUBLIC_URL}/html.png`} alt="html-logo" />
                        </div>
                        <div class="marquee-item px-4 py-2 mx-2">
                            <img src={`${process.env.PUBLIC_URL}/css.png`} alt="css-logo" />
                        </div>
                        <div class="marquee-item px-4 py-2 mx-2">
                            <img src={`${process.env.PUBLIC_URL}/bootstrap.png`} alt="css-logo" />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Home;
