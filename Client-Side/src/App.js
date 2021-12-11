import { useState, useEffect } from "react";
import ReactPlayer from "react-player";

function App() {
  const [Play, setPlay] = useState(false);
  const [VideoData, setVideoData] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3001/videoName";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setVideoData(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  async function updatePost(feed, video_data) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feed: feed, data: video_data }),
    };
    
    await fetch(
      "http://localhost:3001/feedchange",
      requestOptions
    );
    // const data = await response.json();
  }

  const play_pause = () => {
    if (Play) {
      setPlay(false);
      updatePost(0, VideoData);
    } else {
      setPlay(true);
      updatePost(1, VideoData);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {VideoData.map((result, index) => {
          return (
            <>
              <ReactPlayer
                playing={Play}
                controls="true"
                url={`http://localhost:3001/video/${result.name_formate}`}
                width="600px"
                // height="500px"
                key={index}
                style={{
                  paddingInlineEnd: "2px",
                  marginTop: "-17px",
                }}
              />
            </>
          );
        })}
        <button onClick={play_pause}>Play & Pause </button>
      </div>
    </>
  );
}

export default App;
