import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import "./SongRecommendation.css";

const SongRecommendation = (props) => {

    const [tracksData, setTracksData] = useState(null);
    const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/playlists/";
    const ACCESS_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
    var accessToken = '';
    var playlistId = '';

    playlistId = {
        Clear: "2Ub0SnonpnLgiWP9LQs5kO",
        Clouds: "3QrZOF8JmVADH0jl2DZv8r",
        Smoke: "7MWiSLhNiRaOXhRnFLo9wt",
        Rain: "7iQ4SQo7LG5ezVKXoeG9oZ",
        Haze: "6KXDlalFV1SqateTdKYgUD",
        Drizzle: "7wBB5LF1xfreBTOKNLllx8",
    }[props.options.weather[0].main] || '5xyhI355JcExXTV96m0CBp';

    const handleGetPlaylists = async () => {

        fetch(PLAYLISTS_ENDPOINT + playlistId + '/tracks?limit=10',
            { method: 'GET', headers: { "Authorization": `Bearer ${accessToken}` }, }
        )
            .then((result) => result.json()).then((response) => {

                var items = response.items;
                setTracks(items);
            }
            )
            .catch(console.error);
    };

    function setTracks(items) {
        const tracks = items.map(({ track }) => ({
            song: track.name,
            artist: track.artists[0].name,
            imageUrl: track.album.images[0].url,
            spotifyUrl: track.external_urls.spotify
        }))
        organizeInRows(tracks);

    }

    function organizeInRows(tracks) {
        const tracksRows = [];
        for (var i = 0; i < tracks.length; i += 5) {
            tracksRows.push(tracks.slice(i, i + 5));
        }
        setTracksData(tracksRows);
    }



    useEffect(() => {
        const _getToken = async () => {

            await fetch(ACCESS_TOKEN_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(process.env.REACT_APP_SPOTIFY_CLIENT_ID + ':' + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET, 'utf8').toString('base64')
                },
                body: 'grant_type=client_credentials'
            }).then((result) => result.json()).then((data) => {
                accessToken = data.access_token;
                handleGetPlaylists();
            }
            ).catch((error) => { console.error(error); });

        }
        _getToken()
    }, [props]);

    return (
        <div className="Recommended Songs">
            <h2 className="Catchy Header">Songs based on the forecast</h2>

            <div className="songs-container">
                {tracksData &&
                    tracksData.map((singleRow, i) => (
                        <Row className="songs-row" key={i}>
                            {singleRow.map((singleTrack, j) => (
                                <Col fluid="true" className="song-card" key={j}>
                                    <div className="card">
                                        <div className="overlayer">
                                        </div>
                                        <a target="_blank" href={singleTrack.spotifyUrl}>
                                            <img className="song-image" src={singleTrack.imageUrl} alt='Cover Page of Song' />
                                        </a>
                                        <div>
                                            <h6 className="song-title">{singleTrack.song}</h6>
                                            <h6 className="song-artist">{singleTrack.artist}</h6>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    ))}
            </div>
        </div>
    );
};

export default SongRecommendation;
