'use client'
import {useAppSelector} from "@/lib/hooks";
import Userinterface from "@/interfaces/Userinterface";

export default function Home() {
  const user: Userinterface = useAppSelector( state => state.local.user)

  return (
    <h1> ola mundo no tema {user.theme}</h1>
  );
}
