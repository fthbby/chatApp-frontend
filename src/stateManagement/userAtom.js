import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist({ key: 'userAtomState' });


const getInitialCartState = () => {
  const storedState = localStorage.getItem("userAtomState");
  return storedState ? JSON.parse(storedState) : [];
};


export const userAtom = atom({
  key: "userAtomState",
  default: getInitialCartState(),
  // default:[],
  effects_UNSTABLE: [persistAtom],

});
