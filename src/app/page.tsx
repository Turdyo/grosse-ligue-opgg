"use client"

import { useCallback, useState } from "react"

export default function Home() {
  const [inputValue, setInputValue] = useState("")
  const [response, setResponse] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getOPGG = useCallback(async (teamLink: string) => {
    const teamName = teamLink.split("/")[4];
    
    if (!teamName) return "Invalid Team Link, should be like https://universityesports.fr/team/4es-dollex"

    const teamData = await fetch(
      `https://api.universityesports.fr/api/v001/showcase/university-esports/equipo/${teamName}`, { cache: "no-store" }
    ).then((res) => res.json());
    console.log(teamData)

    if (teamData.status === "error") {
      return "Error"
    }

    const teamMembers = teamData.returnData.miembros;

    const teamMembersData = await Promise.all(
      teamMembers.map(async (member: { username: string }) => {
        const memberData = await fetch(
          `https://api.universityesports.fr/api/v001/showcase/university-esports/user/profile/${member.username}`, { cache: "no-store" }
        ).then((res) => res.json());
        return memberData.returnData.profile.gameNicks;
      })
    );

    const nicks = teamMembersData.map((obj) => obj[0].nick);

    // build op.gg link
    //https://www.op.gg/multisearch/euw?summoners=Bouhahahahahaha,%20Rob%C3%A9b%C3%B8u
    const opGGlink = encodeURI(
      `https://www.op.gg/multisearch/euw?summoners=${nicks.join(",")}`
    );

    return opGGlink
  }, [])

  return (
    <main className="bg-[#1a1a1a] h-screen flex flex-col gap-5 py-10 items-center">
      <h1 className="self-center text-4xl text-[#42b883] font-bold py-5">Grosse Ligue multi opgg</h1>
      <form className="flex gap-5 min-w-max" onSubmit={e => e.preventDefault()}>
        <input
          className="bg-[#1b1b1b] border rounded-lg border-gray-600 p-3 w-96 focus:outline-none"
          placeholder="https://universityesports.fr/team/4es-dollex"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button
          className="text-[#213547] rounded-lg p-3 bg-[#42b883] mx-auto font-semibold disabled:cursor-not-allowed disabled:bg-opacity-60 transition-all"
          onClick={() => {
            if (inputValue === "") return
            setIsLoading(true)
            getOPGG(inputValue)
              .then(resp => setResponse(resp))
              .catch(error => console.error(error))
              .finally(() => setIsLoading(false))
          }}
          disabled={isLoading}
          type="submit"
        >
          Multi OPGG
        </button>
      </form>
      {isLoading && <div>Loading...</div>}
      {response && <>
        <a href={response} target="_blank" className="text-[#42b883]">
          {response}
        </a>
        <button
          className="text-[#213547] rounded-lg p-3 bg-[#42b883] mx-auto font-semibold disabled:cursor-not-allowed disabled:bg-opacity-60 transition-all"
          onClick={() => navigator.clipboard.writeText(response)}
        >
          Copy
        </button>
      </>}
    </main>
  )
}
