import React, { createContext, useState, useContext } from 'react';

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [avatar, setAvatar] = useState(require('../assets/icons/avatar.png'));

  const updateAvatar = (uri) => {
    setAvatar(uri);
  };

  return (
    <AvatarContext.Provider value={{ avatar, updateAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => {
  return useContext(AvatarContext);
};
