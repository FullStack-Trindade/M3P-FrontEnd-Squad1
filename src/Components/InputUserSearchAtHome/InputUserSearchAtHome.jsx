import * as Styled from "./InputUserSearchAtHome.style";
import { useEffect, useState } from "react";
import { UserService } from "../../Service/User.service.jsx";
import CardUser from "../CardUser/CardUser";

import UserAddBtn from './../UserAddBtn/UserAddBtn';
 
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
    return (
    <>
      <Styled.InputContainer>
        <h4> Informações Rápidas de Usuário</h4>

        <Styled.SearchInput>
          <input
            className="input2 inputFaq"
            id="namePatient"
            type="text"
            placeholder="Digite o nome do(a) usuário(a)"
            name="namePatient"
            onChange={(e) => setInputName(e.target.value)}
          />

          <button className="button" type="submit" onClick={searchUser}>
            Buscar
          </button>

          <UserAddBtn Text="Novo Usuário" To="/usuario" />
            
        </Styled.SearchInput>
      </Styled.InputContainer>

{user? <CardUser user = {user}/> : usersList.map(user => <CardUser user = {user} key = {user.id}/>)} 
      
    </>
  );
};
