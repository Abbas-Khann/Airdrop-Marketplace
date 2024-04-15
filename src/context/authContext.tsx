import React, { ReactNode, createContext } from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { privatePaths } from "../constants/privatePaths";
import { UserData, getUser } from "@/utils/api/user";
import { useAccount, useConfig } from "wagmi";
import { getUserStakingStats } from "@/utils/contracts/handleStaking";

// import "react-toastify/dist/ReactToastify.css";
// import en from "../public/en.svg";

interface AuthContextProps {
  currentUserData: React.MutableRefObject<UserData | undefined>;
  currentUser: `0x${string}` | undefined;
  authorized: boolean;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<`0x${string}` | undefined>();
  const currentUserData = useRef<UserData | undefined>();
  const router = useRouter();
  const { address } = useAccount();
  const config = useConfig();

  const [authorized, setAuthorized] = useState<boolean>(false);

  // get the user data if the user address is connected and the data is not yet fetched
  // the user Data can be accessed globally from any state
  useEffect(() => {
    async function getUserData() {
      const user = await getUser();
      if (user) {
        currentUserData.current = user;
      }
    }

    if (address && !currentUserData) {
      setCurrentUser(address);
      getUserData();
    }
  }, [address]);

  useEffect(() => {
    const authCheck = async () => {
      if (privatePaths.includes(router.pathname)) {
        if (!currentUser) {
          // If the wallet is not connected and the user tries to access then push to home page and sak to connect
          void router.push({
            pathname: "/",
          });
          return;
        }

        // // Add a check and see if the User has staked yet or not
        // const stakeInfo = await getUserStakingStats({
        //   toAddress: currentUser,
        //   config: config,
        // });

        // if (stakeInfo) {
        //   const { stakedAmount } = stakeInfo;
        //   const hasStaked = Number(stakedAmount) > 0 ? true : false;
        //   setAuthorized(hasStaked);
        //   if (!hasStaked) {
        //     void router.push({
        //       pathname: "/stake",
        //     });
        //   }
        // } else {
        //   setAuthorized(false);
        //   // dispatch(setRedirectLink({ goto: router.asPath }));
        //   void router.push({
        //     pathname: "/stake",
        //   });
        // }
        setAuthorized(true);
      } else {
        setAuthorized(true);
      }
    };

    authCheck();

    const preventAccess = () => setAuthorized(false);

    router.events.on("routeChangeStart", preventAccess);
    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", preventAccess);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [router, router.events, currentUser]);

  const value = {
    currentUser,
    currentUserData,
    authorized,
  };

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
};
