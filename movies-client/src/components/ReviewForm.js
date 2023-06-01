import styled from "@emotion/styled";

const Textarea = styled.textarea`
    width: 400px;
    min-height: 150px;
    background: gold;
    border: none;
    border-radius: 5px;
    opacity: 0.6;
    font-size: 20px;
    font-family: 'Raleway', sans-serif;
    font-weight: 600;
    padding: 5px 10px;
`;

const SendButton = styled.button`
    background: gold;
    font-weight: 600;
    cursor: pointer;
    color: black;
    padding: 10px 15px;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
`;

const ReviewForm = ({ handleSubmit, text, defaultValue}) => {
    return (
        <form>
            <h2>Write a review</h2>
            <Textarea ref={text}>

            </Textarea>
            <div>
                <SendButton onClick={(e) => handleSubmit(e)}>Send review</SendButton>
            </div>
        </form>
    )
};

export default ReviewForm;