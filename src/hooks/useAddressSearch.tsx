import { useState } from "react";
import EnderecoByCep from "../services/EnderecoByCep";
import { ChangeEvent, FormEvent } from "../types/Events";
import { AddressData } from "../types/AddressData";

const useAddressSearch = () => {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState<AddressData | null>(null);

  const handleChangeCep = (e: ChangeEvent) => {
    setCep(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await EnderecoByCep(cep);
      setEndereco(response);
    } catch (error) {
      console.log("CEP não encontrado");
    }
  };

  return {
    cep,
    endereco,
    handleChangeCep,
    handleSubmit,
  };
};

export default useAddressSearch;
