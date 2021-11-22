import { useEffect } from "react";
import axios from 'axios';
import { Col, ListGroupItem, Row } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';

const SongRecommendation = (props) => {

    const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/playlists/";
    const ACCESS_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
    var accessToken = '';
    var playlistId = '';
    var tracksData = [];
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

    const handleGetPlaylists = async () => {
        await fetch(PLAYLISTS_ENDPOINT + playlistId + '/tracks?limit=10',
            { method: 'GET', headers: { "Authorization": `Bearer ${accessToken}` }, }
        )
            .then((result) => result.json()).then((response) => {
                console.log(response);
                var tracks = response.items;
                for (let i = 0; i < tracks.length; i++)
                    tracksData.push({ 'song': tracks[i].track.name, 'artist': tracks[i].track.artists[0].name, 'imageUrl': tracks[i].track.album.images[0].url });
                console.log(tracksData[0].song);
            })
            .catch((error) => {
                console.log(error);
            });
    };

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
                console.log(accessToken);
                handleGetPlaylists();
            }
            ).catch((error) => { console.log(error); });

        }
        _getToken()
    }, []);

    return (
        <>
            <div className="Recommended Songs">
                <h2 className="Catchy Header">Listen Songs That Match Your Mood!</h2>
                <ListGroup>
                    {tracksData.length !== 0 &&
                        tracksData.map((singleTrack) =>
                            <ListGroupItem>
                                <Row>
                                    <img src={singleTrack.imageUrl} alt='Cover Page of Song' />
                                    <Col>
                                        <h4>{singleTrack.song}</h4>
                                        <h5>{singleTrack.artist}</h5>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        )
                    }
                </ListGroup>

            </div>

        </>
    );
};

export default SongRecommendation;