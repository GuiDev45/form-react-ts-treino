import { useState } from "react";
import EnderecoByCep from "../services/EnderecoByCep";
import { useForm, SubmitHandler } from "react-hook-form";
import { AddressData } from "../types/AddressData";

interface FormData {
  cep: string;
}

const useAddressSearch = () => {
  const [endereco, setEndereco] = useState<AddressData | null>(null);
  const { register, handleSubmit: handleSubmitReactHookForm } =
    useForm<FormData>(); // Inicializando o useForm com tipo FormData

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Definindo o tipo de data como FormData
    try {
      const response = await EnderecoByCep(data.cep);
      setEndereco(response);
    } catch (error) {
      console.log("CEP não encontrado");
    }
  };

  return {
    endereco,
    handleSubmit: handleSubmitReactHookForm(onSubmit), // Ajustando o handleSubmit
    register, // Passando o register para o componente
  };
};

export default useAddressSearch;
