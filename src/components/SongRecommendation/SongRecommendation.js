import { useState, useEffect } from "react";
import axios from 'axios';

const SongRecommendation = (props) => {

    // var clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    // var clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/playlists/";
    const ACCESS_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
    const [accessToken, setAccessToken] = useState('');
    var playlistId = '';
    // eslint-disable-next-line no-lone-blocks
    {
        if (props.options.weather[0].main === 'Clear') { playlistId = "2Ub0SnonpnLgiWP9LQs5kO" }
        else
            if (props.options.weather[0].main === 'Clouds') { playlistId = "3QrZOF8JmVADH0jl2DZv8r" }
            else
                if (props.options.weather[0].main === 'Smoke') { playlistId = "7MWiSLhNiRaOXhRnFLo9wt" }
                else
                    if (props.options.weather[0].main === 'Rain') { playlistId = "7iQ4SQo7LG5ezVKXoeG9oZ" }
                    else
                        if (props.options.weather[0].main === 'Haze') { playlistId = "6KXDlalFV1SqateTdKYgUD" }
                        else
                            if (props.options.weather[0].main === 'Drizzle') { playlistId = "7wBB5LF1xfreBTOKNLllx8" }
                            else {
                                playlistId = "5xyhI355JcExXTV96m0CBp";
                            }
    };

    useEffect(() => {
        const _getToken = async () => {

            const result = await fetch(ACCESS_TOKEN_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(process.env.REACT_APP_SPOTIFY_CLIENT_ID + ':' + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET, 'utf8').toString('base64')
                },
                body: 'grant_type=client_credentials'
            });

            const data = await result.json();
            setAccessToken(data.access_token);
            // console.log(data.access_token);
            console.log(accessToken);
        }
        _getToken();

        const handleGetPlaylists = () => {
            axios
                .get(PLAYLISTS_ENDPOINT + playlistId, {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                })
                .then((response) => {
                    // console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        handleGetPlaylists();
    }, [playlistId]);

    return (
        <>
            <div className="Recommended Songs">
                <h2 className="Catchy Header">Listen Songs That Match Your Mood!</h2>


            </div>

        </>
    );
};

export default SongRecommendation;