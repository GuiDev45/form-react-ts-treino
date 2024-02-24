import { IoMap } from "react-icons/io5";
import "./home.css";
import useAddressSearch from "../../hooks/useAddressSearch";

export default function Home() {
  const { endereco, handleSubmit, register } = useAddressSearch();

  return (
    <div className="container-layout">
      <form onSubmit={handleSubmit}>
        <h1>
          <IoMap />
        </h1>
        <input
          type="text"
          placeholder="Digite seu CEP"
          {...register("cep")} // Utilizando o register para registrar o campo "cep"
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
