"use client";

import { useCallback, useEffect, useState } from "react";

// import team.json from public/team.json
import data from "./team.json";
import { toast, ToastContainer } from "react-toastify";

interface Team {
  name: string;
  logo: string;
  op_gg: string;
}

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  const [teams, setTeams] = useState<any[] | null>(data);

  useEffect(() => {
    // search with inputValue
    // setTeams with the result
    if (!inputValue || inputValue.length === 0) return setTeams(data);
    setTeams(
      data.filter((team) => {
        return team.name.toLowerCase().includes(inputValue.toLowerCase());
      })
    );
  }, [inputValue]);

  if (!teams) return <div>Erreur contacter Robébou</div>;

  return (
    <main className="bg-[#1a1a1a]  flex flex-col gap-5 py-10 items-center">
      <h1 className="self-center text-4xl text-[#42b883] font-bold py-5">
        Grosse Ligue multi opgg
      </h1>
      <form
        className="flex gap-5 min-w-max"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="bg-[#1b1b1b] border rounded-lg border-gray-600 p-3 w-96 focus:outline-none"
          placeholder="4eSport"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>

      <div className="flex flex-row gap-8 w-full flex-wrap justify-center">
        {teams.map((team, index) => {
          if (!team) return;
          return (
            <button
              key={index}
              onClick={() => {
                navigator.clipboard.writeText(team.op_gg);
                toast.success("Copié dans le presse papier");
              }}
              className="w-[200px] flex flex-row items-center gap-4 border p-2 rounded-xl"
            >
              <img
                src={
                  team.logo.includes("default-team")
                    ? "https://www.theneedlepointer.com/stores/npoint/images/o/w/PHPCU-06/PHPCU-06.jpg"
                    : team.logo
                }
                className="w-14 h-14 rounded-full"
              />
              <div className="truncate">{team.name}</div>
            </button>
          );
        })}
      </div>
      <ToastContainer />
    </main>
  );
}
