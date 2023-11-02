import * as Styled from "./InputUserSearchAtHome.style";
import { useEffect, useState } from "react";
import { UserService } from "../../Service/User.service";
import CardUser from "../CardUser/CardUser";

export const InputUserSearchAtHome = () => {
  useEffect(() => {
    fetchUsersList();
  }, []);

  const [usersList, setUsersList] = useState([]);
  const [user, setUser] = useState();

  const fetchUsersList = async () => {
    UserService.Get().then((result) => setUsersList(result));
  };

  const [inputName, setInputName] = useState();

  const searchUser = () => {
    const filteredUser = usersList.filter((user) =>
      user.name.includes(inputName)
    );

    if (filteredUser.length > 1) {
      return alert("Digite o nome completo do usuário");
    }
    if (filteredUser.length === 0) {
      return alert("Usuário não consta no cadastro");
    } else {
      setUser(filteredUser[0]);
    }
  };
  console.log(user ? user.name : false);
  return (
    <>
      <Styled.InputContainer>
        <h2> Informações Rápidas de Usuário</h2>

        <Styled.SearchInput>
          <input
            className="input2 inputFaq"
            id="namePatient"
            type="text"
            placeholder="Digite o nome do paciente"
            name="namePatient"
            onChange={(e) => setInputName(e.target.value)}
          />

          <button className="button" type="submit" onClick={searchUser}>
            Buscar
          </button>
        </Styled.SearchInput>
      </Styled.InputContainer>

{user? <CardUser user = {user}/> : usersList.map(user => <CardUser user = {user} key = {user.id}/>)} 
      
    </>
  );
};
