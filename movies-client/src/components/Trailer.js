import styled from "@emotion/styled";
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

const PlayerContainer = styled.div`
height: 90vh;
`;

const Trailer = () => {
    const params = useParams();
    const key = params.ytTrailerId;

    return (
        <PlayerContainer>
            {
                key !== null &&
                <ReactPlayer
                    controls="true"
                    playing={true}
                    url={`https://www.youtube.com/watch?v=${key}`}
                    width = '100%'
                    height='100%'
                />
            }
        </PlayerContainer>
    )
};

export default Trailer;