import * as Styled from './MenuComponent.style';
import React, { useState } from 'react';
import { Switch } from 'antd';

import { ThemeContext } from '../../../Context/Theme.context.jsx'
import { useContext} from 'react';


import MenuFechado from './MenuFechado.jsx';
import MenuAberto from './MenuAberto.jsx';




export const MenuComponent = () => {

  const [menu, setMenu] = useState(false);
  const { theme } = useContext(ThemeContext);


  const onChange = () => {
    setMenu((MenuAberto) => !MenuAberto);
  };


  return (
    <>
      {menu ? <MenuAberto  /> : <MenuFechado />}


  

          <Styled.LabelSwitch colors={theme.cores}>
            MENU
          </Styled.LabelSwitch>

          <Styled.SwitchBtn colors={theme.cores}>
          <Switch defaultChecked={menu} onClick={() => setMenu(!menu)} onChange={onChange} />
          </Styled.SwitchBtn>
    

    </>
  )
}

 export default MenuComponent