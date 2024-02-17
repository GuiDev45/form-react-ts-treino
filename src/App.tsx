import { useState } from "react";
import "./styles/global.css";
import { IoMap } from "react-icons/io5";

type AddressData = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
};

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
type FormEvent = React.FormEvent<HTMLFormElement>;

export default function App() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState<AddressData | null>(null);

  const handleChangeCep = (e: ChangeEvent) => {
    setCep(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        return response.json();
      })
      .then((data: AddressData) => {
        setEndereco(data);
      })
      .catch(() => {
        console.log("CEP não encontrado");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>
          <IoMap />
        </h1>
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={cep}
          onChange={handleChangeCep}
        />
        <button type="submit">Buscar</button>
        {endereco && (
          <div>
            <p>CEP: {endereco.cep}</p>
            <p>Logradouro: {endereco.logradouro}</p>
            <p>Complemento: {endereco.complemento}</p>
            <p>Bairro: {endereco.bairro}</p>
            <p>Cidade: {endereco.localidade}</p>
            <p>Estado: {endereco.uf}</p>
          </div>
        )}
        <p>Encontre qualquer endereço do Brasil</p>
        <p>Exemplo 13400-340</p>
      </form>
    </div>
  );
}
