// Represents buttons that have text
const ButtonWithText = ({text, onClick}) => {
    return (
        <button className="button" onClick={() => onClick()}>
            {text}
        </button>
    )
}

export default ButtonWithText;