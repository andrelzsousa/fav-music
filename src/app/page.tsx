"use client";

import { storageGet, storageSet } from "@/services/localStorage";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const AUTH_ENDPOINT = process.env.NEXT_PUBLIC_AUTH_ENDPOINT;
const RESPONSE_TYPE = process.env.NEXT_PUBLIC_RESPONSE_TYPE;
const SCOPE = process.env.NEXT_PUBLIC_SCOPE;

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    let token = storageGet<string>("token");

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1] || "";

        window.location.hash = "";
        storageSet("token", token);
    }
  }, []);

  useEffect(() => {
    const token = storageGet<string>("token");

    if(token) {
      router.push("/creator");
    }
  }, [router])

  return (
    <main className="">
      <Link href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login com Spotify</Link>
    </main>
  );
}
