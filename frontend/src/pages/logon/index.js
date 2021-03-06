import React, {useState} from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import {FiLogIn} from 'react-icons/fi';
import api from '../../services/api'

export default function Logon(){
    const history = useHistory();

    const [id, setId] = useState('');

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('session', {id});

            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName',response.data);
            console.log(response.data);

            history.push('/profile');
        }catch(erro){
            alert('Falha no login');
        }

    }

    return(
        <div className="logon-container">
            <section className="form">
            <img src={logoImg} alt="Be The Hero" />

            <form onSubmit={handleLogin}>
                <h1> Faça seu logon</h1>

                <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)} />
                <button className ="button" type="submit">Entrar</button>

                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#e02041" />Não tenho cadastro
                </Link>
            </form>

            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}