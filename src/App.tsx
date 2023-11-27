import React, { useEffect, useState } from "react";
import { useSpeech } from "./hooks/useSpeech";
import { fetchData } from "./api/fetch";
import { PlayIcon, PauseIcon } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/NavBar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { defaultAPIUrl } from "./lib/constants";
const App: React.FC = () => {
  const { speak, stopSpeaking, isSpeaking } = useSpeech();
  const [isLoadingJokes, setIsLoadingJokes] = useState(false);
  const [jokesArr, setJokesArr] = useState<{ joke: string }[]>([]);
  const [isPlayingList, setIsPlayingList] = useState<boolean[]>(
    Array(jokesArr?.length).fill(false)
  );

  const loadText = async () => {
    setIsLoadingJokes(true);
    const fetchedJokes = await fetchData({ url: defaultAPIUrl });
    setJokesArr((prev) => [...prev, ...fetchedJokes]);
    setIsPlayingList(Array(fetchedJokes?.length).fill(false));
    setIsLoadingJokes(false);
  };

  useEffect(() => {
    if (!isSpeaking) {
      setIsPlayingList(Array(jokesArr?.length).fill(false));
    }
  }, [isSpeaking, jokesArr]);

  const playPause = (index: number, text: string): void => {
    if (isPlayingList[index]) {
      stopSpeaking();
    } else {
      speak(text);
    }
    // Toggle isPlaying for the clicked joke
    setIsPlayingList((prevIsPlayingList) => {
      const updatedIsPlayingList = [...prevIsPlayingList];
      updatedIsPlayingList[index] = !updatedIsPlayingList[index];
      return updatedIsPlayingList;
    });
  };

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <div>
        <NavBar />
        <div>
          <div className='flex justify-center items-center p-4'>
            <Button
              onClick={loadText}
              className='p-4'
              disabled={isLoadingJokes}
            >
              {isLoadingJokes
                ? "Fetching..."
                : jokesArr?.length
                ? "Fetch More Dad Jokes"
                : "Fetch Dad Jokes"}
            </Button>
          </div>
          <div className='flex justify-center items-center p-4 '>
            <div
              className='w-[800px] p-4 overflow-y-auto h-[600px]'
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "transparent transparent",
              }}
            >
              {jokesArr?.map((joke, index) => (
                <div key={index} className='flex justify-start pb-2 '>
                  {isPlayingList[index] ? (
                    <PauseIcon
                      className='h-6 w-6 cursor-pointer'
                      onClick={() =>
                        isSpeaking && !isPlayingList[index]
                          ? null
                          : playPause(index, joke.joke)
                      }
                    />
                  ) : (
                    <PlayIcon
                      className='h-6 w-6 cursor-pointer'
                      onClick={() =>
                        isSpeaking && !isPlayingList[index]
                          ? null
                          : playPause(index, joke.joke)
                      }
                    />
                  )}

                  <span className='pl-4 w-full'>
                    {" "}
                    {isLoadingJokes ? (
                      <Skeleton className='h-2 w-[600px] m-2' />
                    ) : (
                      joke.joke
                    )}
                  </span>
                </div>
              ))}
            </div>{" "}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
