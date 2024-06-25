'use client'

import { storageGet } from '@/services/localStorage'
import { SearchTrack } from '@/services/search'
import { getTopTracks } from '@/services/user-tops'
import { GoogleGenerativeAI } from '@google/generative-ai'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { LoaderPinwheel, Music } from 'lucide-react'

const GEMINI_KEY = process.env.NEXT_PUBLIC_GEMINI_KEY

const CreatePage = () => {
  const [albumImage, setAlbumImage] = useState<string>('')
  const [trackName, setTrackName] = useState<string>('')
  const [artistName, setArtistName] = useState<string>('')
  const [trackUrl, setTrackUrl] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)

  const genAI = new GoogleGenerativeAI(GEMINI_KEY as string)
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const token = storageGet('token')
  const { data } = useQuery('topTracks', getTopTracks, {
    enabled: !!token,
  })

  if (!data) return null

  const tracks = data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((track: any) => `${track.name} - ${track.artists[0].name}`)
    .slice(0, 10)
    .join(', ')

  const aiRun = async () => {
    setLoading(true)
    //   const prompt = `Com base nas minhas músicas mais escutadas do último mês: [${tracks}], crie uma frase engraçada que represente minha vibe (não faça trocadilhos com as músicas que eu já escutei e evite usar os estilos musicais também). Não use expressões como "Meu Spotify é..." ou "Minha playlist é...", apenas descreva a vibe. `;
    // const prompt = `crie uma playlist de no minimo 15 músicas para danças e que encaixe com a seguinte descrição: "Músicas MTG, parecidas com MTG cupido".`;
    const prompt = `com base nas minhas músicas mais escutadas do último mês: [${tracks}], me mostre um recomendação de uma música que pode ser minha próxima preferida. Retorne apenas o nome da música e não retoner uma música que eu já escutei.`

    const result = await model.generateContent(prompt)
    const response = await result.response

    const track = await SearchTrack(response.text())

    setAlbumImage(track.album.images[0].url)
    setTrackName(track.name)
    setArtistName(track.artists[0].name)
    setTrackUrl(track.external_urls.spotify)

    setLoading(false)
  }

  const hasResponse = !!albumImage && !!trackName && !!artistName && !!trackUrl

  return (
    <div className="flex flex-col items-center py-10">
      <p className="text-xl font-medium mb-4">
        Qual sua próxima música preferida?
      </p>
      <button
        onClick={aiRun}
        className="w-fit rounded-lg bg-fern-500 px-2 py-1"
      >
        {hasResponse ? 'Quero outra' : 'Descubra'}
      </button>
      {loading && (
        <LoaderPinwheel
          size={64}
          className="animate-spin text-fern-500 mt-14"
        />
      )}
      {!loading && hasResponse && (
        <div className="flex flex-col gap-2 mt-10 bg-black/70 p-6 rounded-lg text-white">
          <Image
            src={albumImage}
            width={300}
            height={300}
            alt="Capa do álbum"
          />
          <div>
            <p className="text-2xl">{trackName}</p>
            <p className="font-light text-sm">{artistName}</p>
          </div>
          <Link
            href={trackUrl}
            className="bg-fern-200 mt-4 text-black font-medium flex items-center gap-2 w-fit rounded-lg px-2 py-1"
          >
            <Music size={24} />
            Ouvir no Spotify
          </Link>
        </div>
      )}
    </div>
  )
}

export default CreatePage
