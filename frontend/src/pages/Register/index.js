import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUF] = useState('');

  const history = useHistory();

  async function handleRegister(e){
    e.preventDefault();
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    }
    console.log (data);
    

       try{
      const response = await api.post('ongs',data);

      alert(`Seu ID de acesso: ${response.data.id}`);
      history.push('/')
    }catch(err){
      const retornoErro = err.response.data
      console.log(retornoErro)
      alert(`Erro no envio de dados: Preencha corretamente os campos "${retornoErro.message}. "`);
    }  
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar usa ONG.</p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041"/>
            Voltar para logon
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
          placeholder="Nome da ONG"
          value={name}
          onChange={e => setName(e.target.value)}
          />

          <input 
          type="email" 
          placeholder="E-Mail"
          value={email}
          onChange={e => setEmail(e.target.value)}/>

          <input 
          placeholder="WhatsApp"
          value={whatsapp}
          onChange={e => setWhatsapp(e.target.value)}/>
              
          <div className="input-group">
            <input 
            placeholder="Cidade"
            value={city}
            onChange={e => setCity(e.target.value)}/>

            <input 
            placeholder="UF" style={{ width:80 }}
            value={uf}
            onChange={e => setUF(e.target.value)}/>

          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}