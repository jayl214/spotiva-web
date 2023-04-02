import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";

// import { api } from "~/utils/api";
import { Game } from "~/components/game/Game";
import { Button } from "~/components/button/Button";
import { useAtom } from "jotai";
import { colourAtom } from "~/jotai";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  const [colour] = useAtom(colourAtom)

  // const {data: playlists} = api.example.getPlaylists.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined },
  // );

  const isSignedIn = !!sessionData

  const Login = () => (
    <div className="flex h-full items-center justify-center">
      <Button onClick={() => void signIn()}>
        Sign In
      </Button>
    </div>
  )

  return (
    <>
      <main className={`h-screen flex flex-col items-center justify-center font-bold ${colour} transition-all`}>
        <div className="w-1/2 h-full">
          {isSignedIn ? <>
            <Game/>
          </> :
            <Login />
          }
        </div>
      </main>
    </>
  );
};

export default Home;