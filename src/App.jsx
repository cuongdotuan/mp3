import { useEffect, useRef, useState } from 'react'
import './App.css'
import Player from './components/Player'
import { MdSort } from "react-icons/md";
import { FiVolume1, FiVolume2 , FiHeart} from 'react-icons/fi';



const songs = [
  {
    id: 1,
    title: "Tán Gái 505",
    artist: {
      name: "LowG",
      avatar: "https://oneesports.blob.core.windows.net/cdn-data/sites/4/2021/09/lowg.jpg"
    },
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/31/5b/3c/315b3cd7-a9d5-5f96-e1d7-5768854e62bd/cover.jpg/600x600bf-60.jpg",
    src: "tan gai 505.mp3"
  },
  {
    id: 2,
    title: "Talking To The Moon",
    artist: {
      name: "Bruno Mars",
      avatar: "https://variety.com/wp-content/uploads/2016/02/bruno-mars.jpg?w=1000&h=563&crop=1"
    },
    cover: "https://i1.sndcdn.com/artworks-000194409830-q1zpgm-t500x500.jpg",
    src: "talking to the moon.mp3"
  },
  {
    id: 3,
    title: "Missing You",
    artist: {
      name: "G-Dragon",
      avatar: "https://media.baoquangninh.vn/upload/image/202208/medium/1999481_2e83b554c4bdffa9b16e8db7a9143012.jpg"
    },
    cover: "https://i1.sndcdn.com/artworks-000057229829-67q6gm-t500x500.jpg",
    src: "missing you.mp3"
  },
  {
    id: 4,
    title: "Miên Man",
    artist: {
      name: "Minh Huy",
      avatar: "https://photo-zmp3.zmdcdn.me/avatars/9/f/3/e/9f3e1a475a8f23223415e338ecd4f7ad.jpg"
    },
    cover: "https://tailieumoi.vn/storage/uploads/images/post/banner/11-1658677373.png",
    src: "mien man.mp3"
  },
  {
    id: 5,
    title: "Chúng Ta Của Hiện Tại",
    artist: {
      name: "Sơn Tùng MTP",
      avatar: "https://media-cdn-v2.laodong.vn/storage/newsportal/2020/12/20/863938/Screenshot-11.png"
    },
    cover: "https://i1.sndcdn.com/artworks-tjSUy5BcbXXWYOek-2h1zfA-t500x500.jpg",
    src: "chung ta cua hien tai.mp3"
  },
  {
    id: 6,
    title: "Anh Đã Ổn Hơn",
    artist: {
      name: "MCK",
      avatar: "https://tmdl.edu.vn/wp-content/uploads/2022/07/mck.jpg"
    },
    cover: "https://i1.sndcdn.com/artworks-PXjy5sywELqCfvhr-LVK2bA-t500x500.jpg",
    src: "anh da on hon.mp3"
  },
  {
    id: 7,
    title: "Anhs & Ems",
    artist: {
      name: "QNT",
      avatar: "https://gamenoob.net/wp-content/uploads/2021/01/QNT-lien-tuc-ra-san-pham-hit-de-cua-Do.jpg"
    },
    cover: "https://i1.sndcdn.com/artworks-4aeIkPsD0khO-0-t500x500.jpg",
    src: "anhs ems.mp3"
  },
  {
    id: 8,
    title: "Gotta Go",
    artist: {
      name: "DUCCI",
      avatar: "https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/4/a/1/a/4a1ad4804fb2bb9abb674309d2dbd62c.jpg"
    },
    cover: "https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/8/f/c/2/8fc2b8fa4dc91a581d72407de9143dc9.jpg",
    src: "gotta go.mp3"
  },
  {
    id: 9,
    title: "Anh Đã Lớn Hơn Thế Nhiều",
    artist: {
      name: "Huỳnh Công Hiếu",
      avatar: "https://icdn.dantri.com.vn/zoom/1200_630/2023/06/19/1089ac559ca54dfb14b4-crop-1687175416194.jpeg"
    },
    cover: "https://i.scdn.co/image/ab67616d0000b2730a3c41065ea90a8fa2c98499",
    src: "anh da lon hon the nhieu.mp3"
  },
  {
    id: 10,
    title: "Đố Em Biết Anh Đang Nghĩ Gì",
    artist: {
      name: "Đen & JustaTee",
      avatar: "https://i.ytimg.com/vi/QQsZs7RBcYs/maxresdefault.jpg"
    },
    cover: "https://i1.sndcdn.com/artworks-000464005191-c7gxt2-t500x500.jpg",
    src: "do em biet anh dang nghi gi.mp3"
  },
  
]

