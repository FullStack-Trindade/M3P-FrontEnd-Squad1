import * as Styled from './MenuComponent.style';

import React, { useState } from 'react';
import { Switch } from 'antd';

import MenuFechado from './MenuFechado.jsx';
import MenuAberto from './MenuAberto.jsx';




export const MenuComponent = () => {

  const [menu, setMenu] = useState(false);


  const onChange = () => {
    setMenu((MenuAberto) => !MenuAberto);
  };


  return (
    <>
      {menu ? <MenuAberto /> : <MenuFechado />}


  

          <Styled.LabelSwitch>
            MENU
          </Styled.LabelSwitch>

          <Styled.SwitchBtn>
          <Switch defaultChecked={menu} onClick={() => setMenu(!menu)} onChange={onChange} />
          </Styled.SwitchBtn>
    

    </>
  )
}

/*   export default MenuComponent */
