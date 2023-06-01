import styled from "@emotion/styled";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Link, useNavigate } from "react-router-dom";

const CardContainer = styled.div`
    height: 550px;
    background-color: black;
`;
const MovieCard = styled.div`
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1)), var(--img);
`;

const MovieDetail = styled.div`
    position: absolute;
    top: 200px;
    display: flex;
    justify-content: space-evenly;
    width: 100%;

    @media only screen and (max-width: 800px) {
        flex-direction: column;
        align-items: center;
        top:20px;
    }
`;

const MoviePoster = styled.div`
    height: 300px;
    border: 1px solid gold;
    border-radius: 10px;
    overflow: hidden;
`;

const MovieImage = styled.img`
    height: 100%;
    width: 100%;
`

const MovieTitle = styled.div`
    color:white;
    display: flex;
    align-items: center;
`;

const MovieButtons = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    width:300px;
`;

const ReviewButtonContainer = styled.div`

`;

const ReviewButton = styled.button`
    background: black;
    border: 1px solid gold;
    color: white;
    cursor: pointer;
    font-size: 20px;
    padding: 10px 15px;
    border-radius: 5px;

    &:hover {
        background: gold;
        color: black;
    }
`;

const Hero = ({ movies }) => {
    const navigate = useNavigate();

    const handleGoToReviews = (movieId) => {
        navigate(`/reviews/${movieId}`);
    };

    return (
        <div>
            <Carousel>
                {
                    movies.map((movie) => {
                        return (
                            <Paper key={movie.title}>
                                <CardContainer>
                                    <MovieCard style={{"--img": `url(${movie.backdrops[0]})`}}>
                                        <MovieDetail>
                                            <MoviePoster>
                                                <MovieImage src={movie.poster} alt={movie.title} />
                                            </MoviePoster>
                                            <MovieTitle>
                                                <h3>{movie.title}</h3>
                                            </MovieTitle>
                                            <MovieButtons>
                                                <Link to={`/trailer/${movie.trailerLink.substring(movie.trailerLink?.length - 11)}`}>   
                                                    <PlayCircleIcon size="large" style={{ fontSize: 60, color: 'gold' }}/>
                                                </Link>
                                                <ReviewButtonContainer>
                                                    <ReviewButton onClick={() => handleGoToReviews(movie?.imdbId)}>
                                                     Reviews
                                                    </ReviewButton>
                                                </ReviewButtonContainer>
                                            </MovieButtons>
                                        </MovieDetail>
                                    </MovieCard>
                                </CardContainer>
                            </Paper>
                        )
                    })
                }
            </Carousel>
        </div>
    )
};

export default Hero;