const convertSecToMin = (totalTime) => {
  const roundedTime = Math.floor(totalTime)
  const minutes = Math.floor(roundedTime / 60)
  const seconds = Math.floor(roundedTime % 60)
  const displayMins = minutes < 10 ? `0${minutes}` : minutes
  const displaySecs = seconds < 10 ? `0${seconds}` : seconds
  const result = `${displayMins}:${displaySecs}`
  return result
}

function App() {
  const audioRef = useRef(new Audio())
  const [currentSongIndex, setCurrentSongIndex] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isCurrentTimeChange, setIsCurrentTimeChange] = useState(false)
  const [volum, setVolum] = useState(1)

  const togglePlay = () => {
    if (currentSongIndex === -1) {
      setCurrentSongIndex(0)
    }
    setIsPlaying(!isPlaying)

  }

  const prevSong = () => {
    setCurrentSongIndex(currentIndex =>
      currentIndex === 0 ? songs.length - 1 : currentSongIndex - 1
    )
  }
  const nextSong = () => {
    setCurrentSongIndex(
      currentIndex => currentIndex === songs.length - 1 ? 0 : currentSongIndex + 1
    )
  }

  const selectSong = (id) => {
    const songIndex = songs.findIndex((song) => song.id === id)
    if (songIndex !== -1) {
      setCurrentSongIndex(songIndex)
    }
  }

  const handleVolumChange = (value) => {
    audioRef.current.volume = value
  }


  useEffect(() => {
    if (currentSongIndex !== -1) {
      const currentSong = songs[currentSongIndex]

      audioRef.current.src = currentSong.src

    }
  }, [currentSongIndex])

  useEffect(() => {
    if (isCurrentTimeChange && !audioRef.current.paused) {
      audioRef.current.pause()
    } else if (currentSongIndex !== -1 && isPlaying) {
      audioRef.current.play()
    }
    else {
      audioRef.current.pause()
    }

  }, [currentSongIndex, isPlaying, isCurrentTimeChange])

  useEffect(() => {
    const audio = audioRef.current

    const handleDurationChange = () => {
      setDuration(audio.duration)
    }

    const handleTimeChange = () => {
      setCurrentTime(audio.currentTime)

    }

    const handleVolumChange = () => {
      setVolum(audio.volume)
    }

    const handleEnd = () => {
      nextSong()
    }

    audioRef.current.addEventListener("loadedmetadata", handleDurationChange)
    audioRef.current.addEventListener("timeupdate", handleTimeChange)
    audioRef.current.addEventListener("volumechange", handleVolumChange)
    audioRef.current.addEventListener("ended", handleEnd)


    return () => {
      audio.removeEventListener("loadedmetadata", handleDurationChange)
      audio.removeEventListener("timeupdate", handleTimeChange)
      audio.removeEventListener("volumechange", handleVolumChange)
      audio.removeEventListener("ended", handleEnd)
    }

  }, [])

  const currentSong = songs[currentSongIndex]



  return (
    <div style={{ '--image-url': `url(${currentSong?.artist.avatar})` }}
      className={`flex text-white min-h-screen ${currentSong ? "bg-[image:var(--image-url)]" : "bg-zinc-800"} bg-cover`}>
      <div className="w-full min-h-screen opacity-90 bg-zinc-800">
      </div>
      <div className='absolute flex py-4 px-40 text-white w-full h-full'>

        <div className='flex-1 flex flex-col justify-center align-center'>
          <div className='px-5'>
            <div className="w-full flex justify-center align-center" >
              {currentSong ? <img src={songs[currentSongIndex].cover} alt="" style={{ width: "80%" }} /> : <img src="disk.png" alt="" style={{ width: "80%" }} />}
            </div>

            {currentSong &&
              <div className='my-4'>
                <p className='text-2xl font-semibold'>{currentSong.title} </p>
                <p>{currentSong.artist.name}</p>
              </div>
            }

            <div>
              <input className='w-full accent-emerald-300'
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                step={1}

                onChange={(e) => {
                  audioRef.current.currentTime = e.target.value
                }}

                onMouseDown={() => {
                  setIsCurrentTimeChange(true)

                }}

                onMouseUp={() => {
                  setIsCurrentTimeChange(false)
                }}
              />
              <div className='text-xs flex justify-end gap-x-1'>
                <span className='currentTime'>{convertSecToMin(currentTime)}</span> / <span className='duration'>{convertSecToMin(duration)}</span>
              </div>
            </div>

            <Player
              isPlaying={isPlaying}
              onToggle={togglePlay}
              onPrev={prevSong}
              onNext={nextSong}
            />

            <div className='flex my-6 justify-center align-center gap-x-2.5'>
              <FiVolume1 />
              <input
                className='w-2/5 accent-emerald-300'
                type="range"
                min={0}
                max={1}
                value={volum}
                step={0.01}
                onChange={(e) => handleVolumChange(e.target.value)}
              />
              <FiVolume2 />
            </div>
          </div>
        </div>

        <div className='flex-[2] px-4 '>
          <div className='flex justify-between items-center mb-4'>
            <span>{songs.length} tracks</span>
            <MdSort size={24} />
          </div>
          <div className='max-h-[90vh] overflow-auto'>
            {songs.map((song) =>
              <div
                key={song.id}
                className={`flex items-center gap-x-4  py-2 hover:bg-zinc-700 hover:cursor-pointer ${currentSong && song.id === currentSong.id ? 'text-emerald-300' : ''}`}
                onClick={() => selectSong(song.id)}>

                <div className='w-12'>
                  <img src={song.cover} alt="" />
                </div>
                <div className='flex-1'>
                  {currentSong && currentSong.id === song.id}
                  <p className='text-lg'>{song.title}</p>
                  <p className='text-sm'>{song.artist.name}</p>
                </div>
                <div>
                  <span>{convertSecToMin(270)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>



    </div>
  )
  return (
    <div className="container">
      <h1>mp3</h1>
      <div className="list-and-info d-flex">

        <div style={{ width: 500, height: 500 }}>

          {currentSong && <img src={songs[currentSongIndex].artist.avatar} alt="" style={{ width: "100%" }} />}
        </div>

        <div className="list-song-item">
          {songs.map((song) =>
            <div className='song-item' key={song.id} onClick={() => selectSong(song.id)}>
              {currentSong && currentSong.id === song.id && "(Playing)"}
              {song.title} - {song.artist.name}
            </div>
          )}
        </div>


      </div>

      <div className="playing-song">
        {currentSong &&
          <img className='cover rotate' src={currentSong.cover} alt={currentSong.title} />
        }
        <div className="title-song d-flex">
          {currentSong &&
            <div><strong>{currentSong.title.toUpperCase()}</strong></div>
          }
          <Player
            isPlaying={isPlaying}
            onToggle={togglePlay}
            onPrev={prevSong}
            onNext={nextSong}
          />
        </div>
      </div>

      <div>
        <span className='currentTime'>{convertSecToMin(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          step={1}

          onChange={(e) => {
            audioRef.current.currentTime = e.target.value
          }}

          onMouseDown={() => {
            setIsCurrentTimeChange(true)

          }}

          onMouseUp={() => {
            setIsCurrentTimeChange(false)
          }}
        />
        <span className='duration'>{convertSecToMin(duration)}</span>
      </div>


      <div>
        <span>Volum</span>
        <input
          type="range"
          min={0}
          max={1}
          value={volum}
          step={0.01}
          onChange={(e) => handleVolumChange(e.target.value)}
        />
        <span>{Math.floor(volum * 100)}%</span>
      </div>
    </div>
  )
}

export default App
