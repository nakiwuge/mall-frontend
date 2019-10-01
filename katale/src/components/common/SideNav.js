import React from 'react';
import imagePlaceholder from '../../Assets/images/image_placeholder.png';

const  SideNav = (props)=>{
  const {store}=props;

  return (
    <div className="delete">
      <div className="side-nav" >
        <div className="store-name"><p>{store.name}</p></div>
        <div><img src={(store.imageUrl==='null')?imagePlaceholder:store.imageUrl}/></div>
        <div className="menu-items">
          <div><p>Available Items</p></div>
          <div><p>Store Details</p></div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
