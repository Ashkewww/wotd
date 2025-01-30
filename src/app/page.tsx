'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card";



export default function Home() {
  const [word, setword] = useState(null)
  const [definition, setdefinition] = useState(null)
  useEffect(() => {
    let wordtosearch: any;
    const fetchWords = async () => {
      try {
        const response = await fetch('/api/wotd', {
          method: "GET"
        });

        if (!response.ok) {
          throw new Error("Failed to fetch words");
        }

        const data = await response.json()
        setword(data.word)
        setdefinition(data.definition)
        fetchDefinition(data.word.toLowerCase() ? data.word : "nothing")
      } catch (err: any) {
        console.error(err.message);
      }
    }
    fetchWords();
    const fetchDefinition = async (wordtosearch: string) => {
      const url = `https://dictionary-data-api.p.rapidapi.com/definition/${wordtosearch}`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '178546401fmsh379ab32fcb4716cp1ac68ajsnbb25e1e0686e',
          'x-rapidapi-host': 'dictionary-data-api.p.rapidapi.com'
        }
      }
      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error("Failed to fetch the definition");
        }

        const data = await response.json()
        console.log(data)
      } catch (err) {
        console.error(err)
      }
    }

  }, [])

  return (
    <section className="flex justify-center bg-[#edddc0] w-full h-screen ">
      <div id="title" className="border border-black w-11/12 bg-opacity-30 m-8 rounded-xl bg-white">
        <h1 className="flex justify-center m-5 text-7xl font-oldeurope">
          Word of the day
        </h1>
        <div className="flex w-full justify-center hover:opacity-30 hover:cursor-pointer">
          <img src={'https://placehold.co/600x400'} width={600} height={1000} className="border border-black" />
        </div>
        <div className="flex justify-left mt-5 mb-5 ml-10">
          <h3 className="font-sans text-3xl">
            {word}
          </h3>
        </div>
        <hr className="border border-[#000000] border-t-0 ml-7 mr-7" />
        <div className="flex justify-left mt-5 mb-5 ml-10">
          <h4 className="text-xl">
            {definition}
          </h4>
        </div>
      </div>
    </section>
  );
}
